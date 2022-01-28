import { OnInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/core/service/usuario.service';
const swal = require('sweetalert');

@Component({
    selector: 'app-mantenimiento-editar-usuario',
    templateUrl: './editar-usuario.component.html',
    styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
    formRegistro: FormGroup;

    constructor(
        private _usuarioService: UsuarioService,
        public dialogo: MatDialogRef<EditarUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
            'txtClave': [''],
            'txtConfirmarClave': ['']
        });

        this.formRegistro.patchValue({
            cboPerfil: this.data.iid_perfil,
            cboTipoDocumento: this.data.iid_tipo_documento,
            txtNumeroDocumento: this.data.vnro_documento,
            cboEstado: this.data.iid_estado_registro,
            txtNombre: this.data.vnombres,
            txtApellidoPaterno: this.data.vapellido_paterno,
            txtApellidoMaterno: this.data.vapellido_materno,
            txtCorreoElectronico: this.data.vcorreo_electronico,
            txtNumeroTelefonico: this.data.vnumero_telefonico,
            txtClave: '',
            txtConfirmarClave: ''
        });
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

        if(this.formRegistro.valid){
            const req = {
                "iid_estado_registro": value.cboEstado,
                "iid_usuario_registra": 1,    
                "iid_usuario": this.data.iid_usuario,
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
                }else{
                    this.dialogo.close(true);
                }
            });
        }
    }
}
