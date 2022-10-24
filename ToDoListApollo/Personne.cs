using System.ComponentModel.DataAnnotations;

namespace ToDoListApollo
{
    public class Personne
    {
        [Required, MaxLength(30, ErrorMessage = "Name must be 30 characters or less")]
        public String Nom { get; set; }

        [Required, MaxLength(30, ErrorMessage = "Name must be 30 characters or less")]
        public String Prenom { get; set; }

        [Key]
        public int id_p { get; set; }

        public ICollection<ToDoListe>? ToDoListes { get; set; }

        public ICollection<Tache>? Tache { get; set; }
    }
}
