import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuejaService } from 'src/app/service/Queja.service';
import { trazabilidadTable } from '../Models/Trazabilidad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-consulta',
  templateUrl: './auto-consulta.component.html',
  styleUrls: ['./auto-consulta.component.css'],
})
export class AutoConsultaComponent implements OnInit {
  captcha: boolean = true;
  siteKey: string = '';
  presentadaSelected = true;
  asignadaSelected = true;
  analisisSelected = false;
  procedenteSelected = false;
  seguimientoSelected = false;
  finalizadaSelected = false;

  trazabilidadObject = new trazabilidadTable();
  trazabilidad: trazabilidadTable[] = [];
  descripcion: string = '';
  resumen: string = '';
  fechaCreacion: string = '';
  fechaFInal: string = '';
  trazabilidadVista = false;
  
  correlativo: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private quejaService: QuejaService
  ) {
    this.siteKey = '6Lfe8AEmAAAAAEbw4XVMu9bqWmhlk887s-8lJGvC';
  }
  aFormGroup: FormGroup = this.formBuilder.group({
    recaptcha: ['', Validators.required],
  });

  formularioQueja: FormGroup = this.formBuilder.group({
    noqueja: ['', Validators.required],
  });

  ngOnInit() {}

  onSubmit() {
    if (this.aFormGroup.valid) {
      const recaptchaResponse = this.aFormGroup.get('recaptcha')?.value;
      console.log('Respuesta del reCAPTCHA:', recaptchaResponse);
      {
        this.captcha = false;
      }
    }
  }

  get noquejaField() {
    return this.formularioQueja.get('noqueja');
  }

  get recaptchaField() {
    return this.aFormGroup.get('recaptcha');
  }

  validar() {
    if (this.formularioQueja.invalid) {
      this.formularioQueja.markAllAsTouched();
      return;
    } else {
      this.consultar();
    }
  }

  descripcionQueja(dato: number) {
    if (dato == 1) {
      this.descripcion = 'Queja ingresada a la aplicacion web.';
      this.resumen =
        'A la fecha se está atendiendo su queja ingresada el: ' +
        this.fechaCreacion;
    } else if (dato == 2) {
      this.descripcion =
        'Queja trasladada al Administrador del punto de atención correspondiente para su análisis.';
      this.resumen =
        'A la fecha se está atendiendo su queja ingresada el: ' +
        this.fechaCreacion;
    } else if (dato == 6) {
      this.resumen = `Su queja ingresada el ${this.fechaCreacion} ha sido finalizada en fecha ${this.fechaFInal} `;
    }
  }

  consultar() {
    this.obtenerTrazabilidad(this.noquejaField?.value);
    this.quejaService
      .getTrazabiliad(this.noquejaField?.value)
      .subscribe((dato) => {
        console.log(dato);
        this.trazabilidad = dato;
        if (this.trazabilidad.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El número de la queja no existe, verifique si ingresó el número correcto.',
          });
        } else {
          this.trazabilidadVista = true;
          for (let i = 0; i < this.trazabilidad.length; i++) {
            if (this.trazabilidad[i].estado == 1) {
              this.trazabilidadObject = this.trazabilidad[i];
              break;
            }
          }

          console.log(this.fechaCreacion);
          console.log(this.trazabilidadObject);
          this.fechaCreacion = this.trazabilidadObject.fechacreacion; // Asignación de la fecha
          this.fechaFInal = this.trazabilidadObject.fechaFinal;
          this.descripcionQueja(this.trazabilidadObject.estadosSolicitud);
        }
      });
  }

  obtenerTrazabilidad(correlativo : string) {
    this.quejaService.getTrazabiliad(correlativo).subscribe((dato) => {
      this.trazabilidad = dato;
      console.log(dato);

      for (let i = 0; i < this.trazabilidad.length; i++) {
        const item = this.trazabilidad[i];
        this.analisisSelected = this.trazabilidad.some(item => item.estadosSolicitud === 2);
        this.procedenteSelected = this.trazabilidad.some(item => item.estadosSolicitud === 4);
        this.seguimientoSelected = this.trazabilidad.some(item => item.estadosSolicitud === 5);
        this.finalizadaSelected = this.trazabilidad.some(item => item.estadosSolicitud === 6); 
      }
    });
  }
}
