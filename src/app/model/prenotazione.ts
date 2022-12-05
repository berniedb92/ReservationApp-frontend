import { Campo } from './campo';
import { Cliente } from "./cliente";

export class Prenotazione {
  id!: number;
  data!: Date;
  oraInizio!: Date;
  oraFine!: Date;
  modalita!: string;
  cliente1!: Cliente;
  cliente2!: Cliente;
  campo!: Campo;
}
