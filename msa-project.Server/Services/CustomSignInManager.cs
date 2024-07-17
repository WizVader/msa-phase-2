using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using msa_project.Server.Data;
using System;
using System.Threading.Tasks;

namespace msa_project.Server.Services
{
    public class CustomSignInManager : SignInManager<ApplicationUser>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ILogger<CustomSignInManager> _logger;

        public CustomSignInManager(UserManager<ApplicationUser> userManager,
                                   IHttpContextAccessor contextAccessor,
                                   IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory,
                                   IOptions<IdentityOptions> optionsAccessor,
                                   ILogger<CustomSignInManager> logger,
                                   IAuthenticationSchemeProvider schemes,
                                   IUserConfirmation<ApplicationUser> confirmation)
            : base(userManager, contextAccessor, claimsFactory, optionsAccessor, (ILogger<SignInManager<ApplicationUser>>)logger, schemes, confirmation)
        {
            _contextAccessor = contextAccessor;
            _logger = logger;
        }

        public override async Task<SignInResult> PasswordSignInAsync(string userName, string password, bool isPersistent, bool lockoutOnFailure)
        {
            var result = await base.PasswordSignInAsync(userName, password, isPersistent, lockoutOnFailure);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByNameAsync(userName);
                if (user != null)
                {
                    Console.WriteLine($"UserId: {user.Id}");
                    Console.WriteLine($"User: {user.UserName}, {user.Email}");

                    // Store the user email in the session
                    _contextAccessor.HttpContext.Session.SetString("UserEmail", user.Email);
                    _logger.LogInformation($"Email {user.Email} saved to session.");
                }
            }
            return result;
        }
    }
}
