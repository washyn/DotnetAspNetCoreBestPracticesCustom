namespace Acme.ApiHost;

public class WeatherForecast
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
}
