import { Component, OnInit } from '@angular/core';
import { navDataBetaIstockTable } from '../beta-inventario/navDataBetaIstockTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ventas } from './Ventas';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';

interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-ventas-invetario',
  templateUrl: './ventas-invetario.component.html',
  styleUrls: ['./ventas-invetario.component.css']
})
export class VentasInvetarioComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  productos= ventas;
  ultimoId: number=0;
  public elementosPorPagina = 5;
  public paginaActual = 1;
  constructor() { }

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
  ngOnInit() {
  }

  
 //Metodos para la paginacion
 public obtenerElementosPorPagina(): any[] {
  const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
  const fin = inicio + this.elementosPorPagina;
  return this.productos.slice(inicio, fin);
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
  
public numeroDePaginas(): number {
  return Math.ceil(this.productos.length / this.elementosPorPagina);
}


Imprimirpdf() {
  var doc = new jsPDF();
  var fechaActual = new Date().toLocaleDateString(); // Obtener la fecha actual

  var headerText = "Ventas del dia - " + fechaActual;
  var textWidth = doc.getTextWidth(headerText);

  // Calcular la posición centrada
  var pageWidth = doc.internal.pageSize.getWidth();
  var textX = (pageWidth - textWidth) / 2;

  // Agregar el encabezado centrado
  doc.text(headerText, textX, 10);
  autoTable(doc,{html:"table"});
  doc.save("Inventario.pdf")
 }


 fileName= 'Inventario.xlsx';
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

}
