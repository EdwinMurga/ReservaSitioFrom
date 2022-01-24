import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { DetalleReservaComponent } from './detalle/detalle-reserva.component';
import { ListaReservaComponent } from './lista/lista-reserva.component';
import { NuevaReservaComponent } from './nuevo/nueva-reserva.component';
import { ReservaComponent } from './reserva.component';

const routes: Routes = [
    { path: '', component: ReservaComponent },
    { path: 'lista', component: ListaReservaComponent },
    { path: 'nuevo', component: NuevaReservaComponent },
    { path: 'detalle', component: DetalleReservaComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        LayoutModule
    ],
    declarations: [ReservaComponent,ListaReservaComponent,NuevaReservaComponent,DetalleReservaComponent],
    exports: [
        RouterModule
    ]
})
export class ReservaModule { }