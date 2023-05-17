export class traerRegiones{
    idRegion:number=0;
    nombreRegion:string='';
}


export class PuntosAtencion {
    idPuntoAtencion?: number=0;
    idRegion?: number=0;
    nombrePuntoAtencion?: string='';
    usuariocreo?: string='';
    fechacreacion?: string='';
    fechamodificacion?: string='';
    usuariomodifico?: string='';
    estado?: number=0;
}

export interface PuntosAtencionList {
    idPuntoAtencion: number;
    nombrePuntoAtencion: string;
}

export class traerPuntosAtencion{
    idPuntoAtencion:number=0;
    nombrePunto:string='';
    nombreEstado:string='';
    nombreRegion:string='';
}

export class modificarPunto{
    nombrePuntoAtencion?: string='';
    estado?: number;
    fechaModificacion?: string='';
    usuarioModifico?: string='';
}

export class contadorUsuarios{
    contador:number=0;
}