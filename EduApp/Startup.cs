using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EduApp.Startup))]
namespace EduApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
