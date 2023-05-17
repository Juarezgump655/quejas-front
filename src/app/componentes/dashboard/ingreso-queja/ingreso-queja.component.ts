import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuejaService } from 'src/app/service/Queja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
import { MedioIngresoQueja } from '../../Models/MedioIngresoQueja';
import { PuntosAtencionList } from '../../Models/PuntosAtencion';
import { Queja, Correlativo } from '../../Models/Queja';
import { TipoQuejaList } from '../../Models/TIpoQueja';
import { Observable } from 'rxjs';
import { FileServiceService } from 'src/app/service/FileService.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-ingreso-queja',
  templateUrl: './ingreso-queja.component.html',
  styleUrls: ['./ingreso-queja.component.css']
})


export class IngresoQuejaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  nombreArchivo: string = '';
  listaMedioIngreso: MedioIngresoQueja[] = [];
  listaPuntosAtencion: PuntosAtencionList[] = [];
  listaTipoQueja: TipoQuejaList[] = [];
  formularioCreacionQueja: FormGroup= this.formBuilder.group({
    medioIngresoQueja: ['', [Validators.required]],
    nombreCuenta: ['', [Validators.required]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    puntoAtencion: ['', [Validators.required]],
    tipoQueja: ['', [Validators.required]],
    detalleQueja: ['', [Validators.required]],
  })
  selectedFiles?: FileList;
  progressInfos: { value: number, fileName: string }[] = [];
  message = '';
  filename = '';
  fileInfos?: Observable<any>;
  correlativo: string = '';

  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
     private quejaServicio: QuejaService,
     private tokenService: TokenService,
     private FileService: FileServiceService) { }

  ngOnInit() {
    this.listarMedioIngresoQueja();
    this.listarPuntosAtencion();
    this.listarTipoQueja();
  }


  crearQueja(){
    const queja: Queja = {
      idMedioIngresoQueja: this.medioIngresoQuejaField?.value,
      idPuntoAtencion: this.puntoAtencionField?.value,
      detalleQueja: this.detalleQuejaField?.value,
      usuariocreo: this.tokenService.getUserName(),
      idTipoQueja:  this.tipoQuejaField?.value,
      nombre: this.nombreCuentaField?.value,
      correo: this.correoElectronicoField?.value,
      telefono: this.telefonoField?.value,
    }
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      text: '¿Está seguro de continuar?',
      showCancelButton: true,
      confirmButtonText: 'Si , estoy seguro',
      cancelButtonText: 'No, cancelar',
      
    }).then((result) => {
      console.log(queja);
     if (result.isConfirmed) {
      this.guardarQueja(queja);
      }
    })
  
  }


  guardarQueja(queja?: Queja) {
      this.quejaServicio.guardarQUeja(queja!).subscribe(dato => {
        this.quejaServicio.getCorrelativo(dato.idQueja!).subscribe(dato =>{
          this.correlativo = dato.correlativo;
          console.log(this.correlativo);
          Swal.fire('Exito', `La queja  ${this.correlativo} fue Ingresada exitosamente`, `success`)
          this.nombreArchivo =this.correlativo;
          this.uploadFiles();
          this.formularioCreacionQueja.reset();
        
        })     
      },error => Swal.fire('ERROR', `Hubo problemas al crear la Queja, por favor intente de nuevo`, `error`))
  }

  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  //este metodo es para el body de la pagina que se ajuste al tamaño de la pantalla 
  getBodyClass(): string {
    let styleclass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleclass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleclass = 'body-md-screen';
    }
    return styleclass;
  }

  listarMedioIngresoQueja(){
    
    this.quejaServicio.listarCatalogoMedioIngreso().subscribe(dato =>{
      console.log(dato);
      this.listaMedioIngreso = dato;

    }
    )
  }

  validarFormulario(){
    if(this.formularioCreacionQueja.valid){
        this.crearQueja();
       
    }else{
      this.formularioCreacionQueja.markAllAsTouched();
    }

  }


  listarPuntosAtencion(){
    this.quejaServicio.listarCatalogoPuntosAtencion().subscribe(dato =>{
      this.listaPuntosAtencion = dato;
      console.log(dato);
    }
    )
  }

  listarTipoQueja(){
    this.quejaServicio.listarCatalogoTipoQueja().subscribe(dato =>{
      this.listaTipoQueja = dato;
      console.log(dato);
    }
    )
  }


  get medioIngresoQuejaField(){
    return this.formularioCreacionQueja.get('medioIngresoQueja');
  }

  get nombreCuentaField(){
    return this.formularioCreacionQueja.get('nombreCuenta');
  }

  get correoElectronicoField(){
    return this.formularioCreacionQueja.get('correoElectronico');
  } 

  get telefonoField(){
    return this.formularioCreacionQueja.get('telefono');
  }

  get puntoAtencionField(){
    return this.formularioCreacionQueja.get('puntoAtencion');
  } 

  get tipoQuejaField(){
    return this.formularioCreacionQueja.get('tipoQueja');
  }

  get detalleQuejaField(){
    return this.formularioCreacionQueja.get('detalleQueja');
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    event.target.files.length == 1 ? this.filename == event.target.files[0].name : this.filename = event.target.files.length + 'archivos_seleccionados';
    this.selectedFiles = event.target.files;
  }


  uploadFiles(): void {
    this.message = '';
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    console.log(this.nombreArchivo)
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.FileService.uploadFile(file, this.nombreArchivo).subscribe( event =>
      {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.FileService.getFiles();
        }
  
      },
  
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'No se puede subir el archivo:' + file.name;
      }
    );
  
  }


}
