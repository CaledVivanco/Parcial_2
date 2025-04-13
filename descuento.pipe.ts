import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuentoPipe',
  standalone: true
})
export class DescuentoPipe implements PipeTransform {
  transform(producto: any): any {
    if (producto.tieneDescuento) {
      const nuevoPrecio = producto.precio * 0.85;
      return `<s>$${producto.precio.toFixed(2)}</s> <strong class='text-success'>$${nuevoPrecio.toFixed(2)}</strong>`;
    } else {
      return `$${producto.precio.toFixed(2)}`;
    }
  }
}
