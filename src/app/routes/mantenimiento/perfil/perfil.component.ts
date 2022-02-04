import { SelectionModel } from '@angular/cdk/collections';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { PerfilService } from 'src/app/core/service/perfil.service';
import { AgregarPerfilComponent } from './agregar-perfil/agregar-perfil.component';

const swal = require('sweetalert');

@Component({
    selector: 'app-mantenimiento-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    displayedColumns: string[] = ['select', 'vnombrePerfil', 'vdescripcionPerfil', 'iidEstadoRegistro', 'acciones'];
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<any>(true, []);
    form: FormGroup;

    flgnuevo:any=0;
    lstEstado:any=0;
    parametroListaEstado:any=1;
    totalRecord:any=0;
    pageIndex :any = 1;
    pageSize :any=5;
  
     req = {
        pageNum: 1,
        pageSize: 5,
        iid_estado_registro: -1,
        iid_perfil: -1,
        vnombre_perfil: "",
        vdescripcion_perfil:""
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private perfilService: PerfilService,
        private _parametroService: ParametroService,
        public dialogo: MatDialog,
    ) 
    {
        this.getEstado();
        this.dataSource = new MatTableDataSource();
        this.form = fb.group({
            'txtNombre': [''],
            'cboEstado': ['-1'],
        });      
               
        this.loadData(this.req);
    }

    ngOnInit(): void {

    }

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }

    onSubmit($ev, value: any) {
      //  console.log(value)
        $ev.preventDefault();
        for (let c in this.form.controls) {
            this.form.controls[c].markAsTouched();
        }

        if (this.form.valid) {
                    
                this.req.vnombre_perfil=value.txtNombre;
                this.req.iid_estado_registro= value.cboEstado;

           this.loadData(this.req);
        } 
    }

    changePage(event:any)
    {

    this.req.pageNum = (event.pageIndex*event.pageSize)+1;
    this.req.pageSize = event.pageSize;
    this.loadData(this.req);

    }

    loadData(req:any)
    {
        //debugger;;
        this.perfilService.post(this.req, '/Perfil/GetListPerfil').subscribe(res => {
        // console.log(res.data)
            if(!res.isSuccess){
                swal('Validación', res.message, 'warning'); return;
            }            
            this.dataSource.data = res.data;
            this.totalRecord = res.totalregistro;
            //console.log( res.data);
        });

    }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    getEstado() {
        this._parametroService.get('/ParametroAplicacion/GetListCbTablaDetalleParametro?requestAuxiliar=' + this.parametroListaEstado).subscribe(res => {
            if (!res.isSuccess) {
                swal('Error', res.message, 'error'); return;
            }
            this.lstEstado = res.data;
        })
    }

    mostrarDialogoAgregar(flg:any): void {
        //debugger;;
        this.flgnuevo=flg;
        this.dialogo.open(AgregarPerfilComponent, {
            disableClose: true, restoreFocus: false, panelClass: 'cambia-nombre-dialog-mat',
            width: '60%',
            data:this
        })
            .afterClosed().subscribe(data => {
                console.log(data)
                if (data) {
                    //this.buscar();
                    swal('Información', 'Perfil creado correctamente', 'success');
                }
            });
    }

    postEliminar(id: string) {
        swal({
            title: '¿Esta seguro?',
            text: 'se Inactivará el perfil seleccionado',
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
               // this.buscar();
                this.perfilService.delete('/Perfil?request=' + id).subscribe(res => {
                    if (!res.isSuccess) {
                        swal('Error', res.message, 'error'); return;
                    }
                    swal('Inactivado!', 'El perfil fue inactivado correctamente.', 'success');
                });
            } else {
                swal('Cancelado', 'La acción fue cancelada.', 'error');
            }
        });
    }

}