using System.Data.Entity;

namespace ToDoListApollo
{
    public class Class : DbContext
    {
        public DbSet<Liste> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        public void UseProducts()
        {
        }
    }

}
