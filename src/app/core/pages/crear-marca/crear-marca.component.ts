import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-crear-marca',
  imports: [
    CommonModule, 
    FormsModule, 
    ColorSketchModule,
    ProgressBarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css'
})


export class CrearMarcaComponent {
  pasoActual: any;
  logoUrl: string | ArrayBuffer | null = null;
  
  // --- Valores implícitos ---
  valorImplicitoCtrl = new FormControl('');
  valoresImplicitos: string[] = [];
  todasLasOpciones: string[] = ['Innovación', 'Calidad', 'Sostenibilidad', 'Confianza', 'Creatividad', 'Servicio', 'Tecnología'];
  valoresImplicitosCtrl = new FormControl<string[]>([], { nonNullable: true });
  states = []
  selection: any[] = [];

  

  constructor() {
    
  }

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.logoUrl = reader.result;
      reader.readAsDataURL(input.files[0]);
    }
  }

  cambiarLogo() {
    this.logoUrl = null;
    setTimeout(() => {
      const input = document.getElementById('logoInput') as HTMLInputElement;
      if (input) input.click();
    }, 0);
  }

  colores: string[] = ['#3B5BDB', '#ff6b6b']; // Mínimo 2 colores por defecto

  colorActivo: any = 0;

  agregarColor() {
    if (this.colores.length >= 9) {
      return;
    }
    this.colores.push('#000000');
    this.colorActivo = this.colores.length - 1;
  }

  removerColor(index: number) {
    if (this.colores.length > 2) {
      this.colores.splice(index, 1);
      if (this.colorActivo === index) {
        this.colorActivo = 0;
      } else if (this.colorActivo > index) {
        this.colorActivo--;
      }
    }
  }

  verListaColores() {
    console.log(this.colores)
  }

  actualizarColor(nuevoColor: string, index: number) {
    this.colores[index] = nuevoColor;
    this.colores = [...this.colores]; // Fuerza la detección de cambios
  }
}
