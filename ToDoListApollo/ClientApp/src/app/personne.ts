import { Todoliste } from "./list";
import { tache } from './tache';

export interface personne {
  nom: string;
  prenom: string;
  id_p: number;
  taches: tache[];
  todoliste: Todoliste[];
}
