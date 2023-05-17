import { modificarPunto } from './../../../Models/PuntosAtencion';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TIpoQueja, TipoQuejaList, tipoQueja } from 'src/app/componentes/Models/TIpoQueja';
import { TipoQuejaService } from 'src/app/service/tipoQueja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
import { TipoQuejasComponent } from '../tipo-quejas.component';

@Component({
  selector: 'app-modificar-tipo',
  templateUrl: './modificar-tipo.component.html',
  styleUrls: ['./modificar-tipo.component.css']
})
export class ModificarTipoComponent implements OnInit {

  idTipoQueja: number;
  contadorSiglas:any;
  registro:any; 
  listaTipoQuejas: TipoQuejaList[] = [];
  
  constructor(
    private service: TipoQuejaService,
    private dialogRef: MatDialogRef<ModificarTipoComponent>,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.idTipoQueja= data.idTipoQueja;
    this.registro = data.registro;
   console.log(this.registro);
   }


   formularioModificarTipo = new FormGroup({
    siglasQueja: new FormControl(),
    descripcionQueja: new FormControl(),
    idEstado: new FormControl(),
   
  })

  ngOnInit() {
    this.traerLista();

  }

  onCancelar(): void {
    this.dialogRef.close(window.location.href='dashboard/tipo-queja');
    
  }
  
  traerLista(){
    this.service.traerTipoQueja().subscribe(dato=>{
      this.listaTipoQuejas = dato;
    })
      }

validarFormulario(){
  
  if (this.formularioModificarTipo.invalid) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor complete los campos obligatorios.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.dialogRef.close(window.location.href='dashboard/tipo-queja');
    });
  }else{
    this.validarExistencia();
  }
}

  validarExistencia(){
    let siglasQueja = this.formularioModificarTipo.get('siglasQueja')?.value;
    const existente = this.listaTipoQuejas.filter(tipoQueja =>
      tipoQueja.idTipoQueja !== this.registro.idTipoQueja &&
      tipoQueja.siglasQueja === siglasQueja
    )[0];
  
      if(existente){
        Swal.fire({
          title: 'Error',
          text: 'Ya existe un tipo de queja con estas siglas.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.dialogRef.close(window.location.href='dashboard/tipo-queja');
        });
      }else{
        this.alertar(); 
      }
   
  }

  alertar(){
    Swal.fire({
      title: 'Está seguro de guardar los cambios realizados?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar cambios',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.modificarTipo().then(() => {
          // La alerta de éxito de la operación se mostrará después de que la operación haya terminado
          Swal.fire({
            titleText: `Se ha Modificado el tipo de queja con éxito.`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false,
          }).then(() => {//se coloca then para que despues del swal se recargue la pagina, porque si se pone sin el then interrumpe la alerta
            window.location.href='dashboard/tipo-queja';
          });
        })

      }else{
        this.dialogRef.close(window.location.href='dashboard/tipo-queja');
        
      }
    });
  }


  

  modificarTipo(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;


  
    


    const modificarPuntos: tipoQueja={
      siglasQueja: this.formularioModificarTipo.get('siglasQueja')?.value,
      descripcionQueja: this.formularioModificarTipo.get('descripcionQueja')?.value,
      idEstado: this.formularioModificarTipo.get('idEstado')?.value ? 1 : 2,
      fechamodificacion: desdeStr,
      usuariomodifico: this.tokenService.getUserName(),

    }

   return this.service.modificarTipoQueja(this.idTipoQueja,modificarPuntos).toPromise();//el return es para que retorne la promesa que espera el metodo alertar(); para que pueda mostrar el swal


  
  }

}
