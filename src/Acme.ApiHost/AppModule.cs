using Acme.ApiHost.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.OpenApi.Models;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.Swashbuckle;
using Volo.Abp.UI.Navigation.Urls;

namespace Acme.ApiHost;

[DependsOn(
       // ABP Framework packages
       typeof(AbpAspNetCoreMvcModule),
       typeof(AbpAutofacModule),
       typeof(AbpAutoMapperModule),
       typeof(AbpSwashbuckleModule),
       typeof(AbpAspNetCoreSerilogModule),
       typeof(Volo.Abp.EntityFrameworkCore.SqlServer.AbpEntityFrameworkCoreSqlServerModule)
)]
public class AppModule : AbpModule
{
    // public const bool IsMultiTenant = false;

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var hostingEnvironment = context.Services.GetHostingEnvironment();
        var configuration = context.Services.GetConfiguration();

        ConfigureMultiTenancy();
        ConfigureUrls(configuration);
        ConfigureCors(context, configuration);
        ConfigureSwagger(context.Services);
        ConfigureAutoApiControllers();
        ConfigureEfCore(context);
    }

    private void ConfigureMultiTenancy()
    {
        Configure<AbpMultiTenancyOptions>(options =>
        {
            options.IsEnabled = false;
        });
    }

    private void ConfigureUrls(IConfiguration configuration)
    {
        Configure<AppUrlOptions>(options =>
        {
            options.RedirectAllowedUrls.AddRange(configuration["App:RedirectAllowedUrls"].Split(','));
            options.Applications["Angular"].RootUrl = configuration["App:ClientUrl"];
        });
    }

    private void ConfigureAutoApiControllers()
    {
        Configure<AbpAspNetCoreMvcOptions>(options =>
        {
            options.ConventionalControllers.Create(typeof(AppModule).Assembly);
        });
    }

    private void ConfigureSwagger(IServiceCollection services)
    {
        services.AddAbpSwaggerGen(
            options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Samples API", Version = "v1" });
                options.DocInclusionPredicate((docName, description) => true);
                options.CustomSchemaIds(type => type.FullName);
            }
        );
    }
    private void ConfigureCors(ServiceConfigurationContext context, IConfiguration configuration)
    {
        context.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                    .WithOrigins(
                        configuration["App:CorsOrigins"]
                            .Split(",", StringSplitOptions.RemoveEmptyEntries)
                            .Select(o => o.RemovePostFix("/"))
                            .ToArray()
                    )
                    .WithAbpExposedHeaders()
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
    }

    private void ConfigureEfCore(ServiceConfigurationContext context)
    {
        Configure<Volo.Abp.EntityFrameworkCore.AbpDbContextOptions>(options =>
        {
            options.Configure(configurationContext =>
            {
                configurationContext.UseSqlServer();
            });
        });

        context.Services.AddAbpDbContext<BookStoreDbContext>(options =>
        {
            /* You can remove "includeAllEntities: true" to create
            * default repositories only for aggregate roots
            * Documentation: https://docs.abp.io/en/abp/latest/Entity-Framework-Core#add-default-repositories
            */
            options.AddDefaultRepositories(includeAllEntities: true);
        });
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCorrelationId();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseAuthentication();

        app.UseUnitOfWork();
        app.UseAuthorization();

        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Samples API");
        });

        app.UseAuditing();
        app.UseAbpSerilogEnrichers();
        app.UseConfiguredEndpoints();
    }
}