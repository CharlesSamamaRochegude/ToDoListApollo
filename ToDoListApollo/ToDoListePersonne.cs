using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListApollo
{
    public class ToDoListePersonne
    {
        [ForeignKey(nameof(Personne))]
        public int Personneid_p { get; set; }

        public Personne Personne { get; set; }

        [ForeignKey(nameof(ToDoListe))]
        public long ToDoListesid_l { get; set; }

        public ToDoListe ToDoListe { get; set; }

    }
}
