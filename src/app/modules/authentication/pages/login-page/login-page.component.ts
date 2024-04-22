import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginForm } from '../../../../core/models/authentication.models';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';





@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup<LoginForm>;
  loading: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })

    this.loading = false;


  }


  async onLogin(event: SubmitEvent){
    event.preventDefault();
    this.loading = true;
    // console.log(this.loginForm.value);
    // console.log(this.username.value, this.password.value);
    // if(!this.username.value) {
    //   this.username.setErrors({ required: true });
    // } else {
    //   this.username.setErrors({ required: false });
    await this.authenticationService.login(this.loginForm.value as LoginForm)

    this.loading = false;

    this.router.navigateByUrl('/home')
  }
  // añadir llamada al servicio de autenticacion para realizar la petición de login


  //redireccionar a alguna pagina
}

