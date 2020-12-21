import { SafeResourceUrl } from '@angular/platform-browser';

export interface GetTrendsInterface{
  uidProduct: string;
  name: string;
}

export interface GetErrorInterface{
  id: string;
  name: string;
  type: 'stock';
}

export interface GetProductGaleryInterface {
  id: string;
  alt: string;
  url: SafeResourceUrl;
  type: string;
  default: boolean;
}

export interface GetProductFeacturesInterface {
  id: string;
  name: string;
  value: string;
  edit: boolean;
}

export interface GetProductinfoInterface{
  name: string;
  description: string;
}
