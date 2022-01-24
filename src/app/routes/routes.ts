import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'reserva', loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule) },
            { path: 'mantenimiento', loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
            { path: 'reportes', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) }
        ]
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },

    // Not found
    { path: '**', redirectTo: 'home' }

];
