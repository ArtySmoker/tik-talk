import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { TokenResponse } from '../../auth/auth.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService :AuthService = inject(AuthService);
  router :Router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form :FormGroup<{username: FormControl, password: FormControl}> =new FormGroup( {
    username: new FormControl(null,Validators.required),
    password: new FormControl(null, Validators.required)
  })

 



  onSubmit() {
    if (this.form.valid) {  
      this.authService.login({
        username: this.form.value.username!,
        password: this.form.value.password!
      }).subscribe((res :TokenResponse) =>{
        this.router.navigate([''])
        console.log(res)
      })
      
    }
  }
}
