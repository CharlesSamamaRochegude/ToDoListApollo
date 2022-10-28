
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ToDoListApollo
{
    public class AppDbContext : DbContext
    {   
        public AppDbContext(DbContextOptions options):base(options)
        {
            
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            /*options.UseSqlServer(Configuration.GetConnectionString("ToDoListConnection"));*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ToDoListe>().HasMany(p => p.Personne).WithMany(p => p.ToDoListes).UsingEntity<ToDoListePersonne>();
            modelBuilder.Entity<Personne>().HasData(new List<Personne>()
            {
                new Personne()
                {
                    id_p = 1,
                    Nom = "",
                    Prenom = "Julien"
                },
                new Personne()
                {
                    id_p = 2,
                    Nom = "",
                    Prenom = "Julien2"
                }
            });

            modelBuilder.Entity<ToDoListe>().HasData(new List<ToDoListe>()
            {
                new ToDoListe()
                {
                    id_l = 1,
                    Titre_l = "Titre",
                }
            });
        }

        public DbSet<Tache> Tache { get; set; }
        public DbSet<ToDoListe> ToDoListe { get; set; }
        public DbSet<Personne> Personne { get; set; }

    }
}
