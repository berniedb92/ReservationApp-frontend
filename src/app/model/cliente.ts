import { ClientiInterface } from "../data-table/data-table-datasource";

export class Cliente {
    id!: number;
    nome!: string;
    cognome!: string;
    dataNascita!: Date;
    email!: string;
    codiceFiscale!: string;
    nazionalita!: string;
    luogoNascita!: string;
    indirizzo!: string;
    numTelefono!: string;
}
