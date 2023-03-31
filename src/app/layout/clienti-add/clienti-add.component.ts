import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalFunctions } from "src/app/common/global-functions";
import { Cliente } from "src/app/model/Cliente";
import { UtenteAnonimoService } from "src/service/utente-anonimo.service";

@Component({
  selector: 'app-clienti-add',
  templateUrl: './clienti-add.component.html',
  styleUrls: ['./clienti-add.component.scss']
})
export class ClientiAddComponent implements OnInit {
  registerClientForm: FormGroup = {} as FormGroup;
  title: string = "";
  cliente: Cliente = new Cliente()
  _cliente!: Cliente;
  clienteCopy!: Cliente;
  carica!: boolean;
  firstname: any;
  lastname: any;
  /*   set cliente(cliente: Cliente) {
      this._cliente = cliente;
      this.clienteCopy = Object.assign({}, cliente);
    }

    get cliente() {
      return this._cliente;
    } */

  constructor(
    private utenteAnonimoService: UtenteAnonimoService,
    private router: ActivatedRoute,
    private route: Router,
    private snackbar: MatSnackBar,
  ) { }


  ngOnInit(): void {

    const id = this.router.snapshot.params['id'];
    if (id) {

      this.getCliente(id);

    } else {
      this.generateForm();
      this.title = "Inserisci Utente";
    }



  }

