import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rechazar-queja',
  templateUrl: './rechazar-queja.component.html',
  styleUrls: ['./rechazar-queja.component.css']
})
export class RechazarQuejaComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RechazarQuejaComponent>,
  ) { }

  ngOnInit() {
  }


  onCancelar(){
    this.dialogRef.close();
  }

}
