
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ToDoListApollo
{
    public class startup : DbContext
    {
        protected readonly IConfiguration Configuration;

        public startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("ToDoListConnection"));
        }
        public DbSet<Tache> Tache { get; set; }
        public DbSet<ToDoListe> ToDoListe { get; set; }
    }
}
