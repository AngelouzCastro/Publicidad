import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { HomeComponent } from './core/pages/home/home.component';
import { MarcasComponent } from './core/pages/marcas/marcas.component';
import { PostsComponent } from './core/pages/posts/posts.component';
import { ConfiguracionComponent } from './core/pages/configuracion/configuracion.component';
import { CrearMarcaComponent } from './core/pages/crear-marca/crear-marca.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: HomeComponent }, // Página de inicio
      { path: 'home', component: HomeComponent }, // Página de inicio
      { path: 'mis-marcas', component: MarcasComponent },
      { path: 'crear-marca', component: CrearMarcaComponent },
      { path: 'crear-post', component: PostsComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '**', redirectTo: 'dashboard' }, // Redirige a la página de inicio si la ruta no coincide con ninguna de las hijas
      // Agrega aquí más rutas hijas si tienes más páginas
    ]
  }
];
