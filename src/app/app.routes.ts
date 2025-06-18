import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { HomeComponent } from './core/pages/home/home.component';
import { MarcasComponent } from './core/pages/marcas/marcas.component';
import { ConfiguracionComponent } from './core/pages/configuracion/configuracion.component';
import { CrearMarcaComponent } from './core/pages/crear-marca/crear-marca.component';
import { ReferenciasMarcasComponent } from './core/pages/referencias-marcas/referencias-marcas.component';
import { CrearPostComponent } from './core/pages/crear-post/crear-post.component';
import { PostDescripcionComponent } from './core/pages/post-descripcion/post-descripcion.component';
import { PostResultadoComponent } from './core/pages/post-resultado/post-resultado.component';
import { authGuard } from './core/guards/auth.guard';
import { TypePostComponent } from './core/pages/type-post/type-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '**', redirectTo: 'login'},
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'brands/mis-marcas', component: MarcasComponent, data: { origin: 'brands'} },
      { path: 'posts/mis-marcas', component: MarcasComponent, data: { origin: 'posts' } },
      { path: 'crear-marca', component: CrearMarcaComponent },
      { path: 'crear-marca/:id', component: CrearMarcaComponent },

      { path: 'tipo-post', component: TypePostComponent },
      { path: 'referencia-marca', component: ReferenciasMarcasComponent },
      { path: 'crear-post', component: CrearPostComponent },
      { path: 'post-descripcion', component: PostDescripcionComponent },
      { path: 'post-resultado', component: PostResultadoComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];
