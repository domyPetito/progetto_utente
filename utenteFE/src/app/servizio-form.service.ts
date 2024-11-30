import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServizioFormService {

  constructor() {}

  private mostraFormSubject = new BehaviorSubject<boolean>(false);
  formDaMostrare = this.mostraFormSubject.asObservable();

  private tipoDaMostrareSubject = new BehaviorSubject<string>("");
  tipoDaMostrare = this.tipoDaMostrareSubject.asObservable();

  private datiDaMostrareSubject = new BehaviorSubject<any>(null);
  datiDaMostrare = this.datiDaMostrareSubject.asObservable();

  mostraForm() {
    this.mostraFormSubject.next(true);
  }

  nascondiForm() {
    this.mostraFormSubject.next(false);
  }

  mostraTipo(tipo: any) {
    this.tipoDaMostrareSubject.next(tipo);
  }

  datiDaMandare(dato: any) {
    this.datiDaMostrareSubject.next(dato);
  }
  
}
