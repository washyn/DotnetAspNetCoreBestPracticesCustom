using Castle.Core.Logging;
using Volo.Abp;
using Volo.Abp.Modularity;
using Volo.Abp.Testing;

namespace Acme.ApiHost.Tests
{
    // public abstract class IntegratedTestBase<TStartupModule> : AbpIntegratedTest<TStartupModule> 
    //     where TStartupModule : IAbpModule
    // {
    //     protected override void SetAbpApplicationCreationOptions(AbpApplicationCreationOptions options)
    //     {
    //         options.UseAutofac();
    //     }
    // }
    
    // TODO: improve with use real implementation... and check if IntegratedTestBase class is requiered...
    public class NullLoggerFactory : ILoggerFactory
    {
        public ILogger Create(Type type)
        {
            throw new NotImplementedException();
        }

        public ILogger Create(string name)
        {
            throw new NotImplementedException();
        }

        public ILogger Create(Type type, LoggerLevel level)
        {
            throw new NotImplementedException();
        }

        public ILogger Create(string name, LoggerLevel level)
        {
            throw new NotImplementedException();
        }
    }
}
