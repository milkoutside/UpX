using Microsoft.EntityFrameworkCore;
using Stairs;

namespace Upx.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) :base(options)
    {
        Database.EnsureCreated();

    }

    public DbSet<Users> Users { get; set; }
    
    public DbSet<PaymentsDbo> Operations { get; set; }

}