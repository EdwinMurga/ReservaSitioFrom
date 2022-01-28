import { SelectionModel } from '@angular/cdk/collections';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/core/service/perfil.service';

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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private perfilService: PerfilService
    ) {

        this.form = fb.group({
            'txtNombre': [''],
            'cboEstado': [''],
        });

        this.dataSource = new MatTableDataSource();
    }
    ngOnInit(): void {

    }

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }

    onSubmit($ev, value: any) {
        console.log(value)
        $ev.preventDefault();
        for (let c in this.form.controls) {
            this.form.controls[c].markAsTouched();
        }

        if (this.form.valid) {
            const req = {
                "pageNum": 1,
                "pageSize": 10,
                "iid_estado_registro": -1,
                "iid_perfil": -1,
                "vnombre_perfil": value.txtNombre,
                "vdescripcion_perfil": value.cboEstado
            }
            this.perfilService.post(req, '/Perfil/GetListPerfil').subscribe(res => {
                console.log(res.data)

                if(!res.isSuccess){
                    swal('Validación', res.message, 'warning'); return;
                }
                
                this.dataSource.data = res.data;

            });
        } 
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

}