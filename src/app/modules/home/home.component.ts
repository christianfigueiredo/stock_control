import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
  })


  
  constructor(private formBuilder: FormBuilder) {}

  login() {
    console.log("DADOS DO FORMULARIO DO LOGIN: ",this.loginForm.value);
  }

  signUp() {
    console.log("DADOS DO FORMULARIO DO SIGNUP: ",this.signUpForm.value);
  }

}
