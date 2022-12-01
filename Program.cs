using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Upx;
using Upx.Data;
using Upx.Models.Payment;
using Upx.Service.Payments;
using Upx.Service.Stairs;
using Upx.Service.TokenService;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAuthentication(opt => {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:7006",
            ValidAudience = "https://localhost:7006",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
        };
    });

builder.Services.AddCors(options => options.AddPolicy(name: "OriginsUp",
    policy =>
    {
        policy.WithOrigins("https://localhost:44452").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();


    }));
builder.Services.AddMvc();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer("Server = DESKTOP-BI84236;Database=Upx;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=true;");
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddScoped<StairsServices>();
builder.Services.AddScoped<PaymentsService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());   

app.UseHttpsRedirection();

app.UseCors("OriginsUp");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();