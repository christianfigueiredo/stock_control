import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
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
              private userService: UserService,
              private cookieService: CookieService,
              private messageService: MessageService,
              private router: Router
              ) {}

  login():void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if(response) {
            this.cookieService.set('USER_TOKEN', response?.token);
            //alert("Login efetuado com sucesso!");
            this.loginForm.reset(); 
            this.router.navigate(['/dashboard']);
            this.messageService.add({
              severity:'success',
              summary: 'Success', 
              detail: 'Login efetuado com sucesso! Sr.  ' +response.name, 
              life: 2000});          
          }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Erro ao efetuar login ', life: 2000});          

          console.log("ERROR: ", error);
        },
      });
    }
  }

  signUp(){
    if(this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signupUser(this.signUpForm.value as SignupUserRequest).subscribe({
        next: (response) => {
          if(response) {
           // alert("Usuário criado com sucesso!");
            this.signUpForm.reset();
            this.loginCard = true;
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Usuário criado com sucesso! Sr.  ' +response.name, life: 2000});          

          }          
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Erro ao criar usuário ' , life: 2000});          

          console.log("ERROR: ", error);
        }
      })
       
    }
  }

}
