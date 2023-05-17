export class Usuario {
    idusuario?:number=0;
    dpi?:number=0;
    nombre?:string="";
    apellidos?:string="";
    correo?:string="";
    id_cargo?:number=0;
    estado?:number=0;
    usuariocreo?:string="";
    fechacreacion?:string="";
    fechamodificacion?:string="";
    usuariomodifico?:string="";
    password?:string="";
    rol?:number=0;
    idpuntoatencion?:any=null;
    telefono?:string="";

}

export interface usuarioSesion {
    username:string;
    password:string;
}

export interface tablaUsuario{
    idUsuario:number;
    nombreUsuario:string;
    apellidosUsuario:string;
    region: string;
    puntoAtencion:string;
    cargo: string;
    correo:string;
    estado:string;
    idCargo:number;
    idPuntoAtencion:number;

}

export interface traerPunto{
    idPuntoAtencion:number;
    nombrePunto:string;
}

export interface traerCargo{
    idCargo:number;
    nombreCargo:string;
}

export interface contUsuarios{
    contador:number;
    nombrePunto:String;
}
