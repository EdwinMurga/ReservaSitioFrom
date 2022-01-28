import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
const swal = require('sweetalert');

@Component({
    selector: 'app-mantenimiento-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    displayedColumns: string[] = ['codigo', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'tipoDocumento', 'documento', 'perfil', 'estado', 'acciones'];
    dataSource = new MatTableDataSource<any>();
    formBusqueda: FormGroup;
    constructor(
        fb: FormBuilder,
        private router: Router,
        private _usuarioService: UsuarioService,
        public dialogo: MatDialog
    ) {
        this.formBusqueda = fb.group({
            "cboPerfil": ['-1'],
            "cboTipoDocumento": ['-1'],
            "txtNumeroDocumento": [''],
            "cboEstado": ['-1'],
            "txtNombre": [''],
            "txtApellidoPaterno": [''],
            "txtApellidoMaterno": ['']
        })
    }
    ngOnInit(): void {

    }
    formBusquedaTemp:any;
    buscar(value: any) {
        this.formBusquedaTemp = value;

        const req = {
            "pageNum": 1,
            "pageSize": 10,
            "iid_estado_registro": value.cboEstado,
            "iid_perfil": value.cboPerfil,
            "iid_tipo_documento": value.cboTipoDocumento,
            "vnro_documento": value.txtNumeroDocumento,
            "vnombres": value.txtNombre,
            "vapellido_paterno": value.txtApellidoPaterno,
            "vapellido_materno": value.txtApellidoMaterno,
            "iid_empresa": -1
        }
        this._usuarioService.post(req, '/Usuario/GetListUsuario').subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.dataSource = res.data;
        })
    }

    mostrarDialogoAgregar(): void {
        this.dialogo.open(AgregarUsuarioComponent, {
            disableClose: true, restoreFocus: false, panelClass: 'cambia-nombre-dialog-mat',
            width: '60%'
        })
            .afterClosed().subscribe(data => {
                console.log(data)
                if (data) {
                    this.buscar(this.formBusquedaTemp);
                    swal('Información', 'Usuario creado correctamente', 'success');
                }
            });
    }

    mostrarDialogoEditar(item: any): void {
        console.log(item)
        this.dialogo.open(EditarUsuarioComponent, {
            disableClose: true, restoreFocus: false, panelClass: 'cambia-nombre-dialog-mat',
            data: item,
            width: '60%'
        })
            .afterClosed().subscribe(data => {
                console.log(data)
                if (data) {
                    this.buscar(this.formBusquedaTemp);
                    swal('Información', 'Usuario modificado correctamente', 'success');
                }
            });
    }

    postEliminar(){
        swal({
            title: '¿Esta seguro?',
            text: 'se Inactivará el usuario seleccionado',
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: {
                    text: 'Si!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: true
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                this.buscar(this.formBusquedaTemp);
                swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
            } else {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    }

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }
}