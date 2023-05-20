import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-ficha-queja-pa',
  templateUrl: './ficha-queja-pa.component.html',
  styleUrls: ['./ficha-queja-pa.component.css']
})
export class FichaQuejaPaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  idQueja: string="";
  constructor(   private route: ActivatedRoute,) { 
    
    this.route.queryParams.subscribe(params => {
      this.idQueja = params['idQueja']
    });
  }

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
