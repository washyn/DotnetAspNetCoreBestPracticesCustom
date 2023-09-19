using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.Configuration;

public static class ConfigurationExtensions
{
    public static string GetDefaultConexion(this IConfiguration configuration)
    {
        return configuration.GetConnectionString("Default") ?? throw new ArgumentException("Not found conexion string.");
    }
}