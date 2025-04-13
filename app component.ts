import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from './descuento.pipe';
import { CaducidadPipe } from './caducidad.pipe';

interface Producto {
  nombre: string;
  precio: number;
  fechaCaducidad: string;
  categoria: string;
  tieneDescuento: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DescuentoPipe,
    CaducidadPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  formulario!: FormGroup;
  productos: Producto[] = [];
  categorias = ['Electrónicos', 'Alimentos', 'Ropa', 'Hogar'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      fechaCaducidad: ['', [Validators.required, this.fechaFuturaValidator]],
      categoria: ['', Validators.required],
      tieneDescuento: [false]
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      const datos = localStorage.getItem('productos');
      if (datos) this.productos = JSON.parse(datos);
    }
  }

  agregarProducto() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.productos.push(this.formulario.value);

    
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }

    this.formulario.reset();
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
  }

  fechaFuturaValidator(control: any) {
    const hoy = new Date();
    const valor = new Date(control.value);
    return valor > hoy ? null : { fechaInvalida: true };
  }

  get f() {
    return this.formulario.controls;
  }
}
