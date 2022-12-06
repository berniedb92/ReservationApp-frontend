import { Cliente } from "./cliente";

export class Tesseramento {
  clienteTess!: Cliente;
  tipoTessera!: TipoTessera;
  integrazioneTessera!: IntegrazioneTessera;
  codiceTessera!: number;
  dataTesseramento!: Date;
  scadenzaCertificato!: Date;
}

export class IntegrazioneTessera{
  id!: number;
  tipoIntegrazione!: string;
  prezzo!: number;
}

export class TipoTessera {
  id!: number;
  quotaAssociativa!: number;
  tipo!: string;
  prezzo!: number;
}
