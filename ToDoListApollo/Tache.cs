using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Configuration;

namespace ToDoListApollo
{
    public class Tache
    {
        [Required, MaxLength(200, ErrorMessage = "Titre must be 50 characters or less")]
        public string Titre_t { get; set; }

        [Key]
        public int id_t { get; set; }

        public int active_l { get; set; }

        public DateTime Date_echeance_l { get; set; }

        [ForeignKey(nameof(ToDoListe))]
        public int TodoListId { get; set; }
        
        public ToDoListe? ToDoListe { get; set; }

        [ForeignKey(nameof(Personne))]
        public int PersonneId { get; set; }

        public Personne? Personne { get; set; }
    }
}
