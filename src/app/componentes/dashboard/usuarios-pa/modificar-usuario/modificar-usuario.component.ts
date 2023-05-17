import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'src/app/service/token.service';
import { ModificarTipoComponent } from '../../tipo-quejas/modificar-tipo/modificar-tipo.component';
import { UsuarioService } from 'src/app/service/Usuario.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { traerPunto, traerCargo, Usuario } from 'src/app/componentes/Models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  idUsuario:number;
  traerPuntos: traerPunto[]=[];
traerCargo: traerCargo[]=[];
registro:any;

formularioModificarUsuario: FormGroup;

  constructor(
    private service: UsuarioService,
    private dialogRef: MatDialogRef<ModificarTipoComponent>,
    private tokenService: TokenService,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idUsuario=data.idUsuario;
    this.registro=data.registro;
    console.log(this.registro);
    this.formularioModificarUsuario = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      idPuntoatencion: ['', Validators.required],
      id_cargo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.traerPuntosAtencion();
    this.traerCargos();
  }




  onCancelar(): void {
    this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
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



  modificarUsuario(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

  

  

   

      let rol:number=0;

const id_cargo= this.formularioModificarUsuario.get("id_cargo")?.value;

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



      const modificarUsuarios: Usuario={
        nombre: this.formularioModificarUsuario.get("Nombre")?.value,
        apellidos: this.formularioModificarUsuario.get("apellidos")?.value,
        id_cargo: id_cargo,
        rol: rol, 
        idpuntoatencion: this.formularioModificarUsuario.get("idPuntoatencion")?.value,
        estado: this.formularioModificarUsuario.get('estado')?.value ? 1 : 2,
        correo: this.formularioModificarUsuario.get('correo')?.value,
        fechamodificacion: desdeStr,
        usuariomodifico: this.tokenService.getUserName(),
      }

       this.service.modificarUsuario(this.idUsuario, modificarUsuarios).toPromise().then(USUARIO =>{
        const valorEstado= this.formularioModificarUsuario.get('estado')?.value? 1 : 2;
        if(valorEstado===2){
          Swal.fire({
            title: 'Se modificaron correctamente los datos del usuario del punto de atención',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(()=>{
            this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
          });

        }else{
          Swal.fire({
            title: 'Datos actualizados',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(()=>{
            this.dialogRef.close(window.location.href='dashboard/usuarios-pa');
          })
        }


       })

  

  }

  get correoElectronicoField(){
    return this.formularioModificarUsuario.get('correo');
  } 

  get NombreField(){
    return this.formularioModificarUsuario.get('Nombre');
  }

  get apellidosField(){
    return this.formularioModificarUsuario.get('apellidos');
  }

  validarFormulario(){
    if(this.formularioModificarUsuario.valid){
      this.modificarUsuario();
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

  
}
