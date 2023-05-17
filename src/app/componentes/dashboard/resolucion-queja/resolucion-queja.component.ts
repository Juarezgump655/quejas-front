import { Component, OnInit } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-resolucion-queja',
  templateUrl: './resolucion-queja.component.html',
  styleUrls: ['./resolucion-queja.component.css']
})
export class ResolucionQuejaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  constructor() { }

  ngOnInit() {
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

}
