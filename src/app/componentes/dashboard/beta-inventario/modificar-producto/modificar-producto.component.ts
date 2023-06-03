import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { navDataBetaIstockTable } from '../navDataBetaIstockTable';
import { Producto } from '../beta-inventario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  productos= navDataBetaIstockTable;
  idProducto: number=0;
  producto: any;
  constructor(  private formBuilder:FormBuilder,
    public dialog: MatDialog,) { }
  formularioProducto: FormGroup= this.formBuilder.group({
    Producto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    Stock: ['', [Validators.required]],
  })
  ngOnInit() {
    this.producto = this.buscarProductoPorId(this.idProducto) as Producto; // Realiza un casting al tipo Producto
    console.log(this.producto, this.idProducto);
  }

  public buscarProductoPorId(id: number): any {
    console.log(this.productos.find(producto => producto.id === id))
    return this.productos.find(producto => producto.id === id);
  }
  

  modificar(){
    if(this.formularioProducto.valid){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se modificará el producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificar!'
      }).then((result) => {
          if(result.isConfirmed){      
            this.modificarObjeto();
            Swal.fire({
              titleText: `Datos Actualizados`,
              icon: 'success',
              showCloseButton: true,
              showConfirmButton: false
          });
            this.dialog.closeAll();
          }
        })
    }else{
      this.formularioProducto.markAllAsTouched();
    }
  }
  get ProductoField(){
    return this.formularioProducto.get('Producto');
  }

  get precioField(){
    return this.formularioProducto.get('precio');
  }

  get StockField(){
    return this.formularioProducto.get('Stock');
  }


  modificarObjeto(){
    const index = this.productos.findIndex(producto => producto.id === this.idProducto);
    if (index !== -1) {
      // El objeto con el ID proporcionado se encontró en la lista
      // Realiza la modificación del objeto
      this.productos[index].nombre = this.ProductoField?.value;
      this.productos[index].precio = this.precioField?.value;
      this.productos[index].stock = this.StockField?.value;
    } 
  }
}


