import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona, RispostaAPI } from './components/tabella/tabella.component';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServizioUtenteService {

  constructor(private http: HttpClient) { }

  private utentiSubject = new BehaviorSubject<Persona[]>([]);
  caricaUtenti = this.utentiSubject.asObservable();

  getPersona(): Observable<RispostaAPI> {
    return this.http.get<RispostaAPI>("http://localhost:8080/utente"); // Sostituisci con il vero URL dell'API
  }

  aggiornaUtenti() {
    this.getPersona().subscribe({
      next: (response: RispostaAPI) => {
        this.utentiSubject.next(response.data);
      }
    });
  }


  insertPersona(body: {}) {
    return this.http.post<RispostaAPI>("http://localhost:8080/utente", body).pipe(
      tap(() => this.aggiornaUtenti())
    );
  }

  modificaPersona(id: number, body: {}) {
    return this.http.put<RispostaAPI>(`http://localhost:8080/utente/${id}`, body).pipe(
      tap(() => this.aggiornaUtenti())
    );
  }

  eliminaPersona(id: number) {
    return this.http.delete<RispostaAPI>(`http://localhost:8080/utente/${id}`).pipe(
      tap(() => this.aggiornaUtenti())
    );
  }
  
}
