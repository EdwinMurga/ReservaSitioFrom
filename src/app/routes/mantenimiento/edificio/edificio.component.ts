import { SelectionModel } from '@angular/cdk/collections';
import { OnInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
    item: number;
    usuario: string;
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    documento: string;
    empresa: string;
    area: string;
    perfil: string;
    estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { item: 1, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos',tipoDocumento: 'DNI', documento: '44634946',empresa:'XXXX',area:'YYYYYY',perfil:'Usuario',estado:'Activo' },
    { item: 2, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos',tipoDocumento: 'DNI', documento: '44634946',empresa:'XXXX',area:'YYYYYY',perfil:'Usuario',estado:'Activo' },
    { item: 3, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos',tipoDocumento: 'DNI', documento: '44634946',empresa:'XXXX',area:'YYYYYY',perfil:'Usuario',estado:'Activo' },
    { item: 4, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos',tipoDocumento: 'DNI', documento: '44634946',empresa:'XXXX',area:'YYYYYY',perfil:'Usuario',estado:'Activo' },
    { item: 5, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos',tipoDocumento: 'DNI', documento: '44634946',empresa:'XXXX',area:'YYYYYY',perfil:'Usuario',estado:'Activo' },

];
@Component({
    selector: 'app-mantenimiento-usuario',
    templateUrl: './edificio.component.html',
    styleUrls: ['./edificio.component.scss']
})
export class EdificioComponent implements OnInit {
    displayedColumns: string[] = ['select', 'item', 'usuario', 'nombres', 'apellidos','tipoDocumento','documento','empresa','area','perfil','estado','acciones'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    constructor(private router:Router) {

    }
    ngOnInit(): void {

    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
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

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.item + 1}`;
    }
}