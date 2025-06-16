import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../services/brands.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {
  marcas: any[] = [];
  origin: string | null = null;
  
  constructor(
    private _router: Router, 
    private brandsService: BrandsService, 
    private _activatedRouter: ActivatedRoute,
    private alertService: AlertService) {}

  async ngOnInit() {
    this.origin = this._activatedRouter.snapshot.data['origin'];
    console.log('mode',this.origin);
    
    await this.brandsService.getBrands().subscribe({
      next: (brands) => {
        this.marcas = brands;
        console.log('Marcas obtenidas:', brands);
      },
      error: (err) => {
        console.error('Error al obtener marcas', err);
      }
    });
  }
  
  abrirCreateBrandView(evento?: Event) {
    console.log('abrirCreateBrandView');
    this._router.navigate(['/crear-marca']);
  }

  editBrand(id: number ) {
    this._router.navigate(['/crear-marca', id]);
  }

  deleteBrand(id: string) {
    this.alertService.confirm('¿Estás seguro de que deseas eliminar esta marca?', 'Eliminar marca')
      .subscribe(result => {
        if (result) {
          // Lógica para eliminar la marca
          this.brandsService.deleteBrand(id).subscribe(
            (response) => {
              // Actualiza la lista de marcas después de eliminar
              this.marcas = this.marcas.filter(marca => marca.id !== id);
              this.alertService.toast('Marca eliminada correctamente');
            },
            (error) => {
              console.error('Error al eliminar la marca:', error);
              this.alertService.toast('Error al eliminar la marca');
            }
          );
        }
      });
  }
}
