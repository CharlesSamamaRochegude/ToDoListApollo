namespace ToDoListApollo
{
    public class ToDoListe
    {
        public String? name { get; set; }

        public int id { get; set; }

        public String? description { get; set; }

        public ICollection<Tache>? Tache { get; set; }
    }
}
