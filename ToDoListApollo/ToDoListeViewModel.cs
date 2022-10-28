using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace ToDoListApollo
{
    public class ToDoListeViewModel
    {

        [Required, MaxLength(50, ErrorMessage = "Titre must be 50 characters or less")]
        public string Titre_l { get; set; }

        [MaxLength(300, ErrorMessage = "Description must be 300 characters or less")]
        public string Description { get; set; }

        public DateTimeOffset? Date_echeance_l { get; set; }

        public int Active_l { get; set; }

        public static ToDoListe Transform(ToDoListeViewModel todo)
        {
            return new ToDoListe()
            {
                Date_echeance_l = todo.Date_echeance_l,
                Active_l = todo.Active_l,
                Description = todo.Description,
                Titre_l = todo.Titre_l,
            };
        }
    }

}
