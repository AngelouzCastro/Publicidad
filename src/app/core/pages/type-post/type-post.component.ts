import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-type-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, ProgressBarComponent],
  templateUrl: './type-post.component.html',
  styleUrl: './type-post.component.css',
})
export class TypePostComponent {
  selectedType: string | null = null;

  publicationTypes = [
    {
      id: 'before-after',
      name: 'Antes y después',
      description: 'Muestra la transformación o el cambio de un producto o servicio a través de imágenes comparativas del antes y después.',
      image: 'assets/before-after.jpeg' // Ruta de la imagen para "Antes y después"
    },
    {
      id: 'presentation-card',
      name: 'Presentación card',
      description: 'Crea una presentación visual atractiva de tu producto o servicio con una imagen destacada y detalles importantes.',
      image: 'assets/presentation-card.jpeg' // Ruta de la imagen para "Presentación card"
    },
    {
      id: 'free',
      name: 'Libre',
      description: 'Permite que la inteligencia artificial cree un diseño único y atractivo de forma libre y creativa.',
      image: 'assets/free.jpeg' // Ruta de la imagen para "Libre"
    },
  ];

  selectType(typeId: string): void {
    this.selectedType = typeId;
  }

  cancel(): void {
    // Lógica para cancelar, por ejemplo, navegar a la página anterior
    console.log('Cancelar');
  }

  next(): void {
    // Lógica para continuar, por ejemplo, navegar a la siguiente página con el tipo seleccionado
    console.log('Siguiente', this.selectedType);
  }
}