  onSubmit(): void {
    this.cliente.nome = this.c['firstname'].value;
    this.cliente.cognome = this.c['lastname'].value;
    this.cliente.dataNascita = this.c['dateOfBirth'].value;
    this.cliente.luogoNascita = this.c['birthPlace'].value;
    this.cliente.codiceFiscale = this.c['fiscalCode'].value;
    this.cliente.nazionalita = this.c['nationality'].value;
    this.cliente.indirizzo = this.c['address'].value;
    this.cliente.numTelefono = this.c['phone'].value;
    this.cliente.email = this.c['email'].value;

    if (this.cliente.id > 0) {
      const userCopy = Object.assign({}, this.cliente)
      this.utenteAnonimoService.uodateCliente(userCopy).subscribe({
        next: (result) => {
          this.goToListClienti();
          this.openSnackBar(result.message, 'OK')
        },
        error: (error) => {
          this.goToAddClienti();
          this.openSnackBar(error.error.message, 'X')
        }
      })
    } else {
      this.utenteAnonimoService.addCliente(this.cliente).subscribe({
        next: (result) => {
          this.goToListClienti();
          this.openSnackBar(result.message, 'OK')
        },
        error: (error) => {
          this.goToAddClienti();
          this.openSnackBar(error.error.message, 'X')
        }
      })
    }

    console.log(this.cliente)
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3500,
    });
  }

  resetForm(form: any) {
    if (this.cliente.id === 0) {
      this.cliente = new Cliente();
    } else {
      this.cliente = this.clienteCopy;
    }

  }

  goToListClienti() {
    this.route.navigate(['cliente-list']);
  }

  goToAddClienti() {
    this.route.navigate(['cliente-add']);
  }

  getCliente(id: number) {
    this.utenteAnonimoService.listaClientiId(id).subscribe({
      next: (response) => {
        console.log(JSON.stringify(JSON.stringify(response)))
        this.cliente = response;
        this.title = "Modifica Cliente " + '(' + response.nome + " " + response.cognome + ')';
        this.generateForm();
      }

    })

  }

  generateForm() {

    this.registerClientForm = new FormGroup({
      firstname: new FormControl(this.cliente.nome ? this.cliente.nome : "", [Validators.pattern('^[a-zA-Z ]*$'), Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(this.cliente.cognome ? this.cliente.cognome : "", [Validators.pattern('^[a-zA-Z ]*$'), Validators.required, Validators.minLength(3)]),
      dateOfBirth: new FormControl(this.cliente.dataNascita ? this.cliente.dataNascita : null, [GlobalFunctions.validateDate(), Validators.required]), // dateStudent is the function to bind custom error
      birthPlace: new FormControl(this.cliente.luogoNascita ? this.cliente.luogoNascita : "", [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]),
      fiscalCode: new FormControl(this.cliente.codiceFiscale ? this.cliente.codiceFiscale : "",
        //[Validators.pattern("^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"), Validators.maxLength(16),Validators.required]
      ),
      nationality: new FormControl(this.cliente.nazionalita ? this.cliente.nazionalita : "", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      address: new FormControl(this.cliente.indirizzo ? this.cliente.indirizzo : "", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      phone: new FormControl(this.cliente.numTelefono ? this.cliente.numTelefono : "", [Validators.pattern("^[0-9]*")]),
      email: new FormControl(this.cliente.email ? this.cliente.email : "", [Validators.email, Validators.required]),
    });



  }

  get c() { return this.registerClientForm.controls; }



  getErrorEmail() {
    if (this.registerClientForm.controls['email'].dirty && (this.registerClientForm.controls['email'].hasError('required'))) {
      return " Campo email obbligatorio";
    } else if (this.registerClientForm.controls["email"].touched && (this.registerClientForm.controls['email'].hasError('required') || this.registerClientForm.controls['email'].hasError('email'))) {
      return "Valore email non valido"
    } else {
      return "";
    }
  }

  getErrorName() {
    if (this.registerClientForm.controls['firstname'].dirty && (this.registerClientForm.controls['firstname'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["firstname"].touched && (this.registerClientForm.controls['firstname'].hasError('required')
      || this.registerClientForm.controls['firstname'].hasError('pattern'))) {
      return "Pattern non rispettato!"
    } else if (this.registerClientForm.controls["firstname"].touched && this.registerClientForm.controls['firstname'].dirty && (this.registerClientForm.controls['firstname'].hasError('minlength'))) {
      return "Minino inserimento caratteri 2"
    } else {
      return "";
    }
  }

  getErrorLastName() {
    if (this.registerClientForm.controls['lastname'].dirty && (this.registerClientForm.controls['lastname'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["lastname"].touched && (this.registerClientForm.controls['lastname'].hasError('required') || this.registerClientForm.controls['lastname'].hasError('pattern'))) {
      return "Pattern non rispettato!";
    } else if (this.registerClientForm.controls["lastname"].touched && this.registerClientForm.controls['lastname'].dirty && (this.registerClientForm.controls['lastname'].hasError('minlength'))) {
      return "Minino inserimento caratteri 2"
    } else {
      return "";
    }
  }

  getErrorBirthPlace() {
    if (this.registerClientForm.controls['birthPlace'].dirty && (this.registerClientForm.controls['birthPlace'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["birthPlace"].touched && (this.registerClientForm.controls['birthPlace'].hasError('required') || this.registerClientForm.controls['birthPlace'].hasError('pattern'))) {
      return "Pattern non rispettato!";
    } else {
      return "";
    }
  }

  getErrorNationality() {
    if (this.registerClientForm.controls['nationality'].dirty && (this.registerClientForm.controls['nationality'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["nationality"].touched && (this.registerClientForm.controls['nationality'].hasError('required') || this.registerClientForm.controls['nationality'].hasError('pattern'))) {
      return "Pattern non rispettato!";
    } else {
      return "";
    }
  }

  getErrorAddress() {
    if (this.registerClientForm.controls['address'].dirty && (this.registerClientForm.controls['address'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["address"].touched && (this.registerClientForm.controls['address'].hasError('required') || this.registerClientForm.controls['address'].hasError('pattern'))) {
      return "Pattern non rispettato!";
    } else {
      return "";
    }
  }

  getErrorPhone() {
    if (this.registerClientForm.controls['phone'].dirty && (this.registerClientForm.controls['phone'].hasError('required'))) {
      return " Campo inserimento obbligatorio";
    } else if (this.registerClientForm.controls["phone"].touched && (this.registerClientForm.controls['phone'].hasError('required') || this.registerClientForm.controls['phone'].hasError('pattern'))) {
      return "Pattern non rispettato!";
    } else {
      return "";
    }
  }
  getRegisterFormDirty() {
    this.registerClientForm.dirty
  }
}

