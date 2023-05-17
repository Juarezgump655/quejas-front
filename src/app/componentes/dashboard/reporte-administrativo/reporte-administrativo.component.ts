import { Component, OnInit } from '@angular/core';
import { QuejaService } from 'src/app/service/Queja.service';
import { Queja, tableQueja } from '../../Models/Queja';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuntosAtencion } from '../../Models/PuntosAtencion';
import { RegionService } from 'src/app/service/Region.service';
import { Region } from '../../Models/Region';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TrazabilidadComponent } from './trazabilidad/trazabilidad.component';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-reporte-administrativo',
  templateUrl: './reporte-administrativo.component.html',
  styleUrls: ['./reporte-administrativo.component.css']
})
export class ReporteAdministrativoComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  public elementosPorPagina = 5;
  public paginaActual = 1;
  regiones: Region[] = [];
  listaPuntosAtencion: PuntosAtencion[] = [];
  formularioReporteria: FormGroup= this.formBuilder.group({
    FechaInicio: ['', [Validators.required]],
    FechaFinal: ['', [Validators.required]],
    correlativo: ['', [Validators.required]],
    puntoAtencion: ['', [Validators.required]],
    region: ['', [Validators.required]],
  })
  listaQuejas: tableQueja[] = [];
  constructor(
    private formBuilder:FormBuilder,
    private quejaServicio:QuejaService,
    private service:RegionService,
    public dialog: MatDialog,
  
    ) { }

  ngOnInit() {
    this.listarPuntosAtencion();
    this. obtenerRegiones();
  }
  public correlativo:string="";

  listarPuntosAtencion(){
    this.quejaServicio.listarCatalogoPuntosAtencion().subscribe(dato =>{
      this.listaPuntosAtencion = dato;
      console.log(dato);
    }
    )
  }


  obtenerRegiones(){
    this.service.getRegionList().subscribe(dato => {
      this.regiones = dato;
    });
  }
  
  //Metodos para la paginacion
  public obtenerElementosPorPagina(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.listaQuejas.slice(inicio, fin);
  }

  //Metodos para la paginacion
  public retrocederPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
  
  //Metodos para la paginacion
  public avanzarPagina(): void {
    if (this.paginaActual < this.numeroDePaginas()) {
      this.paginaActual++;
    }
  }
  //Metodos para la paginacion
  
  public numeroDePaginas(): number {
    return Math.ceil(this.listaQuejas.length / this.elementosPorPagina);
  }

  //metodo del body para el dashboard
  getBodyClass(): string {
    let styleclass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleclass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleclass = 'body-md-screen';
    }
    return styleclass;
  }


  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  //Metodo para traer las quejas
  /* traerQuejas(){
    this.quejaServicio.listarQuejaPorPuntoAtencion(1).subscribe(dato =>{
      this.listaQuejas = dato;
    })
  } */
//Metodo para descargar el pdf
  Imprimirpdf() {
    var doc = new jsPDF();
    var headerText = "REPORTE DE QUEJAS POR MAL SERVICIO O SERVICIO NO CONFORME";
    var textWidth = doc.getTextWidth(headerText);
  
    // Calcular la posición centrada
    var pageWidth = doc.internal.pageSize.getWidth();
    var textX = (pageWidth - textWidth) / 2;
  
    // Agregar el encabezado centrado
    doc.text(headerText, textX, 10);
    autoTable(doc,{html:"table"});
    doc.save("quejas.pdf")
   }
   fileName= 'quejas.xlsx';
   exportexcel(): void
   {
     /* pass here the table id */
     let element = document.getElementById('table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);
  
   }
   
   consultarFechas(fechaInicio?:string, fechaFinal?:string){
    this.quejaServicio.tablaQuejaporFechas(fechaInicio!,fechaFinal!).subscribe(dato =>{
      this.listaQuejas = dato;
    })
   }

   consultarCorrelativo(correlativo?:string){
    this.quejaServicio.tableQuejasCorrelativo(correlativo!).subscribe(dato =>{
      this.listaQuejas = dato;
    })
   }

   consultarPuntoAtencion(puntoAtencion?:number){
    this.quejaServicio.getQuejasPorPuntosAtencion(puntoAtencion!).subscribe(dato =>{
      this.listaQuejas = dato;
    })
   }

   consultarRegion(region?:number){
    this.quejaServicio.getQUejasRegion(region!).subscribe(dato =>{
      this.listaQuejas = dato;
    })
  }



  filtrar(){
    if (this.fechaInicioField!.value != "" && this.fechaFinalField!.value != "") {
      const fechaInicio = new Date(this.fechaInicioField!.value);
      const fechaFinal = new Date(this.fechaFinalField!.value);
      
      if (fechaInicio > fechaFinal) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La fecha de inicio no puede ser mayor a la fecha final',
        })
        return;
      }
      this.consultarFechas(this.fechaInicioField!.value, this.fechaFinalField!.value);
    } else if (this.formularioReporteria.get('correlativo')!.value != "") {
      this.consultarCorrelativo(this.formularioReporteria.get('correlativo')!.value);
    } else if (this.formularioReporteria.get('puntoAtencion')!.value != "") {
      console.log(this.formularioReporteria.get('puntoAtencion')!.value);
      this.consultarPuntoAtencion(parseInt(this.formularioReporteria.get('puntoAtencion')!.value));
    }else if (this.formularioReporteria.get('region')!.value != "") {
      this.consultarRegion(parseInt(this.formularioReporteria.get('region')!.value));
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar al menos un campo',
      })
    }
  }


   get fechaInicioField(){
    return this.formularioReporteria.get('FechaInicio');
   }

    get fechaFinalField(){
    return this.formularioReporteria.get('FechaFinal');
    }


    verDetalle(idQueja:string){
        const dialogRef = this.dialog.open(TrazabilidadComponent, {
          width: '600px',   
          height: '300px',  
         
        });
        dialogRef.componentInstance.correlativo = idQueja;
      
  }
    
}
