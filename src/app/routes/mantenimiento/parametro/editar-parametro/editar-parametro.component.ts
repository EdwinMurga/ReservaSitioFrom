import { OnInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { PerfilService } from 'src/app/core/service/perfil.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
const swal = require('sweetalert');

@Component({
    selector: 'app-mantenimiento-editar-parametro',
    templateUrl: './editar-parametro.component.html',
    styleUrls: ['./editar-parametro.component.scss']
})
export class EditarParametroComponent implements OnInit {
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
        public dialogo: MatDialogRef<EditarParametroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        fb: FormBuilder) {

        this.formRegistro = fb.group({
            'txtDescripcion': [null, Validators.compose([Validators.required])],
            'txtCadena': [null, Validators.compose([Validators.required])],
            // 'txtCadena1': [null, Validators.compose([Validators.required])],
            // 'txtCadena2': [null, Validators.compose([Validators.required])],
            'txtValorEntero': [null, Validators.compose([Validators.required])],
            'txtValorDecimal': [null, Validators.compose([Validators.required])],
            'cboEstado': [null, Validators.compose([Validators.required])],
        });

        this.formRegistro.patchValue({
            txtDescripcion: this.data.vdescripcion,
            txtCadena: this.data.vvalor_cadena,
            // txtCadena1: this.data.iid_estado_registro,
            // txtCadena2: this.data.vnombres,
            txtValorEntero: this.data.ivalor_entero,
            txtValorDecimal: this.data.nvalor_decimal,
            cboEstado: this.data.iid_estado_registro,
        });

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

        if(this.formRegistro.valid){
            const req = {
                "iid_estado_registro": value.cboEstado,
                "iid_usuario_registra": 1,
                "iid_parametro": this.data.iid_parametro,
                "vdescripcion": value.txtDescripcion,
                "vvalor_cadena": value.txtCadena,
                "ivalor_entero": value.txtValorEntero,
                "nvalor_decimal": value.txtValorDecimal,
                "iid_empresa": this.data.iid_empresa
            }
            this._parametroService.post(req, '/ParametroAplicacion/RegisterParametro').subscribe((res: any) => {
                if (!res.isSuccess) {
                    swal('Error', res.message, 'error'); return;
                }else{
                    this.dialogo.close(true);
                }
            });
        }
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
