using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

namespace msa_project.Server.Services
{
    public class DummyEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // No implementation needed, it's a dummy sender to satisfy the dependency
            return Task.CompletedTask;
        }
    }
}
