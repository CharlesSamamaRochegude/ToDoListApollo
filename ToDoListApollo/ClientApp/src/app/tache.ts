import { personne } from "./personne";


export interface tache {
  id_t: number;
  Titre_t: string;
  active_l: boolean;
  Date_echeance_l: string | null;
  TodoListId: number;
  PersonneId: number;

}
