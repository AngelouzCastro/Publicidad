import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {
  mock = { nombre: 'Marca 1', descripcion: 'Descripción de la marca 1' };
  marcas = [this.mock, this.mock, this.mock]; // O un array con marcas si ya existen
  // marcas = []; // O un array con marcas si ya existen

  constructor(private _router: Router) {
    console.log('hola mundo desde marcas.component.ts');
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.marcas);
  }
  
  abrirCreateBrandView(evento?: Event) {
    console.log('abrirCreateBrandView');
    this._router.navigate(['/crear-marca']);
  }
}
