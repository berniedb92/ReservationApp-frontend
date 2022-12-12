import { Cliente } from "./cliente";

export class Tesseramento {
  clienteTess!: Cliente;
  tipo!: TipoTessera;
  integrazione!: IntegrazioneTessera;
  codiceTessera!: number;
  dataTesseramento!: Date;
  scadenzaCertificato!: Date;
  attiva!: boolean;
  scadenzaTessera!: Date;
  note!: string;
  pagamento!: number;
  pagata!: boolean;
}

export class IntegrazioneTessera{
  id!: number;
  tipo!: string;
  prezzo!: number;
}

export class TipoTessera {
  id!: number;
  quotaAssociativa!: number;
  tipo!: string;
  prezzo!: number;
}
