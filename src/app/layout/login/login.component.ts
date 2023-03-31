import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthJwtService } from 'src/service/authJwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId: string = "";
  password: string = "";

  formLogin: FormGroup = {} as FormGroup
  get login() { return this.formLogin.controls }

  constructor(private route: Router, private route2: ActivatedRoute,
    private Auth: AuthJwtService
     ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  gestAuth = (): void => {
    console.log(this.userId);

    let username = this.login['username'].value
    let password = this.login['password'].value

    this.Auth.autenticaService(username, password).subscribe({
      next: (response: any) => {
        console.log(response);
        this.route.navigate(['']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }
}
