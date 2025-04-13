import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'caducidad',
  standalone: true
})
export class CaducidadPipe implements PipeTransform {
  transform(fechaCaducidad: string): string {
    const fecha = new Date(fechaCaducidad);
    const hoy = new Date();
    const diferencia = (fecha.getTime() - hoy.getTime()) / (1000 * 3600 * 24);
    if (diferencia < 5) {
      return '<span class="text-danger">¡Caduca pronto!</span>';
    } else {
      return `Válido hasta ${formatDate(fecha, 'dd/MM/yyyy', 'en-US')}`;
    }
  }
}
