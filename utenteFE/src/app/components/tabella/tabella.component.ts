import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServizioFormService } from 'src/app/servizio-form.service';
import { ServizioUtenteService } from 'src/app/servizio-utente.service';

@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.css']
})
export class TabellaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['posizione', 'nome', 'cognome', 'email', 'data_di_nascita', 'modifica', 'elimina'];
  dataSource = new MatTableDataSource<Persona>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servizioUtente: ServizioUtenteService, private servizioForm: ServizioFormService) { }

  ngOnInit(): void {
    this.servizioUtente.caricaUtenti.subscribe({
      next: (utenti) => {
        this.dataSource.data = utenti;
      }
    });
    this.servizioUtente.aggiornaUtenti(); // Carica i dati iniziali
  }

  ngAfterViewInit() {
    console.log(this.paginator);  // Aggiungi questo per vedere se il paginator è inizializzato correttamente
    this.dataSource.paginator = this.paginator; // Associa il paginator alla data source
  }

  

  onModifica(element: Persona, event: Event) {
    console.log("ELEMENT: ", element);
    const buttonModifica = event.target as HTMLButtonElement;
    const buttonText = buttonModifica.textContent;
    console.log("Testo del bottone:", buttonText);
    this.servizioForm.mostraForm();
    this.servizioForm.mostraTipo(buttonText);
    this.servizioForm.datiDaMandare(element);
  }

  onAggiungi(event: Event) {
    const buttonElimina = event.target as HTMLButtonElement;
    const buttonText = buttonElimina.textContent;
    console.log("Testo del bottone di Eliminazione:", buttonText);
    this.servizioForm.mostraForm();
    this.servizioForm.mostraTipo(buttonText);
  }

  onElimina(element: Persona) {
    this.servizioUtente.eliminaPersona(element.id)
    .subscribe({
      next: (response) => {
        console.log("Utente eliminato con successo: ", response);
      },
        error: (error) => {
          // Gestisco l'errore
          console.error('Errore durante l\'invio dei dati:', error);
        }
    })
  }
}


export interface Persona {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  dataDiNascita: string;
}

export interface RispostaAPI {
  code: number;
  data: Persona[]; 
  errorMessage: string;
  message: string;
  success: boolean;
}




