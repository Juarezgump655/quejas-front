import { TokenService } from './../../../../service/token.service';
import { Usuario, traerCargo } from './../../../Models/usuario';
import { UsuarioService } from 'src/app/service/Usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { traerRegiones } from 'src/app/componentes/Models/PuntosAtencion';
import { PuntosAtencionService } from 'src/app/service/PuntosAtencion.service';
import { traerPunto } from 'src/app/componentes/Models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

 
  crearUserForm: FormGroup;
traerPuntos: traerPunto[]=[];
traerCargo: traerCargo[]=[];
contadorUsuarios:any;


  constructor(
    private service: UsuarioService,
    private formBuilder:FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private dialogRef: MatDialogRef<AgregarUsuarioComponent>
  ) { 

    this.crearUserForm= this.formBuilder.group({
     
      dpi: [],
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      correo: ['',[Validators.required, Validators.email]],
      password: [],
      numeroTelefono: [],
      id_cargo:[],
      idPuntoatencion:[]
      
      
    })
  }

  ngOnInit() {
    this.traerPuntosAtencion();
    this.traerCargos();
  }
  get correoElectronicoField(){
    return this.crearUserForm.get('correo');
  } 

traerPuntosAtencion(){
  this.service.puntos().subscribe((puntos) => {
    this.traerPuntos= puntos;
    console.log(this.traerPuntos);
  });
}

traerCargos(){
  this.service.cargo().subscribe((cargos) => {
    this.traerCargo= cargos;
    console.log(this.traerCargo);
  });
}




validarFormulario(){
  if(this.crearUserForm.valid){
    this.validarExistencia();
  }else{
    Swal.fire({
      title: 'Error',
      text: 'Por favor ingrese los datos correctamente.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
    })
  }

}

validarExistencia(){
  const dpi= this.crearUserForm.get("dpi")?.value;
  this.service.contExistenciaUsuario(dpi).subscribe((data)=>{
    this.contadorUsuarios=data;
    if(this.contadorUsuarios?.count >= 1){
      Swal.fire({
        title: 'Error',
        text: 'Error al guardar los datos, el usuario ya existe en el punto de atención '+this.contadorUsuarios.nombrePunto ,
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(()=>{
        this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
      })
    }else{
      this.CrearUsuario();
    }
  });
}



CrearUsuario(): void {
  let fecha = new Date();69
  let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

  

let rol:number=0;
const id_cargo= this.crearUserForm.get("id_cargo")?.value;
switch(id_cargo){
  case 1:
    rol=1;
    break;
  case 2:
    rol=2;
    break;
  case 3:
    rol=2;
    break;
  case 4:
    rol=2;
    break;
  case 5:
    rol=2;
    break;
  case 6:
    rol=3;
    break;
  case 7:
    rol=4;
    break;


}



  const user: Usuario = {
    idusuario: 0,
    dpi: this.crearUserForm.get("dpi")?.value,
    nombre: this.crearUserForm.get("Nombre")?.value,
    apellidos: this.crearUserForm.get("apellidos")?.value,
    correo: this.crearUserForm.get("correo")?.value,
    id_cargo: id_cargo,
    estado: 1,
    usuariocreo:  this.tokenService.getUserName(),
    fechacreacion: desdeStr,
    fechamodificacion: desdeStr,
    usuariomodifico:  this.tokenService.getUserName(),
    password: this.crearUserForm.get("password")?.value,
    rol: rol, 
    idpuntoatencion: this.crearUserForm.get("idPuntoatencion")?.value,
    telefono: this.crearUserForm.get("numeroTelefono")?.value
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
    this.guardarUsuario(user).then(()=>{

      Swal.fire({title: '',
      text: 'Se guardaron correctamente los datos del usuario para el punto de atención',
      icon: 'success',
      confirmButtonText: 'OK'}).then(()=>{
        window.location.href='dashboard/usuarios-pa';
      })


    })

}else{
  this.dialogRef.close(window.location.href='dashboard/usuarios-pa')
}

  })
}



guardarUsuario(user?: Usuario) {
  return this.service.registrarUsuario(user!).toPromise();

}



onCancelar(): void {
  this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
}

}


