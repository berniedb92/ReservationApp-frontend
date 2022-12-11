import { Campo } from './campo';
import { Cliente } from "./cliente";
import { Sport } from './sport';
import { Tesseramento } from './tesseramento';

export class Prenotazione {
  id!: number;
  codicePrenotazione!: number;
  data!: Date;
  oraInizio!: Date;
  oraFine!: Date;
  modalita!: string;
  campo!: Campo;
  giocatore1!: Tesseramento;
  giocatore2!: Tesseramento;
  giocatore3!: Tesseramento;
  giocatore4!: Tesseramento;
}
