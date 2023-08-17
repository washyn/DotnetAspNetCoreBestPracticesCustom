using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using Shouldly;
using Volo.Abp.AspNetCore.TestBase;
using Volo.Abp.Http;

namespace Acme.ApiHost.Tests
{
    public abstract class ApiHostTestBase : AbpAspNetCoreIntegratedTestBase<TestStartup> 
    {
        #region Get
        protected virtual async Task<T> GetResponseAsObjectAsync<T>(string url, HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
        {
            var strResponse = await GetResponseAsStringAsync(url, expectedStatusCode);
            return JsonSerializer.Deserialize<T>(strResponse, new JsonSerializerOptions(JsonSerializerDefaults.Web));
        }

        protected virtual async Task<string> GetResponseAsStringAsync(string url, HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
        {
            var response = await GetResponseAsync(url, expectedStatusCode);
            return await response.Content.ReadAsStringAsync();
        }

        protected virtual async Task<HttpResponseMessage> GetResponseAsync(string url, HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
        {
            var response = await Client.GetAsync(url);
            response.StatusCode.ShouldBe(expectedStatusCode);
            return response;
        }
        #endregion

        #region Post

        protected virtual async Task<TResponseObject> PostObjectAsJsonAsync<TRequestObject, TResponseObject>(string url, TRequestObject requestObject, HttpStatusCode? expectedStatusCode = null)
        {
            var strResponse = await PostObjectAsJsonAsync(url, requestObject, expectedStatusCode);
            return JsonSerializer.Deserialize<TResponseObject>(strResponse, new JsonSerializerOptions(JsonSerializerDefaults.Web));
        }

        protected virtual async Task<string> PostObjectAsJsonAsync<TRequestObject>(string url, TRequestObject requestObject, HttpStatusCode? expectedStatusCode = null)
        {
            var response = await PostObjectJsonAsync(url, requestObject, expectedStatusCode);
            return await response.Content.ReadAsStringAsync();
        }

        protected virtual async Task<HttpResponseMessage> PostObjectJsonAsync<TRequestObject>(string url, TRequestObject requestObject, HttpStatusCode? expectedStatusCode = null)
        {
            var json = JsonSerializer.Serialize(requestObject, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            var data = new StringContent(json, Encoding.UTF8, MimeTypes.Application.Json);
            var response = await Client.PostAsync(url, data);
            response.IsSuccessStatusCode.ShouldBeTrue();
            if (expectedStatusCode.HasValue)
            {
                response.StatusCode.ShouldBe(expectedStatusCode.Value);
            }
            return response;
        }

        #endregion
    }
}
