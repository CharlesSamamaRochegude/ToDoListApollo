import { personne } from "./personne";


export interface tache {
  id: number;
  titre_t: string;
  date_echeance_l: string | null;
  id_l: number;
  ressource: personne | null;

}
