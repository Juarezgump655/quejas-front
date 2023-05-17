import { Component, OnInit } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth = 0;

  constructor() { }

  ngOnInit(): void {
  }

  //este metodo es para abrir y cerrar el sidebar
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


  //El getBodyClass está definido en el componente de body, se puede acceder a la propiedad "collapsed" del componente body, y asi poder cambiar el estilo de la clase 
  //y hacer responsiva la barra
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
