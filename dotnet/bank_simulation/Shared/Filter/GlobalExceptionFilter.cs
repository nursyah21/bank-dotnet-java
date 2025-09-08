using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Shared.Filter;

public class GlobalExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var exception = context.Exception;
        var responseDto = new ResponseDto(exception.Message, false);

        context.Result = new ObjectResult(responseDto)
        {
            StatusCode = 400
        };

        context.ExceptionHandled = true;
    }
}