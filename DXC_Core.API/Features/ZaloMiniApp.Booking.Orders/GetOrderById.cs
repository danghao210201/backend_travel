using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using DXC_Core.API.Data.ZaloMiniAppContext;
using DXC_Core.API.Shared.Contracts;

namespace DXC_Core.API.Features.ZaloMiniApp.Booking.Orders;

public static class GetOrderById
{
    public class Query : IRequest<ApiResult<BookingOrderDto>>
    {
        public Guid PublicId { get; set; }
    }

    public class Handler : IRequestHandler<Query, ApiResult<BookingOrderDto>>
    {
        private readonly ZaloMiniAppDbContext _context;

        public Handler(ZaloMiniAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResult<BookingOrderDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var order = await _context.BookingOrders
                .Where(x => x.PublicId == request.PublicId)
                .Select(x => new BookingOrderDto
                {
                    PublicId = x.PublicId,
                    BookingCode = x.BookingCode,
                    CustomerName = x.CustomerName,
                    PhoneNumber = x.PhoneNumber,
                    Email = x.Email,
                    Note = x.Note,
                    TourId = x.TourId,
                    TicketId = x.TicketId,
                    Quantity = x.Quantity,
                    DepartureDate = x.DepartureDate,
                    TotalAmount = x.TotalAmount,
                    Status = x.Status,
                    PaymentStatus = x.PaymentStatus,
                    CreatedAt = x.CreatedAt,
                    UpdatedAt = x.UpdatedAt
                })
                .FirstOrDefaultAsync(cancellationToken);

            if (order == null)
            {
                return new ApiResult<BookingOrderDto> { Success = false, Message = "Không tìm thấy đơn hàng" };
            }

            return new ApiResult<BookingOrderDto> { Success = true, Data = order };
        }
    }
}
