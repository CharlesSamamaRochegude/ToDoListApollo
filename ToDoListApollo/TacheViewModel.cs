using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace ToDoListApollo
{
    public class TacheViewModel
    {
        [Required, MaxLength(200, ErrorMessage = "Titre must be 50 characters or less")]
        public string Titre_t { get; set; }

        [IntegerValidator(MinValue = 0, MaxValue = 1, ExcludeRange = true)]
        public int active_l { get; set; }

        public DateTime Date_echeance_l { get; set; }

        public int TodoListId { get; set; }

        public int PersonneId { get; set; }



        public static Tache Transform(TacheViewModel todo)
        {
            return new Tache()
            {
                Date_echeance_l = todo.Date_echeance_l,
                active_l = todo.active_l,
                Titre_t = todo.Titre_t,
                TodoListId = todo.TodoListId,
                PersonneId = todo.PersonneId
            };
        }
    }
}
