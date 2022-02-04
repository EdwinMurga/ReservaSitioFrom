
import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/core/service/empresa.service';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { EditarTablaAuxiliarComponent } from './editar-tabla-auxiliar/editar-tabla-auxiliar.component';

const swal = require('sweetalert');
@Component({
    selector: 'app-mantenimiento-tabla-auxiliar',
    templateUrl: './tabla-auxiliar.component.html',
    styleUrls: ['./tabla-auxiliar.component.scss']
})
export class TablaAuxiliarComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    formBusqueda: FormGroup;
    displayedColumns: string[] = ['item', 'descripcion', 'estado', 'acciones'];
    dataSource = new MatTableDataSource<any>();

    lstEmpresa: any;
    lstEstado: any;

    //Constantes
    parametroListaEstado: string = '1';
    pageIndex: any = 0;
    pageSize: any = 5;
    totalRecord: any = 0;
    isLoading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        private _parametroService: ParametroService,
        private _empresaService: EmpresaService,
        public dialogo: MatDialog
    ) {
        this.formBusqueda = fb.group({
            "txtNombre": [''],
            "cboEstado": ['-1'],
        });
        this.getEstado();
    }
    ngOnInit(): void {

    }

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }

    buscar() {
        const req = {
            "pageNum": this.pageIndex,
            "pageSize": this.pageSize,
            "iid_estado_registro": this.formBusqueda.controls['cboEstado'].value,
            "vdescripcion": this.formBusqueda.controls['txtNombre'].value
        }
        this.loadData(req);
    }

    getEstado() {
        this._parametroService.get('/ParametroAplicacion/GetListCbTablaDetalleParametro?requestAuxiliar=' + this.parametroListaEstado).subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstEstado = res.data;
        })
    }

    loadData(req: any) {
        this.isLoading = true;
        console.log(req)
        this._empresaService.post(req, '/ParametroAplicacion/GetListTablaParametro').subscribe(res => {
            console.log(res)
            if (!res.isSuccess) {
                this.isLoading = false;
                this.dataSource.data = [];
                swal('Error', res.message, 'error'); return;
            }
            this.dataSource = res.data;
            this.paginator.pageIndex = this.pageIndex;
            this.totalRecord = res.totalregistro;
            this.paginator.length = this.totalRecord;
            this.isLoading = false;
        })
    }

    changePage(event: PageEvent) {
        // debugger;;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        const req: any = {
            "pageNum": this.pageIndex,
            "pageSize": this.pageSize,
            "iid_estado_registro": this.formBusqueda.controls['cboEstado'].value,
            "vdescripcion": this.formBusqueda.controls['txtNombre'].value
        };
        this.loadData(req);
    }

    mostrarDialogoEditar(item: any): void {
        console.log(item)
        this.dialogo.open(EditarTablaAuxiliarComponent, {
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
}