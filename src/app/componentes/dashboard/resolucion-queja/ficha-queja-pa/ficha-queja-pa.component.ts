import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuejaProjectionPA } from 'src/app/componentes/Models/Queja';
import { FileServiceService } from 'src/app/service/FileService.service';
import { QuejaService } from 'src/app/service/Queja.service';
import Swal from 'sweetalert2';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-ficha-queja-pa',
  templateUrl: './ficha-queja-pa.component.html',
  styleUrls: ['./ficha-queja-pa.component.css']
})
export class FichaQuejaPaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  idQueja: string="";
  vistaQUeja:boolean=true;
  vistaDetalle:boolean=false;
  Fichaqueja?: QuejaProjectionPA;
  selectedFiles?: FileList;
  progressInfos: { value: number, fileName: string }[] = [];
  message = '';
  filename = '';
  fileInfos?: Observable<any>;
  nombreArchivo: string = '';
  constructor(   private route: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
    private quejaServicio: QuejaService,
    private FileService: FileServiceService) { 
    this.route.queryParams.subscribe(params => {
      this.idQueja = params['idQueja']
    });
    console.log(this.idQueja);
    this.nombreArchivo= "Documento_soporte"+this.idQueja;
    console.log(this.nombreArchivo);
  }
  nombreField:string="";
  formularioDetalle: FormGroup= this.formBuilder.group({
    detalleQUeja: ['', [Validators.required]],
  })

  ngOnInit() {
      this.fichaPA();
  }

  procedente(){
    Swal.fire({
      title: 'Queja será actualizada a estado procedente, oprima Aceptar si está de acuerdo o Cerrar si no lo está',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cerrar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.actualizarEstado();
        //this.router.navigate(['/dashboard/resolucion-queja']);
        this.vistaQUeja = false;
      }else{
    
      }
    })
  }
  
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass(): string {
    let styleclass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleclass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleclass = 'body-md-screen';
    }
    return styleclass;
  }

  fichaPA(){
    this.quejaServicio.fichaPa(this.idQueja).subscribe(data =>{
        this.Fichaqueja=data;
     }
    )
  }

  actualizarEstado(){
    this.quejaServicio.actualizarEstadoProcedente(this.idQueja);
    
  }

  alertar(){
    this.vistaDetalle = true;
    this.nombreField= "Ingresa una Justificacion";
  }


  ingresarDetalle(){
    this.vistaDetalle = true;
    this.nombreField= "Ingresa un detalle";
  }


  resolver(){
    if(this.formularioDetalle.invalid){
        this.formularioDetalle.markAllAsTouched();
    }else{
      Swal.fire({
        title: 'Queja será resuelta, verificar que haya ingresado detalles de la gestión, no se podrá ingresar más información',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Resolver',
        cancelButtonText: 'Cerrar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.enviarDetalle();
          this.uploadFiles();
          this.router.navigate(['/dashboard/resolucion-queja']);
        }else{
      
        }
      })
    }
  }


  descargarArchivo() {
    this.FileService.descargarArchivo(this.idQueja+".pdf").subscribe(
      (blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = this.idQueja+".pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => console.log(error)
    );
  }


  enviarDetalle(){
    this.quejaServicio.actualizarJustificacion(this.idQueja, this.detalleQUejaField!.value)
  }


  get detalleQUejaField(){
    return this.formularioDetalle.get('detalleQUeja');
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
