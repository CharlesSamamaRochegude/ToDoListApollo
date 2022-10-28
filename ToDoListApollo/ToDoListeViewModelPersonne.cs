using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace ToDoListApollo
{
    public class ToDoListeViewModelPersonne
    {

        public string Titre_l { get; set; }

        public string Description { get; set; }

        public DateTimeOffset? Date_echeance_l { get; set; }

        public int Active_l { get; set; }

        public ICollection<PersonneViewModel> personneViewModel { get; set; }

        public int id_l { get; set; }


        public static List<ToDoListeViewModelPersonne> Transform(List<ToDoListe> todoliste)
        {
            List<ToDoListeViewModelPersonne> var =new List<ToDoListeViewModelPersonne>();
             foreach (var todo in todoliste)
            {
                var.Add(new ToDoListeViewModelPersonne()
                {
                    Titre_l = todo.Titre_l,
                    Description = todo.Description,
                    Date_echeance_l = todo.Date_echeance_l,
                    Active_l = todo.Active_l,
                    id_l =todo.id_l,
                    personneViewModel =PersonneViewModel.Transform((HashSet<Personne>)todo.Personne)
                }
                );
            }
            return var;
        }
    }

}
