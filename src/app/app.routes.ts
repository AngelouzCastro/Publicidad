import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'mis-marcas', component: MarcasComponent },
      { path: 'crear-marca', component: CrearMarcaComponent },
      { path: 'referencia-marca', component: ReferenciasMarcasComponent },
      { path: 'crear-post', component: CrearPostComponent },
      { path: 'post-descripcion', component: PostDescripcionComponent },
      { path: 'post-resultado', component: PostResultadoComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];
