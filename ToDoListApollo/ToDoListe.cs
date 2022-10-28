using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace ToDoListApollo
{
    public class ToDoListe
    {
        [Key]
        public int id_l { get; set; }

        [Required,MaxLength(50,ErrorMessage = "Titre must be 50 characters or less")]
        public String? Titre_l { get; set; }

        [MaxLength(300, ErrorMessage = "Description must be 300 characters or less")]
        public String? Description { get; set; }

        public DateTimeOffset? Date_echeance_l { get; set; }

        public int Active_l { get; set; }

        public virtual ICollection<Personne> Personne { get; set; }

        public virtual ICollection<Tache> Tache { get; set; }

    }
}
