using Microsoft.AspNetCore.Mvc;

namespace Acme.ApiHost.Controllers;

[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
[Route("/")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return Redirect("/swagger");
    }
}
