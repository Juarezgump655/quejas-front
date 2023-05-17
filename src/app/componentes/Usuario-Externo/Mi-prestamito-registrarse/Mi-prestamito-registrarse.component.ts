import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/Usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../Models/usuario';

@Component({
  selector: 'app-Mi-prestamito-registrarse',
  templateUrl: './Mi-prestamito-registrarse.component.html',
  styleUrls: ['./Mi-prestamito-registrarse.component.css']
})
export class MiPrestamitoRegistrarseComponent implements OnInit {

  formularioCreacionUsuario: FormGroup= this.formBuilder.group({
    dpi: [],
    Nombre: [],
    apellidos: [],
    correo: [],
    password: [],
    numeroTelefono: [],

  })
  constructor(private router: Router,private formBuilder:FormBuilder, private UsuarioServicio:UsuarioService) { }

  ngOnInit() {
  }

  Home(){
    this.router.navigate(['/menu-principal']);
  }
  irSesion(){
    this.router.navigate(['/login']);
  }

  
  guardarUsuario(user?: Usuario) {
    this.UsuarioServicio.registrarUsuario(user!).toPromise().then(dato => {
      Swal.fire('Usuario Creado', `El Usuario ${user!.nombre} ${user!.apellidos} ha sido creado con exito`, `success`)
      console.log(dato);
      this.irSesion();
    },error => Swal.fire('ERROR', `Hubo problemas al crear el Usuario, Porfavor intenta de nuevo`, `error`))
  }


  CrearUsuario(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    const user: Usuario = {
      idusuario: 0,
      dpi: this.formularioCreacionUsuario.get("dpi")?.value,
      nombre: this.formularioCreacionUsuario.get("Nombre")?.value,
      apellidos: this.formularioCreacionUsuario.get("apellidos")?.value,
      correo: this.formularioCreacionUsuario.get("correo")?.value,
      id_cargo: 8,
      estado: 1,
      usuariocreo:  this.formularioCreacionUsuario.get("dpi")?.value,
      fechacreacion: desdeStr,
      fechamodificacion: desdeStr,
      usuariomodifico:  this.formularioCreacionUsuario.get("dpi")?.value,
      password: this.formularioCreacionUsuario.get("password")?.value,
      rol: 6,
      idpuntoatencion: null,
      telefono: this.formularioCreacionUsuario.get("numeroTelefono")?.value
    }
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      text: '¿Está seguro de continuar?',
      showCancelButton: true,
      confirmButtonText: 'Si , estoy seguro',
      cancelButtonText: 'No, cancelar',
      
    }).then((result) => {
     console.log(user);
     if (result.isConfirmed) {
      this.guardarUsuario(user);
  }

    })
  }


}
