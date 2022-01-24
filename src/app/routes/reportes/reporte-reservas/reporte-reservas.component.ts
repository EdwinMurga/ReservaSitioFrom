import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare var $: any;

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
    { item: 1, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos', tipoDocumento: 'DNI', documento: '44634946', empresa: 'XXXX', area: 'YYYYYY', perfil: 'Usuario', estado: 'Activo' },
    { item: 2, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos', tipoDocumento: 'DNI', documento: '44634946', empresa: 'XXXX', area: 'YYYYYY', perfil: 'Usuario', estado: 'Activo' },
    { item: 3, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos', tipoDocumento: 'DNI', documento: '44634946', empresa: 'XXXX', area: 'YYYYYY', perfil: 'Usuario', estado: 'Activo' },
    { item: 4, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos', tipoDocumento: 'DNI', documento: '44634946', empresa: 'XXXX', area: 'YYYYYY', perfil: 'Usuario', estado: 'Activo' },
    { item: 5, usuario: 'Hydrogen', nombres: 'Fernando', apellidos: 'Llanos', tipoDocumento: 'DNI', documento: '44634946', empresa: 'XXXX', area: 'YYYYYY', perfil: 'Usuario', estado: 'Activo' },

];
@Component({
    selector: 'app-reporte-reservas',
    templateUrl: './reporte-reservas.component.html',
    styleUrls: ['./reporte-reservas.component.scss']
})
export class ReporteReservaComponent implements OnInit {
    displayedColumns: string[] = ['select', 'item', 'usuario', 'nombres', 'apellidos', 'tipoDocumento', 'documento', 'empresa', 'area', 'perfil', 'estado', 'acciones'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    // BAR STACKED
    // -----------------------------------
    barStackeData: any;
    barStackedOptions = {
        series: {
            stack: true,
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function(label, x, y) { return x + ' : ' + y; }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            max: 200, // optional: use it for a clear represetation
            // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickColor: '#eee'
        },
        shadowSize: 0
    };

    constructor(private router: Router,public http: HttpClient) {
        this.getChartData('assets/server/chart/barstackedReserva.json').subscribe(data => this.barStackeData = data);
    }
    ngOnInit(): void {

    }

    getChartData(url): Observable<any> {
        return this.http.get(url);
    }

    Ir(url: string) {
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