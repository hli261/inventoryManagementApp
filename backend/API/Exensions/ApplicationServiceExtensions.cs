using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Exensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IBinRepository, BinRepository>();

            services.AddScoped<IBinRepository, BinRepository>();
            services.AddScoped<IBinTypeRepository, BinTypeRepository>();
            services.AddScoped<IBinItemRepository, BinItemRepository>();
            services.AddScoped<IWarehouseLocationRepository, WarehouseLocationRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<CSVService>();

            services.AddScoped<IShippingRepository, ShippingRepository>(); ///////
            services.AddScoped<IVenderRepository, VenderRepository>(); ///////
            services.AddScoped<IERPRepository, ERPRepository>();

            services.AddScoped<IReceivingItemRepository, ReceivingItemRepository>();
            services.AddScoped<IReceivingRepository, ReceivingRepository>();


            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}