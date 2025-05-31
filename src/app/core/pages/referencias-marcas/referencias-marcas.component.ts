import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-referencias-marcas',
  imports: [
    CommonModule,
    ProgressBarComponent,
    ColorSketchModule,
    RouterModule,
  ],
  templateUrl: './referencias-marcas.component.html',
  styleUrl: './referencias-marcas.component.css'
})
export class ReferenciasMarcasComponent {
  referencias: string[] = [];
  productos: string[] = [];
  colores: string[] = ['#D94242', '#FFFFFF'];
  colorActivo: number|null = null;

  @ViewChildren('sketchRef') sketchRefs!: QueryList<ElementRef>;

  constructor(private _router: Router) {

  }

  abrirColorSketch(i: number, event: MouseEvent) {
    event.stopPropagation();
    this.colorActivo = i;
  }

  onDocumentClick(event: MouseEvent) {
    if (this.colorActivo !== null && this.sketchRefs) {
      // Buscar el elemento con el data-index correcto
      const sketchEl = this.sketchRefs.find(ref => ref.nativeElement.getAttribute('data-index') == this.colorActivo?.toString())?.nativeElement;
      if (sketchEl && !sketchEl.contains(event.target)) {
        this.colorActivo = null;
      }
    }
  }

  actualizarColor(nuevoColor: string, index: number) {
    this.colores[index] = nuevoColor;
    this.colores = [...this.colores];
  }
  mostrarColorSketch = false;
  colorTemporal = '#000000';

  agregarReferencia(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.referencias.length < 3) {
      const reader = new FileReader();
      reader.onload = () => {
        this.referencias.push(reader.result as string);
      };
      reader.readAsDataURL(input.files[0]);
      input.value = '';
    }
  }

  eliminarReferencia(index: number) {
    this.referencias.splice(index, 1);
  }

  agregarProducto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.productos.length < 2) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productos.push(reader.result as string);
      };
      reader.readAsDataURL(input.files[0]);
      input.value = '';
    }
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  agregarColor(nuevoColor: string) {
    if (!this.colores.includes(nuevoColor)) {
      this.colores.push(nuevoColor);
    }
    this.mostrarColorSketch = false;
  }

  eliminarColor(index: number) {
    this.colores.splice(index, 1);
  }

  siguiente() {
    this._router.navigate(['/crear-post']);
  }
}
