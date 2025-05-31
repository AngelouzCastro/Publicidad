import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  standalone: true,
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css',
  imports: [
    CommonModule, 
    FormsModule, 
    ColorSketchModule,
    ProgressBarComponent,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatChipsModule,
    MatIconModule, 
    MatAutocompleteModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CrearMarcaComponent {
  pasoActual: any;
  logoUrl: string | ArrayBuffer | null = null;

  readonly currentFruit = model('');
  readonly fruits = signal(['Lemon']);
  readonly allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentFruit))
      : this.allFruits.slice();
  });

  readonly announcer = inject(LiveAnnouncer);
  @ViewChildren('sketchRef') sketchRefs!: QueryList<ElementRef>;
  colores: string[] = ['#3B5BDB']; // Mínimo 2 colores por defecto
  colorActivo: any = 0;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (this.fruits().includes(value)) {
      this.fruits.update(fruits => [...fruits, value]);
    }

    // Clear the input value
    this.currentFruit.set('');
  }

  remove(fruit: string): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
      
    const search = this.fruits().find(item => item === value);
    if (!search) {
      this.fruits.update(fruits => [...fruits, event.option.viewValue]);
    }

    this.currentFruit.set('');
    event.option.deselect();
  }

  abrirColorSketch(i: number, event: MouseEvent) {
    event.stopPropagation();
    this.colorActivo = i;
  }

  onDocumentClick(event: MouseEvent) {
    if (this.colorActivo !== null && this.sketchRefs) {
      const sketchEl = this.sketchRefs.find(ref => ref.nativeElement.getAttribute('data-index') == this.colorActivo?.toString())?.nativeElement;
      if (sketchEl && !sketchEl.contains(event.target)) {
        this.colorActivo = null;
      }
    }
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

  agregarColor() {
    if (this.colores.length >= 4) {
      return;
    }
    this.colores.push('#000000');
    this.colorActivo = this.colores.length - 1;
  }

  removerColor(index: number) {
    if (this.colores.length > 1) {
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
