import { personne } from "./personne";


export interface tache {
  id_t: number;
  titre_t: string;
  active_l: boolean;
  date_echeance_l: string | null;
  todoListId: number;
  personneId: number;

}
