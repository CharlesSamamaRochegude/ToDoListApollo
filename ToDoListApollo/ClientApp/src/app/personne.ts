import { Todoliste } from "./list";
import { tache } from './tache';

export interface personne {
  nom: string;
  prenom: string;
  int: string;
  id_l: number;
  taches: tache[];
  todoliste: Todoliste[];
}
