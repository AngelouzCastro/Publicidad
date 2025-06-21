import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface CategoriaSubcategoria {
  categoria: string;
  subCategorias: string[];
}

@Component({
  selector: 'app-implicit-values-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  templateUrl: './implicit-values-input.component.html',
  styleUrl: './implicit-values-input.component.css'
})
export class ImplicitValuesInputComponent implements OnChanges { // Implementamos OnChanges
  @Input() label: string = 'Valores';
  @Input() placeholder: string = 'Nuevo Valor...';
  // Cambiamos el tipo del Input para que acepte el array con categorías y subcategorías
  @Input() allPossibleValues: { categoria: string; subCategorias: string[];}[] = [];
  @Input() formControlName: string = '';

  @Output() valuesChange = new EventEmitter<string[]>();

  formControl = new FormControl('');
  currentValue = signal('');
  selectedValues = signal<string[]>([]);

  filteredValues: Observable<CategoriaSubcategoria[]>; // Changed type here
  private flattenedPossibleValues: string[] = []; // Propiedad interna para la lista aplanada

  constructor() {
    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(null),
      // Usamos la lista aplanada para el filtrado
      map((value: string | null) => this._filter(value)), // Modified to call _filter directly
    );
  }

  // Implementamos ngOnChanges para procesar el Input cuando cambia
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allPossibleValues'] && this.allPossibleValues) {
      // Aplanamos el array de objetos a un array simple de strings
      this.flattenedPossibleValues = this.allPossibleValues.flatMap(categoria => categoria.subCategorias);
      // Opcional: Si el input cambia después de la inicialización, podrías querer re-filtrar
      // this.formControl.updateValueAndValidity();
    }
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value && !this.selectedValues().includes(value)) {
      this.selectedValues.update(values => [...values, value]);
      this.valuesChange.emit(this.selectedValues());
    }
    // Limpia el input después de añadir
    event.chipInput!.clear(); // Asegúrate de que chipInput esté disponible
    this.formControl.setValue(null);
  }

  remove(value: string): void {
    this.selectedValues.update(values => values.filter(v => v !== value));
    this.valuesChange.emit(this.selectedValues());
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.selectedValues().includes(value)) {
      this.selectedValues.update(values => [...values, value]);
      this.valuesChange.emit(this.selectedValues());
    }
    // Limpia el input después de seleccionar
    this.formControl.setValue(null);
  }

  private _filter(value: string | null): CategoriaSubcategoria[] {
    const filterValue = value ? value.toLowerCase() : '';
    if (!filterValue) {
      return this.allPossibleValues.map(cat => ({
        categoria: cat.categoria,
        subCategorias: cat.subCategorias.filter(sub => !this.selectedValues().includes(sub))
      })).filter(cat => cat.subCategorias.length > 0);
    }

    return this.allPossibleValues.map(categoria => ({
      categoria: categoria.categoria,
      subCategorias: categoria.subCategorias.filter(subcategoria =>
        subcategoria.toLowerCase().includes(filterValue) && !this.selectedValues().includes(subcategoria)
      )
    })).filter(categoria => categoria.subCategorias.length > 0);
  }
}