import { Todoliste } from './list';
import { TACHE } from './mock_tache'

// Définition de la liste de test des todolistes
export const LISTE: Todoliste[] = [
  { id: 12, name: 'manger', description: "c'est important de manger", taches: [TACHE[0], TACHE[1]]},
  { id: 13, name: 'boire', description: "c'est important de boire", taches: [TACHE[1]] },
  { id: 14, name: 'developper', description: "c'est important de developper", taches: [TACHE[2]] },
  { id: 15, name: 'dormir', description: "c'est important de dormir", taches: [TACHE[3]] },
];
