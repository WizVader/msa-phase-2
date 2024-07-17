using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using msa_project.Server.Data;
using msa_project.Server.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("organiseasy_connection_string")
                       ?? throw new InvalidOperationException("Connection string 'organiseasy_connection_string' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

// Identity configuration
builder.Services.AddAuthorization();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
    options.SignIn.RequireConfirmedEmail = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultUI();

// Add services to the container
builder.Services.AddScoped<SignInManager<ApplicationUser>, CustomSignInManager>();
builder.Services.AddTransient<IEmailSender, DummyEmailSender>();
builder.Services.AddControllers();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the middleware pipeline
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<ApplicationUser>();

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email });
}).RequireAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapFallbackToFile("/index.html");

app.Run();
