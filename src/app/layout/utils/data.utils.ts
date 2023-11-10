import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataUtils {

    constructor() { }

    static obterUltimos15DiasString(): string[] {
      const ultimos15Dias: string[] = [];
    
      for (let i = 14; i >= 0; i--) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dataFormatada = `${dia}/${mes}`;
        ultimos15Dias.push(dataFormatada);
      }
    
      return ultimos15Dias;
    }

    static obterUltimos15Dias(): Date[] {
      const ultimos15Dias: Date[] = [];
    
      for (let i = 14; i >= 0; i--) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        ultimos15Dias.push(data);
      }
    
      return ultimos15Dias;
    }

    static formatarData(data: Date): string {
      return moment(data).format('DD/MM/YYYY');
  }
}