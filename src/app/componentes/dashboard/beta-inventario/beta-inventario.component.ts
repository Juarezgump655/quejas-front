import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { navDataBetaIstockTable } from './navDataBetaIstockTable';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}
@Component({
  selector: 'app-beta-inventario',
  templateUrl: './beta-inventario.component.html',
  styleUrls: ['./beta-inventario.component.css']
})

export class BetaInventarioComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  productos= navDataBetaIstockTable;
  ultimoId: number=0;
  public elementosPorPagina = 5;
  public paginaActual = 1;
  constructor( public dialog: MatDialog) {
    this.ultimoId = 10;
  }

  ngOnInit() {
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

  eliminar(id:number, nombre:string){
    Swal.fire({
      title: 'Esta seguro que desea eliminar el producto de nombre: '+nombre+'?',
      text: 'Al eliminar el producto se borrara de la lista y no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Elimnar',
      cancelButtonText: 'Cerrar'
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire({
          titleText: `Datos eliminados`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
      });
        this.productos = this.productos.filter(producto => producto.id !== id);
      }else{
    
      }
    })

  }


  agregarProducto() {
    const nuevoId = this.ultimoId + 1;
    const nuevoProducto = {id: nuevoId, nombre: 'Nuevo Producto', precio: 15, stock: 5};
    this.productos.push(nuevoProducto);
    this.ultimoId = nuevoId;
  }


  agregar(){
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '700px',   
      height: '500px',  
     
    });
  
}


modificar(numero:number){
  const dialogRef = this.dialog.open(ModificarProductoComponent, {
    width: '700px',   
    height: '500px',  
   
  });
  dialogRef.componentInstance.idProducto = numero;
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

  var headerText = "Inventario de productos - " + fechaActual;
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
