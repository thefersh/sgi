import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomService } from 'src/app/services/dom.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSubmit = false;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dom: DomService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      e: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      p: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    document.title = ('Iniciar Sesion - Sistema de Gestion de Inventario');
  }

  submit(): void {
    this.isSubmit = !this.isSubmit;
    if (this.form.valid){
      this.auth.login(this.form.value).finally(() => {
        this.isSubmit = !this.isSubmit;
      });
    } else{
      this.dom.notification('Rellene el Formulario correctamente');
      this.isSubmit = !this.isSubmit;
    }
  }

}
