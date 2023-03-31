import { Prenotazione } from "./Prenotazione";
import { Tesseramento } from "./tesseramento";

export class DettaglioPrenotazione {

  idDettaglio!: number;
  codicePrenotazione!: Prenotazione;
  cliente!: Tesseramento;
  pagamento!: number;
  pagamentoEffettuato!: boolean;
  note!: string;

}
