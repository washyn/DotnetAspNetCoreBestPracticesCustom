using Microsoft.AspNetCore.Mvc;
using Shouldly;
using Xunit;
using Xunit.Abstractions;

namespace Acme.ApiHost.Tests.Controllers;

public class WeatherForecastController : ApiHostTestBase
{
    private readonly ITestOutputHelper _testOutputHelper;

    public WeatherForecastController(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }
    
    [Fact]
    public async Task Get_Data()
    {
        // arrange
        var uri = "/api/weather-forecast";
        
        // act
        var data = await GetResponseAsObjectAsync<IEnumerable<WeatherForecast>>(uri);
        
        // assert
        data.Any().ShouldBe(true);
        
        _testOutputHelper.WriteLine(data.Count().ToString());
        
    }
}
