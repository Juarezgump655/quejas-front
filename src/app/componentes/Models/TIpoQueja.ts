export class TIpoQueja {
}

export class tipoQueja{
    idTipoQueja?: number=0; 
    siglasQueja?: string='';
    descripcionQueja?: string='';
    usuariocreo?: string='';
    fechacreacion?: string='';
    fechamodificacion?: string='';
    usuariomodifico?: string='';
    idEstado?: number=0;
}

export interface TipoQuejaList {

    idTipoQueja: number;
    siglasQueja: string;
    descripcionQueja:string;
    estado:string;
    }

export class modificarTipoQueja{
    siglasQueja?: string='';
    descripcionQueja?: string='';
    idEstado?: number;
    fechaModificacion?: string='';
    usuarioModifico?: string='';
}

export class contadorSiglas{
    contador:number=0;
}