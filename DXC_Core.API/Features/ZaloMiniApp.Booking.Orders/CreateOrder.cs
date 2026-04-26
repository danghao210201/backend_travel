using FluentValidation;
using MediatR;
using DXC_Core.API.Data.ZaloMiniAppContext;
using DXC_Core.API.Data.ZaloMiniAppContext.Models.Booking;
using DXC_Core.API.Shared.Contracts;

namespace DXC_Core.API.Features.ZaloMiniApp.Booking.Orders;

public static class CreateOrder
{
    public class Command : IRequest<ApiResult<BookingOrderDto>>
    {
        public string? CustomerName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Note { get; set; }
        public int? TourId { get; set; }
        public int? TicketId { get; set; }
        public int Quantity { get; set; } = 1;
        public int AdultQuantity { get; set; } = 1;
        public int ChildQuantity { get; set; } = 0;
        public DateTime? DepartureDate { get; set; }
        public string? DepartureTime { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(x => x.Quantity).GreaterThan(0);
            RuleFor(x => x.TotalAmount).GreaterThanOrEqualTo(0);
        }
    }

    public class Handler : IRequestHandler<Command, ApiResult<BookingOrderDto>>
    {
        private readonly ZaloMiniAppDbContext _context;

        public Handler(ZaloMiniAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResult<BookingOrderDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var order = new BookingOrder
            {
                BookingCode = $"BK-{DateTime.Now:yyyyMMddHHmmss}-{new Random().Next(1000, 9999)}",
                CustomerName = request.CustomerName,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Note = request.Note,
                TourId = request.TourId > 0 ? request.TourId : null,
                TicketId = request.TicketId > 0 ? request.TicketId : null,
                Quantity = request.Quantity,
                AdultQuantity = request.AdultQuantity,
                ChildQuantity = request.ChildQuantity,
                DepartureDate = request.DepartureDate,
                DepartureTime = request.DepartureTime,
                TotalAmount = request.TotalAmount,
                Status = "Pending",
                PaymentStatus = "Unpaid",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.BookingOrders.Add(order);
            await _context.SaveChangesAsync(cancellationToken);

            return new ApiResult<BookingOrderDto>
            {
                Success = true,
                Message = "Tạo đơn hàng thành công",
                Data = new BookingOrderDto { PublicId = order.PublicId, BookingCode = order.BookingCode }
            };
        }
    }
}
