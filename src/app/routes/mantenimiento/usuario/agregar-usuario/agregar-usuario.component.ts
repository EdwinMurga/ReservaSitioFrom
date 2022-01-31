import { OnInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { PerfilService } from 'src/app/core/service/perfil.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
const swal = require('sweetalert');

@Component({
    selector: 'app-mantenimiento-agregar-usuario',
    templateUrl: './agregar-usuario.component.html',
    styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
    formRegistro: FormGroup;
    lstPerfil: any;
    lstTipoDocumento: any;
    lstEstado: any;

    //Constantes
    parametroListaEstado: string = '1';
    parametroListaTipoDocumento: string = '2';

    constructor(
        private _usuarioService: UsuarioService,
        private _perfilService: PerfilService,
        private _parametroService: ParametroService,
        public dialogo: MatDialogRef<AgregarUsuarioComponent>,

        fb: FormBuilder) {

        this.formRegistro = fb.group({
            'cboPerfil': [null, Validators.compose([Validators.required])],
            'cboTipoDocumento': [null, Validators.compose([Validators.required])],
            'txtNumeroDocumento': [null, Validators.compose([Validators.required])],
            'cboEstado': [null, Validators.compose([Validators.required])],
            'txtNombre': [null, Validators.compose([Validators.required])],
            'txtApellidoPaterno': [null, Validators.compose([Validators.required])],
            'txtApellidoMaterno': [null, Validators.compose([Validators.required])],
            'txtCorreoElectronico': [null, Validators.compose([Validators.required])],
            'txtNumeroTelefonico': [null, Validators.compose([Validators.required])],
            'txtClave': [null, Validators.compose([Validators.required])],
            'txtConfirmarClave': [null, Validators.compose([Validators.required])]
        });

        this.formRegistro.patchValue({
            cboPerfil: "",
            cboTipoDocumento: "",
            cboEstado: ""
        });

        this.getPerfiles();
        this.getTipoDocumento();
        this.getEstado();
    }

    cerrarDialogo(): void {
        this.dialogo.close(false);
    }
    confirmado(): void {
        this.dialogo.close(true);
    }

    ngOnInit() {

    }

    postRegistrar() {
        let value = this.formRegistro.value;
        for (let c in this.formRegistro.controls) {
            this.formRegistro.controls[c].markAsTouched();
        }

        if (this.formRegistro.valid) {
            const req = {
                "iid_estado_registro": value.cboEstado,
                "iid_usuario_registra": 1,
                "iid_usuario": 0,
                "iid_perfil": value.cboPerfil,
                "iid_tipo_documento": value.cboTipoDocumento,
                "vnro_documento": value.txtNumeroDocumento,
                "vnombres": value.txtNombre,
                "vapellido_paterno": value.txtApellidoPaterno,
                "vapellido_materno": value.txtApellidoMaterno,
                "vcorreo_electronico": value.txtCorreoElectronico,
                "vnumero_telefonico": value.txtNumeroTelefonico,
                "vclave": value.txtClave,
                "iid_empresa": 1
            }
            this._usuarioService.post(req, '/Usuario/RegisterUsuario').subscribe((res: any) => {
                if (!res.isSuccess) {
                    swal('Error', res.message, 'error'); return;
                } else {
                    this.dialogo.close(true);
                }
            });
        }
    }

    getPerfiles() {
        this._perfilService.get('/Perfil/GetListCbPerfil').subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstPerfil = res.data;
        })
    }

    getTipoDocumento() {
        this._parametroService.get('/ParametroAplicacion/GetListCbTablaDetalleParametro?requestAuxiliar=' + this.parametroListaTipoDocumento).subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstTipoDocumento = res.data;
        })
    }

    getEstado() {
        this._parametroService.get('/ParametroAplicacion/GetListCbTablaDetalleParametro?requestAuxiliar=' + this.parametroListaEstado).subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstEstado = res.data;
        })
    }
}
