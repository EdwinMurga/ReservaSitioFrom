
import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/core/service/empresa.service';
import { ParametroService } from 'src/app/core/service/parametro.service';

const swal = require('sweetalert');
@Component({
    selector: 'app-mantenimiento-parametro',
    templateUrl: './parametro.component.html',
    styleUrls: ['./parametro.component.scss']
})
export class ParametroComponent implements OnInit {
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
        private _empresaService: EmpresaService
    ) {
        this.formBusqueda = fb.group({
            "cboEmpresa": ['-1'],
            "txtNombre": [''],
            "cboEstado": ['-1'],
        });

        this.getEmpresa();
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
            "vdescripcion": this.formBusqueda.controls['txtNombre'].value,
            "iid_empresa": this.formBusqueda.controls['cboEmpresa'].value
        }
        this.loadData(req);
    }

    getEmpresa() {
        const req: any = {
            "pageNum": 1,
            "pageSize": 10,
            "iid_estado_registro": -1,
            "vnombre_completo": "",
            "vruc": ""
        }
        this._empresaService.post(req, '/Empresa/GetListEmpresa').subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstEmpresa = res.data;
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

    loadData(req: any) {
        this.isLoading = true;
        this._empresaService.post(req, '/ParametroAplicacion/GetListParametro').subscribe(res => {
            if (!res.isSuccess) {
                this.isLoading = false;
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
            "vdescripcion": this.formBusqueda.controls['txtNombre'].value,
            "iid_empresa": this.formBusqueda.controls['cboEmpresa'].value
        };
        this.loadData(req);
    }
}