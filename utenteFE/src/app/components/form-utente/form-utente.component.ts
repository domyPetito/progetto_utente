import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioFormService } from 'src/app/servizio-form.service';
import { ServizioUtenteService } from 'src/app/servizio-utente.service';

@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  mostraForm = false;
  tipoBottone = "";
  id = 0;
  errorEmail = "";
  success = false;

  anagrafePersona: {
    id: number,
    nome: string;
    cognome: string;
    email: string;
    dataDiNascita: string; // Deve essere una stringa in formato 'YYYY-MM-DD'
  } = {
    id: 0,
    nome: '',
    cognome: '',
    email: '',
    dataDiNascita: '' // Inizializzazione vuota
  };

  constructor(private servizioUtente: ServizioUtenteService, private servizioForm: ServizioFormService) { }

  ngOnInit(): void {
    this.servizioForm.formDaMostrare.subscribe(visibile => {
      this.mostraForm = visibile;
      console.log(this.mostraForm);
    });

    this.servizioForm.tipoDaMostrare.subscribe(mostraTipo => {
      this.tipoBottone = mostraTipo;
      console.log(this.tipoBottone);

      // Quando il tipo cambia a "Aggiungi", resetto i valori
      if (this.tipoBottone === 'Aggiungi') {
        this.resetAnagrafePersona();
      }
    });

    this.servizioForm.datiDaMostrare.subscribe(mostraDato => {
      if (this.tipoBottone === 'Modifica') {
        this.anagrafePersona.id = mostraDato.id;
        this.anagrafePersona.nome = mostraDato.nome;
        this.anagrafePersona.cognome = mostraDato.cognome;
        this.anagrafePersona.email = mostraDato.email;
        this.anagrafePersona.dataDiNascita = mostraDato.dataDiNascita;
      }
      console.log("DATI LATO FORM: ", this.anagrafePersona);
    });

    this.servizioUtente.getPersona()
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSubmit(form: NgForm): void {
    const nome = form.value.nome;
    const cognome = form.value.cognome;
    const email = form.value.email;
    const data = form.value.data;

    let objUtente = {
      nome: nome || '',
      cognome: cognome || '',
      email: email || '',
      dataDiNascita: data || ''
    };

    if (this.tipoBottone === 'Modifica') {
      console.log("Ho premuto il bottone modifica");
      const id = this.anagrafePersona.id;
      this.servizioUtente.modificaPersona(id, objUtente)
        .subscribe({
          next: (response) => {
            console.log('Utente aggiornato con successo:', response);
            this.resetForm(form);
          },
          error: (error) => {
            console.error('Errore durante l\'invio dei dati:', error);
          }
        });
    } else if (this.tipoBottone === 'Aggiungi') {
      console.log("Ho premuto il bottone aggiungi");
      this.servizioUtente.insertPersona(objUtente)
        .subscribe({
          next: (response) => {
            console.log('Utente aggiunto con successo:', response);
            if (response.code === 201) {
              this.errorEmail = "* Impossibile inviare i dati. email duplicata";
              this.mostraForm = true;
            } else {
              this.resetForm(form);
            }
          },
          error: (error) => {
            console.error('Errore durante l\'invio dei dati:', error);
          }
        });
    }
  }

  private resetForm(form: NgForm): void {
    form.resetForm();
    this.resetAnagrafePersona();
    this.mostraForm = false;
    this.errorEmail = '';
  }

  private resetAnagrafePersona(): void {
    this.anagrafePersona = {
      id: 0,
      nome: '',
      cognome: '',
      email: '',
      dataDiNascita: ''
    };
  }

  onAnnulla(): void {
    this.servizioForm.nascondiForm();
    this.resetAnagrafePersona(); 
  }
}


