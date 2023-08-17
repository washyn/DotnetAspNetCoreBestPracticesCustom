using Castle.Core.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Acme.ApiHost.Tests;

public class TestStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddApplication<ApiHostTestModule>();
    }

    public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
    {
        app.InitializeApplication();
    }
}