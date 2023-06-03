import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { navDataBetaIstockTable } from '../navDataBetaIstockTable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productos= navDataBetaIstockTable;
  constructor(  private formBuilder:FormBuilder,
    public dialog: MatDialog,) { }
  formularioProducto: FormGroup= this.formBuilder.group({
    Producto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    Stock: ['', [Validators.required]],
  })

  ngOnInit() {
   
  }



  guardarProducto(){
    if(this.formularioProducto.valid){
      Swal.fire({
        title: 'Esta seguro que desea agregar el producto de nombre: '+this.ProductoField?.value+'?',
        text: 'Al agregar el producto se añadira a la lista',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cerrar'
      }).then((result)=>{
        if(result.isConfirmed){
          Swal.fire({
            titleText: `Datos agregados`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false
        });
          this.agregarProducto();
          this.dialog.closeAll();
        }else{

        }})
    }else{
      this.formularioProducto.markAllAsTouched();
    }
  }

 agregarProducto() {
    const nuevoId = this.obtenerUltimoId() + 1;
    const nuevoProducto = {id: nuevoId, nombre: this.ProductoField?.value, precio: this.precioField?.value, stock: this.StockField?.value};
    this.productos.push(nuevoProducto);
    console.log(this.productos);
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


  public obtenerUltimoId(): number {
    let ultimoId = 0;
    for (const producto of this.productos) {
      if (producto.id > ultimoId) {
        ultimoId = producto.id;
      }
    }
    return ultimoId;
  }
}
