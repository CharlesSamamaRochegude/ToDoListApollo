import { personne } from './personne';
import { tache } from './tache';

// Définition de l'interface des Todolistes
export interface Todoliste {
  id_l: number;
  titre_l: string | undefined;
  description: string | undefined;
  date_echeance_l: string | null ;
  active_l: number;
  taches: tache[];
  personnes: personne[];
}
