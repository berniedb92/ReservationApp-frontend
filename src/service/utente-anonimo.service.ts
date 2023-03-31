import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, Observable } from "rxjs"
import { Cliente } from "src/app/model/Cliente"
import { DettaglioPrenotazione } from "src/app/model/DettagliPrenotazione"
import { DisponibilitaCampo } from "src/app/model/DisponibilitaCampo"
import { Result, ErrorMsg, ResponseNode } from "src/app/model/Response"
import { Campo } from "src/app/model/campo"
import { Prenotazione } from "src/app/model/Prenotazione"
import { TipoTessera, IntegrazioneTessera, Tesseramento } from "src/app/model/tesseramento"

@Injectable()
export class UtenteAnonimoService {

  url: string;


  // creiamo un BehaviorSubject
  data$: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
  router:BehaviorSubject<any> = new BehaviorSubject(null);
  // emettere valori nel subject
  update(value: Cliente[]) {
    this.data$.next(value);
  }

  getData() {
    return this.data$.getValue(); // restituisce il valore attuale del subject
  }

  getUrl(){
    return this.router.getValue();
  }

  setUrl(url:string){
    this.router.next(url)  }

  constructor(private http: HttpClient, private route:Router) {
    this.url = 'http://localhost:8081/api/reservation/';
    this.route.events.subscribe(
      {
        next:()=>{
         this.router.next(this.route.url)
        }
      }
     )

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

  public listaClientiNoTessera(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'list-clienti-notessera')
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

  public searchCampoById(id: any): Observable<Campo> {
    return this.http.get<Campo>(this.url + `campo/${id}`)
  }

  public addCampo(campo: Campo): Observable<Result> {
    return this.http.post<Result>(this.url + 'add-campo', campo)
  }

  public deleteCampo(numero: number): Observable<Result> {
    return this.http.get<Result>(this.url + 'remove-campo?numero=' + numero)
  }

  //***************prenotazioni**************/

  public listaPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.url + 'prenotazione/list-pren')
  }

  public listaPrenotazioniDate(data: String): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.url + `prenotazione/list-pren-date/${data}`)
  }

  public listaPrenotazioniDateNumber(data: String, number: number): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.url + `prenotazione/list-pren-campo/${data}/${number}`)
  }

  public insertPrenotazione(prenotazione: Prenotazione): Observable<Result> {
    return this.http.post<Result>(this.url + `prenotazione/inserisci`, prenotazione);
  }

  public getDettagliPrenotazione(id: number): Observable<DettaglioPrenotazione[]> {
    return this.http.get<DettaglioPrenotazione[]>(this.url + `dett-pre/cerca/codPren/${id}`);
  }

  public modificaDettaglioPrenotazione(dettaglio:DettaglioPrenotazione):Observable<DettaglioPrenotazione>{
    return this.http.post<DettaglioPrenotazione>(this.url+`dett-pre/modifica`,dettaglio);
  }

  //***************tesseramento**************/

  public tipoTessera(): Observable<TipoTessera[]> {
    return this.http.get<TipoTessera[]>(this.url + 'tipo')
  }

  public integrazioneTessera(): Observable<IntegrazioneTessera[]> {
    return this.http.get<IntegrazioneTessera[]>(this.url + 'integrazione')
  }

  public selTesserati():Observable<Tesseramento[]>{
    return this.http.get<Tesseramento[]>(this.url+'list-tesseramenti');
  }

  public selTesseratoCodice(codice: number):Observable<Tesseramento>{
    return this.http.get<Tesseramento>(this.url+`list-tesseramenti-id/${codice}`);
  }

  public selTesseratoUser(user: string):Observable<Tesseramento>{
    return this.http.get<Tesseramento>(this.url+`list-tesseramenti-user/${user}`);
  }

  public insTesserato(tesserato: Tesseramento):Observable<Result>{
    return this.http.post<Result>(this.url+'new-tessera', tesserato);
  }

  public upTesserato(tesserato: Tesseramento):Observable<Result>{
    return this.http.put<Result>(this.url+'modifica-tessera', tesserato);
  }

  public delTesserato(codice: number):Observable<ErrorMsg>{
    return this.http.delete<ErrorMsg>(this.url + `remove-tessera/${codice}`);
  }

  public selTesseratoCognome(cognome: string):Observable<Tesseramento[]>{
    return this.http.get<Tesseramento[]>(this.url + `list-tesseramenti-cognome/${cognome}`);
  }

  public selQuoteTesserato(codice: number):Observable<ResponseNode>{
    return this.http.get<ResponseNode>(this.url + `quote-tessere/${codice}`);
  }

  public selDisponibilita(campo: number):Observable<DisponibilitaCampo[]>{
    return this.http.get<DisponibilitaCampo[]>(this.url + `availability/${campo}`);
  }

  public selDisponibilitaDate(campo: number, giorno: string):Observable<DisponibilitaCampo[]>{
    return this.http.get<DisponibilitaCampo[]>(this.url + `availability/${campo}/${giorno}`);
  }

}
