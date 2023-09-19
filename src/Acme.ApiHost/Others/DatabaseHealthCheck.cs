using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Acme.ApiHost.Others;

public class DatabaseHealthCheck : IHealthCheck
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<DatabaseHealthCheck> _logger;

    public DatabaseHealthCheck(IConfiguration configuration, ILogger<DatabaseHealthCheck> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }
    
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        try
        {
            using (var con = new SqlConnection(_configuration.GetDefaultConexion()))
            {
                con.QuerySingle<string>("SELECT @@VERSION");
                return HealthCheckResult.Healthy("Succes conect to db.");
            }
        }
        catch (Exception e)
        {
            _logger.LogException(e);
            return HealthCheckResult.Unhealthy("Errror when conect to db");
        }
    }
}