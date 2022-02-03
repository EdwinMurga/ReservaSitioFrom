import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { TranslatorService } from './translator/translator.service';
import { MenuService } from './menu/menu.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ParametroAplicacionService } from './service/parametroAplicacion.service';
import { PerfilService } from './service/perfil.service';
import { UsuarioService } from './service/usuario.service';
import { ParametroService } from './service/parametro.service';
import { AuthenticationService } from './service/authentication.service';
import { EmpresaService } from './service/empresa.service';


@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        ThemesService,
        TranslatorService,
        MenuService,
        ParametroAplicacionService,
        PerfilService,
        AuthenticationService,
        UsuarioService,
        ParametroService,
        EmpresaService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
