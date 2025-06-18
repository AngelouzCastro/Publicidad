import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
export class ImplicitValuesInputComponent {
  @Input() label: string = 'Valores';
  @Input() placeholder: string = 'Nuevo Valor...';
  @Input() allPossibleValues: string[] = [];
  @Input() formControlName: string = '';

  @Output() valuesChange = new EventEmitter<string[]>();

  formControl = new FormControl('');
  currentValue = signal('');
  selectedValues = signal<string[]>([]);

  filteredValues: Observable<string[]>;

  constructor() {
    this.filteredValues = this.formControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : this.allPossibleValues.slice())),
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allPossibleValues.filter(val => val.toLowerCase().includes(filterValue) && !this.selectedValues().includes(val));
  }
}