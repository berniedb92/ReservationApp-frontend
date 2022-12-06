import { Campo } from './campo';
import { Cliente } from "./cliente";
import { Sport } from './sport';

export class Prenotazione {
  id!: number;
  codicePrenotazione!: number;
  data!: Date;
  oraInizio!: Date;
  oraFine!: Date;
  modalita!: string;
  cliente!: Cliente;
  campo!: Campo;
  sport!: Sport;
  giocatore1!: string;
  giocatore2!: string;
  giocatore3!: string;
  giocatore4!: string;
}
