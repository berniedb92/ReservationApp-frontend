import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ClientiInterface {
  id: number;
  nome: string;
  cognome: string;
  dataNascita: string;
  email: string;
  codiceFiscale: string;
  nazionalita: string;
  scadenzaCertificato: string;
  luogoDiNascita: string;
  indirizzo: string;
  numeroTelefono: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ClientiInterface[] =
[

  {
    id: 4,
    nome: "Aurora",
    cognome: "Antoniacci",
    dataNascita: "1998-06-08",
    email: "auria4397@gmail.com",
    codiceFiscale: "001ANT",
    nazionalita: "italiana",
    scadenzaCertificato: "2023-06-12",
    luogoDiNascita: "Roma",
    indirizzo: "via Monte Madonna, 23 Formello(RM)",
    numeroTelefono: "3330000000"
  },
  {
    id: 9,
    nome: "Bernardino",
    cognome: "Di Biagio",
    dataNascita: "1992-08-06",
    email: "bernardinodibiagio@live.it",
    codiceFiscale: "brn001",
    nazionalita: "italiana",
    scadenzaCertificato: "2022-08-12",
    luogoDiNascita: "Orvieto",
    indirizzo: "via Alessandro Guarnelli 22",
    numeroTelefono: "3393517768"
  },
  {
    id: 11,
    nome: "Riccardo",
    cognome: "Bagaglini",
    dataNascita: "1992-10-06",
    email: "bagaric@gmail.com",
    codiceFiscale: "001BGR",
    nazionalita: "italiana",
    scadenzaCertificato: "2022-09-28",
    luogoDiNascita: "Roma",
    indirizzo: "via della Huelva, 69 Velletri(RM)",
    numeroTelefono: "3280000000"
  },
  {
    id: 12,
    nome: "Alessio",
    cognome: "Ciolfi",
    dataNascita: "1990-07-07",
    email: "alecio@gmail.com",
    codiceFiscale: "001CIO",
    nazionalita: "italiana",
    scadenzaCertificato: "2022-12-05",
    luogoDiNascita: "Roma",
    indirizzo: "via Casilina 33, Roma(RM)",
    numeroTelefono: "3480000000"
  }

];


/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<ClientiInterface> {
  data: ClientiInterface[] = EXAMPLE_DATA
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ClientiInterface[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ClientiInterface[]): ClientiInterface[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ClientiInterface[]): ClientiInterface[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'cognome': return compare(a.cognome, b.cognome, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'nazionalita': return compare(a.nazionalita, b.nazionalita, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
