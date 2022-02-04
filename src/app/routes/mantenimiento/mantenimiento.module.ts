import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { EdificioComponent } from './edificio/edificio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EspacioComponent } from './espacio/espacio.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { EditarParametroComponent } from './parametro/editar-parametro/editar-parametro.component';
import { ParametroComponent } from './parametro/parametro.component';
import { AgregarPerfilComponent } from './perfil/agregar-perfil/agregar-perfil.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PisoComponent } from './piso/piso.component';
import { EditarTablaAuxiliarComponent } from './tabla-auxiliar/editar-tabla-auxiliar/editar-tabla-auxiliar.component';
import { TablaAuxiliarComponent } from './tabla-auxiliar/tabla-auxiliar.component';
import { AgregarUsuarioComponent } from './usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
    { path: '', component: MantenimientoComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'empresa', component: EmpresaComponent },
    { path: 'edificio', component: EdificioComponent },
    { path: 'piso', component: PisoComponent },
    { path: 'espacio', component: EspacioComponent },
    { path: 'parametro', component: ParametroComponent },
    { path: 'tabla-auxiliar', component: TablaAuxiliarComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        LayoutModule
    ],
    declarations: [
        MantenimientoComponent,
        PerfilComponent,
        UsuarioComponent,
        EmpresaComponent,
        EdificioComponent,
        PisoComponent,
        EspacioComponent,
        ParametroComponent,
        TablaAuxiliarComponent,
        EditarTablaAuxiliarComponent,
        AgregarUsuarioComponent,
        EditarUsuarioComponent,
        AgregarPerfilComponent,
        EditarParametroComponent
    ],
    exports: [
        RouterModule
    ]
})
export class MantenimientoModule { }