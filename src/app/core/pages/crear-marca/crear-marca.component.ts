import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injectable, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImplicitValuesInputComponent } from '../../components/implicit-values-input/implicit-values-input.component'; // Importa el nuevo componente
import { valoresImplicitosMock } from '../../../../assets/mocks/valores-implicitos.mock';
import { tonoComunicacionMock } from '../../../../assets/mocks/tonos-comunicacion.mock';

@Injectable({
  providedIn: 'root'
})
@Component({
  standalone: true,
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ColorSketchModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ImplicitValuesInputComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CrearMarcaComponent {
  pasoActual: any;
  logoUrl: string | ArrayBuffer | null = null;
  imagenSeleccionada: File | null = null;
  urlImagen: string = '';
  tipografia = 'Poppins';

  isEditing = false;
  id!: string;

  nuevosValoresImplicitos = valoresImplicitosMock;

  readonly announcer = inject(LiveAnnouncer);
  @ViewChildren('sketchRef') sketchRefs!: QueryList<ElementRef>;
  colores: string[] = ['#3B5BDB']; // Mínimo 2 colores por defecto
  colorActivo: any = 0;

  valueTones = tonoComunicacionMock;
  tonoSeleccionado: string = '';

  brandForm: FormGroup = new FormGroup({
    brandName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    tones: new FormControl(''),
    implicitValues: new FormControl(''),
    tipo: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private _brandsService: BrandsService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((params: any) => {
      this.id = params.get('id') || '';
      this.isEditing = !!this.id;
      if (this.isEditing) {
        this.editBrand(this.id);
      }
    })
  }

  onImplicitValuesChange(values: string[]) {
    this.brandForm.get('implicitValues')?.setValue(values);
  }

  onTonesChange(values: string[]) {
    this.brandForm.get('tones')?.setValue(values);
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
      this.imagenSeleccionada = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.logoUrl = reader.result;
        this.cdr.markForCheck();
      };
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

  actualizarColor(nuevoColor: string, index: number) {
    this.colores[index] = nuevoColor;
    this.colores = [...this.colores]; // Fuerza la detección de cambios
  }

  async saveBrand() {
    console.log('hola')
    console.log('the value is ===>',this.brandForm.value);
    if (this.brandForm.valid) {
      console.log('datos validos');
      
      const brandData = this.brandForm.value;
      
      let brandData2: any = {
        name: brandData.brandName,
        description: brandData.description,
        logoUrl: "https://example.image.com",
        typography: brandData.tipo,
        colors: [],
        tones: [],
        principles: [],
      }
      this.colores.forEach((color, index) => {
        brandData2.colors.push({ name: `Color ${index + 1}`, hex: color});
      });

      brandData.implicitValues.forEach((value: string) => {
        brandData2.principles.push({ name: value, description: 'This is a principal'});
      });

      brandData.tones.forEach((value: string) => {
        brandData2.tones.push({ name: value, description: 'This is a tone'});
      });

      if (this.isEditing) {
        console.log('brandData2', brandData2);
      } else {
        await this._brandsService.createBrand(brandData2).subscribe(
          (response) => {
            console.log('Marca creada:', response);
            this._router.navigate(['brands/mis-marcas']);
          },
          (error) => {
            console.error('Error al crear la marca:', error);
          }
        )
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  async editBrand(id: string | number) {
    await this._brandsService.getOneBrandById(id).subscribe(
      (response: any) => {
        console.log('Marca encontrada:', response);
        this.brandForm.get('brandName')?.setValue(response.name);
        this.brandForm.get('description')?.setValue(response.description);
        this.brandForm.get('tones')?.setValue(response.tones[0].name);
        this.brandForm.get('tipo')?.setValue(response.typography);
        
        this.colores = response.colors.map((color: any) => color.hex);
        // this.implicitValues.set(response.principles.map((value: any) => value.description));
        // this.tonoSeleccionado = response.tones[0].description;
      }
    )
  }
}

