import { Prenotazione } from '../model/prenotazione';
import { Campo } from '../model/campo';
import { Cliente } from '../model/cliente';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Result {
  code: string
  message: string
}

@Injectable()
export class UtenteAnonimoService {

  url : string;

   // creiamo un BehaviorSubject
  data$: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);

   // emettere valori nel subject
  update(value: Cliente[]) {
     this.data$.next(value);
  }

  getData() {
    return this.data$.getValue(); // restituisce il valore attuale del subject
  }

  constructor(private http: HttpClient){
      this.url = 'http://localhost:8080/api/reservation/'

  }

  public listaClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'list-clienti')
  }

  public listaClientiId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + `list-clienti-id/${id}`)
  }

  public listaClientiDataNascita(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'list-clienti-complex')
  }

  public deleteCliente(id: number): Observable<Result> {
    return this.http.delete<Result>(this.url + `remove-cliente/${id}`)
  }

  public addCliente(cliente: Cliente): Observable<Result> {
    return this.http.post<Result>(this.url + 'add-cliente', cliente)
  }

  public uodateCliente(cliente: Cliente): Observable<Result> {
    return this.http.put<Result>(this.url + 'update-cliente', cliente)
  }

  //***************campo**************/

  public listaCampi(): Observable<Campo[]> {
    return this.http.get<Campo[]>(this.url + 'list-campi')
  }

  public addCampo(campo: Campo): Observable<Result> {
    return this.http.post<Result>(this.url + 'add-campo', campo)
  }

  public deleteCampo(numero: number): Observable<Result> {
    return this.http.get<Result>(this.url + 'remove-campo?numero=' + numero)
  }

  //***************prenotazioni**************/

  public listaPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.url + 'list-pren')
  }

  public listaPrenotazioniDate(data: String): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.url + `list-pren-date/${data}`)
  }

}
