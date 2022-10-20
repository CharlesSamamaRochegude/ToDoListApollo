import { tache } from './tache';

// Définition de l'interface des Todolistes
export interface Todoliste {
  id: number;
  name: string;
  description: string;
  taches: tache[];
}
