using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Volo.Abp;
using Volo.Abp.AspNetCore.TestBase;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Acme.ApiHost.Tests
{
    [DependsOn(typeof(AbpAspNetCoreTestBaseModule))]
    [DependsOn(typeof(AppModule))]
    public class ApiHostTestModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.Replace(ServiceDescriptor.Singleton<Castle.Core.Logging.ILoggerFactory, NullLoggerFactory>());
        }
    }
}
