import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SesionService } from 'src/app/service/sesion.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
import { usuarioSesion } from '../Models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogueo:FormGroup;


  constructor(private fb:FormBuilder, private sesionService:SesionService,
    private tokenService:TokenService,
    private router: Router)  { 

    this.formLogueo= this.fb.group({
      usuario:['', Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }


ingresar(){
  console.log(this.formLogueo.value);

  const sesion:usuarioSesion={
    username:this.formLogueo.get('usuario')?.value,
    password:this.formLogueo.get('password')?.value
  }

  this.sesionService.iniciarSesion(sesion).subscribe(token=>{
    Swal.fire({
      icon: 'success',
      timerProgressBar: true,
      title: 'Bienvenido ' + this.formLogueo.get('usuario')?.value,
      showConfirmButton: false,
      timer: 1000
    })
    this.tokenService.setToken(token.jwt);
    this.tokenService.setUserName(token.nombre);
    this.tokenService.setRol(token.rol);
    localStorage.clear();

    this.router.navigateByUrl('/dashboard/principal');
  },error => Swal.fire('ERROR', `El usuario y/o la contraseña ingresados son incorrectos por favor intente de nuevo`, `error`))

}

}
