import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @Input()collapsed:Boolean=false;
  @Input()screenWidth:number=0;
  constructor() { }

  ngOnInit() {
  }

  getBodyClass():String{
    let styleclass='';
    if(this.collapsed && this.screenWidth>768){
      styleclass='body-trimmed';
    } else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
      styleclass='body-md-screen';
    }
    return styleclass;

  }
}
