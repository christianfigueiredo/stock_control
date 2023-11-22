import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })


  
  constructor(private formBuilder: FormBuilder, 
              private userService: UserService) {}

  login():void {
    console.log("DADOS DO FORMULARIO DO LOGIN: ",this.loginForm.value);
  }

  signUp(){
    if(this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signupUser(this.signUpForm.value as SignupUserRequest).subscribe({
        next: (response) => {
          console.log("RESPONSE: ", response);
          alert("Conta criada com sucesso!");
        },
        error: (error) => {
          console.log("ERROR: ", error);
        }
      })
       
    }
  }

}
