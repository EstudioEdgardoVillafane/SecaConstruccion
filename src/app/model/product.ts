export class Product {
    $key : string;
    name : string;
    slug : string;
    price : number;
    description : string;
    seccion : string;
    categoria : string;
    option : string;
    order : number;
    favorite : number;
    etiqueta : any[];
    code : string;
    url : string;
    status : number;
}
export interface ProductInteface{
    $key : string;
    name : string;
    slug : string;
    price : number;
    description : string;
    seccion : string;
    categoria : string;
    option : string;
    order : number;
    favorite : number;
    etiqueta : any[];
    code : string;
    url : string;
    status : number;
}