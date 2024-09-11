import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importa los componentes que creaste
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { GestionClientesComponent } from './pages/gestion-clientes/gestion-clientes.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HomeComponent } from './pages/home/home.component';

// Define las rutas de la aplicación
const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tablero', component: TableroComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'gestion-clientes', component: GestionClientesComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a la página de login por defecto
  { path: '**', redirectTo: '/login' } // Redirecciona cualquier ruta no encontrada a la página de login
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
