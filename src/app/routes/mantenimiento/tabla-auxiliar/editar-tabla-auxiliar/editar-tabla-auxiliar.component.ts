import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParametroService } from 'src/app/core/service/parametro.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-editar-tabla-auxiliar',
  templateUrl: './editar-tabla-auxiliar.component.html',
  styleUrls: ['./editar-tabla-auxiliar.component.scss']
})
export class EditarTablaAuxiliarComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['descripcion', 'texto', 'entero', 'decimal', 'estado'];
  dataSource = new MatTableDataSource<any>();
  formRegistro: FormGroup;

  lstEstado: any;

  //Constantes
  parametroListaEstado: string = '1';
  pageIndex: any = 0;
  pageSize: any = 5;
  totalRecord: any = 0;
  isLoading = false;

  constructor(
    private _parametroService: ParametroService,
    public dialogo: MatDialogRef<EditarTablaAuxiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) {

    this.formRegistro = fb.group({
      'txtNombre': [null, Validators.compose([Validators.required])],
      'txtDescripcion': [null, Validators.compose([Validators.required])],
      'txtValorTexto': [null, Validators.compose([Validators.required])],
      'txtValorCorto': [null],
      'txtValorEntero': [null],
      'txtValorDecimal': [null],
      'cboEstado': [null, Validators.compose([Validators.required])],

    });

    this.formRegistro.patchValue({
      txtNombre: this.data.vdescripcion,
      cboEstado: '-1'
    });

    this.getEstado();
    this.getDetalleTablaAuxiliar();
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  ngOnInit() {

  }

  getEstado() {
    this._parametroService.get('/ParametroAplicacion/GetListCbTablaDetalleParametro?requestAuxiliar=' + this.parametroListaEstado).subscribe(res => {
      console.log(res)
      if (!res.isSuccess) {
        swal('Error', res.message, 'error'); return;
      }
      this.lstEstado = res.data;
    })
  }

  getDetalleTablaAuxiliar() {
    const req: any = {
      "pageNum": this.pageIndex,
      "pageSize": this.pageSize,
      "iid_estado_registro": -1,
      "iid_tabla_auxiliar": this.data.iid_tabla_auxiliar
    }
    this.loadData(req);
  }

  loadData(req: any) {
    this.isLoading = true;
    this._parametroService.post(req, '/ParametroAplicacion/GetListTablaDetalleParametro').subscribe(res => {
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
      "iid_estado_registro": -1,
      "iid_tabla_auxiliar": this.data.iid_tabla_auxiliar
    };
    this.loadData(req);
  }


  postRegistrar(value: any) {
    for (let c in this.formRegistro.controls) {
      this.formRegistro.controls[c].markAsTouched();
    }
    if (this.formRegistro.valid) {

      const req:any = {
        "iid_estado_registro": value.cboEstado,
        "iid_usuario_registra": 1,
        "iid_tabla_detalle": 0,
        "iid_tabla_auxiliar": this.data.iid_tabla_auxiliar,
        "iid_registro_tabla": 1,
        "vvalor_texto_corto": value.txtValorCorto,
        "vvalor_texto_largo": value.txtValorTexto,
        "nvalor_entero": value.txtValorEntero,
        "nvalor_decimal": value.txtValorDecimal
      }
      this._parametroService.post(req, '/ParametroAplicacion/RegisterTablaDetalleParametro').subscribe((res: any) => {
        if(!res.isSuccess){
          swal('Error',res.message,'error');return;
        }

        const req: any = {
          "pageNum": this.pageIndex,
          "pageSize": this.pageSize,
          "iid_estado_registro": -1,
          "iid_tabla_auxiliar": this.data.iid_tabla_auxiliar
        };
        this.loadData(req);
        swal('Información','Se registró correctamente','success');
      });
    }
  }
}

