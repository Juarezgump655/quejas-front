import { TokenService } from './../../../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuntosAtencion, traerRegiones } from 'src/app/componentes/Models/PuntosAtencion';
import { PuntosAtencionService } from 'src/app/service/PuntosAtencion.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PuntosAtencionComponent } from '../puntos-atencion.component';
@Component({
  selector: 'app-agregar-punto',
  templateUrl: './agregar-punto.component.html',
  styleUrls: ['./agregar-punto.component.css']
})
export class AgregarPuntoComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  crearPuntosForm:FormGroup;
  traerRegiones:traerRegiones[]=[];
  openModal: any;

  constructor(
    private service: PuntosAtencionService,
  private formBuilder:FormBuilder,
  private dialogRef: MatDialogRef<AgregarPuntoComponent>,
  private tokenService: TokenService,
  /* private puntoPrincipalComponent: PuntosAtencionComponent */

  ) { 
    this.crearPuntosForm= this.formBuilder.group({
      idRegion:[null, Validators.required],
      nombrePuntoAtencion:[null,Validators.required],
    
  

      
    })
  }

  ngOnInit() {
    this.obtenerRegiones();
  
  }




  onCancelar(): void {
    this.dialogRef.close();
  }

  obtenerRegiones(){
    this.service.traerRegiones().subscribe((nombreRegion) => {
      this.traerRegiones= nombreRegion;
      console.log(this.traerRegiones);
    });
  }

  guardarPuntosAtencion(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    if (this.crearPuntosForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
     
      
    
      const nuevoPunto: PuntosAtencion={
        idRegion: this.crearPuntosForm.get('idRegion')?.value,
        nombrePuntoAtencion: this.crearPuntosForm.get('nombrePuntoAtencion')?.value,
        fechacreacion: desdeStr,
        fechamodificacion: desdeStr,
        usuariocreo: this.tokenService.getUserName(),
        usuariomodifico: this.tokenService.getUserName(),
        estado: 1,
        
      }
      console.log(nuevoPunto);
      this.service.guardarPuntosAtencion(nuevoPunto).toPromise().then(PUNTO=>{
        Swal.fire({
          titleText: `Se ha almacenado la información con éxito.`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
        });
        
      }
      );
     
    
  
  } 
}
