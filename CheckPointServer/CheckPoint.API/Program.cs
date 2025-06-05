using Amazon.Runtime;
using Amazon.S3;
using Amazon;
using CheckPoint.Core;
using CheckPoint.Core.IRepositories;
using CheckPoint.Core.Services;
using CheckPoint.Data;
using CheckPoint.Data.Repositories;
using CheckPoint.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Music.Api.Extensions;
using System.Text;
using System.Text.Json.Serialization;
using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;
using CheckPoint.API;

var builder = WebApplication.CreateBuilder(args);
//builder.Configuration.AddEnvironmentVariables();

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();
// ����� ����������
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// ����� Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddOpenApi();

builder.Services.AddDependencyInjectoions();
builder.Services.AddSwagger();

builder.Services.AddDbContext<DataContext>(options =>
{
    var configuration = builder.Configuration;
    var connectionString = configuration.GetConnectionString("CheckPointDB");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
}, ServiceLifetime.Scoped); // <-- ���� ����

// ����� Authentication � Authorization
builder.AddJwtAuthentication();
builder.AddJwtAuthorization();

builder.Services.AddAutoMapper(typeof(MappingProfile));

//// ����� CORS
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins", builder =>
//    {
//        builder.AllowAnyOrigin()  // ����� �� ���� (���� localhost)
//               .AllowAnyMethod()  // ����� �� ���� (GET, POST, PUT, DELETE ���')
//               .AllowAnyHeader(); // ����� �� �����
//    });
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
    {
        builder
            .WithOrigins("http://localhost:5173", "https://checkpoint-manager.onrender.com", "https://checkpoint-client-pi2r.onrender.com")  // �-origin �� �-client ���
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();  // ���� ����� credentials
    });
});
builder.Services.AddSignalR();

var app = builder.Build();

// ����� CORS �� �������� �������
//app.UseCors("AllowAllOrigins");
app.UseCors("MyCorsPolicy");

// ����� ��������� �� ������
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty; // ���� �� �-Swagger UI �-root URL
});

app.MapGet("/", () => "Welcome to CheckPoint API!");
app.MapHub<NotificationHub>("/hubs/notification");

app.Run();
