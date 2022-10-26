import { tache } from './tache';

// Définition de l'interface des Todolistes
export interface Todoliste {
  id_l: number;
  titre_l: string;
  date_echeance_l: Date;
  description: string;
  taches: tache[];
}
