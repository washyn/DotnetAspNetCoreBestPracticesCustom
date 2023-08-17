using Serilog;
using Serilog.Events;

namespace Acme.ApiHost
{
    public class Program
    {
        public static async Task<int> Main(string[] args)
        {
            var loggerConfiguration = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Debug)
                .Enrich.FromLogContext()
                .WriteTo.Async(c => c.File("Logs/logs.log"))
                .WriteTo.Async(c => c.Console());

            Log.Logger = loggerConfiguration.CreateLogger();

            
            try
            {
                var builder = CreateHostBuilder(args);
                var app = builder.Build();
                Log.Information("Starting Acme.Basic");
                await app.RunAsync();
                return 0;
            }
            catch (Exception ex)
            {
                if (ex.GetType().Name.Equals("StopTheHostException", StringComparison.Ordinal))
                {
                    throw;
                }

                Log.Fatal(ex, "Acme.Basic terminated unexpectedly!");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
        
        internal static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseSerilog()
                .UseAutofac();
    }
    
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<AppModule>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.InitializeApplication();
        }
    }
}