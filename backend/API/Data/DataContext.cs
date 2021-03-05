using System.Reflection.Emit;
using System.Security.Cryptography;
using System.Runtime.CompilerServices;
using System.Collections.Immutable;
using System.Diagnostics.Contracts;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
    AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        // public DbSet<AppUser> Users {get; set;}
        // public DbSet<AccessControl> Access {get;set;}

        public DbSet<Bin> Bins { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<BinItem> BinItems { get; set; }

        public DbSet<BinType> BinTypes { get; set; }
        public DbSet<WarehouseLocation> WarehouseLocations { get; set; }

        public DbSet<Shipping> Shippings { get; set; }
        public DbSet<ShippingMethod> ShippingMethods { get; set; }
        public DbSet<ShippingLot> ShippingLots { get; set; }
        public DbSet<Vender> Venders { get; set; }

        public DbSet<ERP_POheader> ERP_POheaders { get; set; }
        public DbSet<ERP_POitem> ERP_POitems { get; set; }

        public DbSet<Receiving> Receivings {get;set;}
        public DbSet<ReceivingItem> ReceivingItems {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

            builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();


        }
    }
}