using System.ComponentModel.Design;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using System.Linq;

namespace Acme.ApiHost.Controllers;

/// <inheritdoc />
[Route("api/weather-forecast")]
[RemoteService()]
public class WeatherForecastController : ControllerBase
{
    public static List<WeatherForecast> data = new List<WeatherForecast>()
    {
        new WeatherForecast
        {
            Date = DateTime.Now,
            TemperatureC = 5,
            Summary = "Freezing",
            Id = Guid.Parse("55b2cace-bfae-4f1a-9575-2628c6575dd6"),
        }
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    // NOTA: cuando se usa abp no es necesario usar el api controller, esto anula las convenciones de default request convenciones, se deberia usar el remote service... para tomar las convenciones de abp
    // TODO: fix
    [HttpGet]
    public IEnumerable<WeatherForecast> GetAll(WeatherForecast filter)
    {
        return data.ToArray();
    }

    /// <summary>
    /// Crea un nuevo recurso.
    /// </summary>
    /// <param name="model"></param>
    [HttpPost]
    public void Create(WeatherForecast model)
    {
        data.Add(new WeatherForecast()
        {
            Date = model.Date,
            Id = model.Id,
            Summary = model.Summary,
            TemperatureC = model.TemperatureC,
        });
    }

    [Route("{id:guid}")]
    [HttpDelete]
    public void Delete(Guid id)
    {
        _logger.LogInformation("req1qqqqqqqqqq", id);
        var item = data.FirstOrDefault(x => x.Id == id);
        data.Remove(item);
    }

    [Route("{id:guid}")]
    [HttpGet]
    public WeatherForecast Get(Guid id)
    {
        return data.FirstOrDefault(x => x.Id == id);
    }
}
