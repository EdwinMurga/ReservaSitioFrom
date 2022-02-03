import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { PerfilService } from 'src/app/core/service/perfil.service';
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
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    displayedColumns: string[] = ['codigo', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'tipoDocumento', 'documento', 'perfil', 'estado', 'acciones'];
    dataSource = new MatTableDataSource<any>();
    formBusqueda: FormGroup;
    lstPerfil: any;
    lstTipoDocumento: any;
    lstEstado: any;
    //Constantes
    parametroListaEstado: string = '1';
    parametroListaTipoDocumento: string = '2';
    pageIndex: any = 0;
    pageSize: any = 5;
    totalRecord: any = 0;
    isLoading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        private _usuarioService: UsuarioService,
        private _perfilService: PerfilService,
        private _parametroService: ParametroService,
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
        });

        this.getPerfiles();
        this.getTipoDocumento();
        this.getEstado();
    }
    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    buscar() {
        const req = {
            "pageNum": this.pageIndex,
            "pageSize": this.pageSize,
            "iid_estado_registro": this.formBusqueda.controls['cboEstado'].value,
            "iid_perfil": this.formBusqueda.controls['cboPerfil'].value,
            "iid_tipo_documento": this.formBusqueda.controls['cboTipoDocumento'].value,
            "vnro_documento": this.formBusqueda.controls['txtNumeroDocumento'].value,
            "vnombres": this.formBusqueda.controls['txtNombre'].value,
            "vapellido_paterno": this.formBusqueda.controls['txtApellidoPaterno'].value,
            "vapellido_materno": this.formBusqueda.controls['txtApellidoMaterno'].value,
            "iid_empresa": -1
        }
        this.loadData(req);
    }

    changePage(event: PageEvent) {
        // debugger;;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        const req: any = {
            "pageNum": this.pageIndex,
            "pageSize": this.pageSize,
            "iid_estado_registro": this.formBusqueda.controls['cboEstado'].value,
            "iid_perfil": this.formBusqueda.controls['cboPerfil'].value,
            "iid_tipo_documento": this.formBusqueda.controls['cboTipoDocumento'].value,
            "vnro_documento": this.formBusqueda.controls['txtNumeroDocumento'].value,
            "vnombres": this.formBusqueda.controls['txtNombre'].value,
            "vapellido_paterno": this.formBusqueda.controls['txtApellidoPaterno'].value,
            "vapellido_materno": this.formBusqueda.controls['txtApellidoMaterno'].value,
            "iid_empresa": -1
        };
        this.loadData(req);
    }

    loadData(req: any) {
        console.log(req)
        this.isLoading = true;
        this._usuarioService.post(req, '/Usuario/GetListUsuario').subscribe(res => {
            if (!res.isSuccess) {
                this.isLoading = false;
                this.dataSource.data = [];
                swal('Error', res.message, 'error'); return;
            }
            console.log(res.data)
            this.dataSource = res.data;
            this.paginator.pageIndex = this.pageIndex;
            this.totalRecord = res.totalregistro;
            this.paginator.length = this.totalRecord;
            this.isLoading = false;
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
                    this.buscar();
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
                    this.buscar();
                    swal('Información', 'Usuario modificado correctamente', 'success');
                }
            });
    }

    postEliminar(id: string) {
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
                this.buscar();
                this._usuarioService.delete('/Usuario?request=' + id).subscribe(res => {
                    if (!res.isSuccess) {
                        swal('Error', res.message, 'error'); return;
                    }
                    swal('Inactivado!', 'El usuario fue inactivado correctamente.', 'success');
                });
            } else {
                swal('Cancelado', 'La acción fue cancelada.', 'error');
            }
        });
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

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }
}