using Microsoft.AspNetCore.Mvc;
using MediatR;
using DXC_Core.API.Shared.Contracts;
using Microsoft.AspNetCore.Http;

namespace DXC_Core.API.Features.ZaloMiniApp.Payment.Transactions;

[ApiController]
[Route("api/zalo-mini-app/mobile/transactions")]
[Tags("ZaloMiniAppTransactionsMobile")]
public class TransactionsMobileController : ControllerBase
{
    private readonly ISender _sender;

    public TransactionsMobileController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(ApiResult<PaymentTransactionDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateTransaction([FromBody] CreateTransaction.Command command)
    {
        var result = await _sender.Send(command);
        return Ok(result);
    }

    [HttpPost("webhook/update")]
    [ProducesResponseType(typeof(ApiResult<PaymentTransactionDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateTransactionWebhook([FromBody] UpdateTransaction.Command command)
    {
        var result = await _sender.Send(command);
        return Ok(result);
    }
}
