import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { OpcionComponent } from './opcion.component';


const routes: Routes = [
    { path: '', component: OpcionComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        LayoutModule
    ],
    declarations: [
        OpcionComponent
    ],
    exports: [
        RouterModule
    ]
})
export class OpcionModule { }