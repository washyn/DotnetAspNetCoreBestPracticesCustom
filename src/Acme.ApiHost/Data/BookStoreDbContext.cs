using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Acme.ApiHost.Data
{
    public class BookStoreDbContext : AbpDbContext<BookStoreDbContext>
    {
        // public DbSet<Book> Books { get; set; }
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            /* Include modules to your migration db context */
        }
    }
}
