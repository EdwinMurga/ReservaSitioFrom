import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { ReporteCheckComponent } from './reporte-check/reporte-check.component';
import { ReporteReservaComponent } from './reporte-reservas/reporte-reservas.component';
import { ReportesComponent } from './reportes.component';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';

const routes: Routes = [
    { path: '', component: ReportesComponent },
    { path: 'check', component: ReporteCheckComponent },
    { path: 'reservas', component: ReporteReservaComponent },
];

@NgModule({
    imports: [
        
        SharedModule,
        RouterModule.forChild(routes),
        LayoutModule,
        Ng2ChartsModule
    ],
    declarations: [
        ReportesComponent,
        ReporteCheckComponent,
        ReporteReservaComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ReportesModule { }