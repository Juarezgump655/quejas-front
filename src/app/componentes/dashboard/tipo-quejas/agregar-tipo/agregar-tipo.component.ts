import { contadorSiglas } from './../../../Models/TIpoQueja';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoQuejaService } from 'src/app/service/tipoQueja.service';
import { TokenService } from 'src/app/service/token.service';
import { AgregarPuntoComponent } from '../../puntos-atencion/agregar-punto/agregar-punto.component';
import Swal from 'sweetalert2';
import { tipoQueja } from 'src/app/componentes/Models/TIpoQueja';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tipo',
  templateUrl: './agregar-tipo.component.html',
  styleUrls: ['./agregar-tipo.component.css']
})
export class AgregarTipoComponent implements OnInit {

  openModal: any;
  crearTpForm:FormGroup;
  contadorSiglas:any

  constructor(
    private service: TipoQuejaService,
    private formBuilder:FormBuilder,
    private dialogRef: MatDialogRef<AgregarTipoComponent>,
    private tokenService: TokenService,
    private router: Router
  ) { 

    this.crearTpForm= this.formBuilder.group({
      siglasQueja:[null, Validators.required],
      descripcionQueja:[null,Validators.required],
    })
  }

  ngOnInit() {
  }


  onCancelar(): void {
    this.dialogRef.close(window.location.href='dashboard/tipo-queja');
  }

  validarFormulario(){
    if (this.crearTpForm.invalid) {
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
    let siglasQueja = this.crearTpForm.get('siglasQueja')?.value;
    this.service.contadorSiglas(siglasQueja).subscribe((data) => {
      this.contadorSiglas=data;
      if(this.contadorSiglas.count >= 1){
        Swal.fire({
          title: 'Error',
          text: 'Ya existe un tipo de queja con estas siglas.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.dialogRef.close(window.location.href='dashboard/tipo-queja');
        });
      }else{
        const nuevoTipo: tipoQueja={
          siglasQueja: siglasQueja,
          descripcionQueja: this.crearTpForm.get('descripcionQueja')?.value
        }
        this.alertar(nuevoTipo);
      }
    });
  }

  alertar(nuevoTipo: tipoQueja){
    Swal.fire({
      title: 'Está seguro de guardar los cambios realizados?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar cambios',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.agregarTipo().then(()=>{

          Swal.fire({
            titleText: `el tipo de queja ${nuevoTipo.siglasQueja} - ${nuevoTipo.descripcionQueja} fue guardado correctamente`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false
          }).then(()=>{
            window.location.href='dashboard/tipo-queja';
          })

        })


      }else{
        this.dialogRef.close(window.location.href='dashboard/tipo-queja');
      }
    });
  }


  

  agregarTipo(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    

    const nuevoTipo: tipoQueja={
      siglasQueja: this.crearTpForm.get('siglasQueja')?.value,
      descripcionQueja: this.crearTpForm.get('descripcionQueja')?.value,
      fechacreacion: desdeStr,
      fechamodificacion: desdeStr,
      usuariocreo: this.tokenService.getUserName(),
      usuariomodifico: this.tokenService.getUserName(),
      idEstado: 1,
    }

    return this.service.guardarTipoQueja(nuevoTipo).toPromise();


  }




}



