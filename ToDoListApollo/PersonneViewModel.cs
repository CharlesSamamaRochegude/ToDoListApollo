using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Reflection.Metadata.Ecma335;

namespace ToDoListApollo
{
    public class PersonneViewModel
    {

        [Required, MaxLength(30, ErrorMessage = "Name must be 30 characters or less")]
        public String Nom { get; set; }

        [Required, MaxLength(30, ErrorMessage = "Name must be 30 characters or less")]
        public String Prenom { get; set; }

        [Key]
        public int id_p { get; set; }

        public virtual ICollection<Tache> Tache { get; set; }

        public static HashSet<PersonneViewModel> Transform(HashSet<Personne> todoliste)
        {
            HashSet<PersonneViewModel> var = new HashSet<PersonneViewModel>();
            foreach (var todo in todoliste)
            {
                var.Add(new PersonneViewModel()
                {
                    Nom = todo.Nom,
                    Prenom = todo.Prenom,
                    id_p = todo.id_p,
                    Tache = todo.Tache
                }
                );
            }
        return var;
        }
    }
}
