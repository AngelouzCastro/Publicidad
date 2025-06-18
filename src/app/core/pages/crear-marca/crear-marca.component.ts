import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injectable, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// import { MatIconModule } from '@angular/material/icon';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatChipsModule } from '@angular/material/chips';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImplicitValuesInputComponent } from '../../components/implicit-values-input/implicit-values-input.component'; // Importa el nuevo componente

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

  readonly allValues: string[] = [
    'Sostenibilidad',
    'Honestidad',
    'Transparencia',
    'Responsabilidad social',
    'Compromiso ético',
    'Cercanía',
    'Diversidad e inclusión',
    'Respeto',
    'Confianza',
    'Optimismo',
    'Innovación',
    'Eficiencia',
    'Liderazgo',
    'Credibilidad',
    'Puntualidad',
    'Audacia',
    'Curiosidad',
    'Inspiración',
    'Adaptabilidad',
    'Vanguardia',
    'Buen precio',
    'Accesibilidad',
    'Valor agregado',
    'Servicio personalizado'
  ];

  readonly announcer = inject(LiveAnnouncer);
  @ViewChildren('sketchRef') sketchRefs!: QueryList<ElementRef>;
  colores: string[] = ['#3B5BDB']; // Mínimo 2 colores por defecto
  colorActivo: any = 0;

  valueTones = {
    'Formales / Profesionales': ['Corporativo', 'Educado y serio', 'Técnico o especializado', 'Jurídico/Institucional'],
    'Informales / Cercanos': ['Amigable', 'Conversacional', 'Casual', 'Cálido y empático'],
    'Emocionales': ['Motivacional', 'Inspirador', 'Apasionado', 'Humanitario'],
    'Modernos y disruptivos': ['Sarcástico', 'Irónico', 'Rebelde', 'Divertido', 'Juvenil'],
    'Comerciales': ['Promocional', 'Urgente / Escasez', 'Descriptivo', 'Persuasivo']
  };
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

  verListaColores() {
    console.log(this.colores)
  }

  actualizarColor(nuevoColor: string, index: number) {
    this.colores[index] = nuevoColor;
    this.colores = [...this.colores]; // Fuerza la detección de cambios
  }

  async subirImagen() {
    console.log('entra a subir imagen')
    if (!this.imagenSeleccionada) return;
    console.log('entra a subir imagen', this.imagenSeleccionada)

    const storage = getStorage();
    const nombre = `imagenes/${Date.now()}_${this.imagenSeleccionada.name}`;
    const storageRef = ref(storage, nombre);

    try {
      const snapshot = await uploadBytes(storageRef, this.imagenSeleccionada);
      const url = await getDownloadURL(snapshot.ref);
      this.urlImagen = url;
      console.log('URL pública:', url);

      // Aquí puedes guardar solo la URL en Firestore o usarla localmente
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  }

  async saveBrand() {
    console.log('hola')
    console.log('the value is ===>',this.brandForm.value);
    if (this.brandForm.valid) {
      // Subir imagen si hay una seleccionada
      // if (this.imagenSeleccionada) {
      //   await this.subirImagen();
      // }
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
      // this.implicitValues().forEach((value, index) => {
      //   brandData2.principles.push({ name: `Valor implícito ${index + 1}`, description: value});
      // });
      brandData2.tones.push({ name: brandData.tones, description: this.tonoSeleccionado });
      console.log('brandData2', brandData2);

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

