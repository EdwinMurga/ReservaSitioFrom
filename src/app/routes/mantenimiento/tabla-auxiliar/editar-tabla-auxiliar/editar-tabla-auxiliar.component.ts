import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ParametroAplicacionService } from 'src/app/core/service/parametroAplicacion.service';

@Component({
  selector: 'app-editar-tabla-auxiliar',
  templateUrl: './editar-tabla-auxiliar.component.html',
  styleUrls: ['./editar-tabla-auxiliar.component.scss']
})
export class EditarTablaAuxiliarComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'texto', 'entero', 'decimal', 'estado'];
  dataSource = new MatTableDataSource<any>();
  formRegistro: FormGroup;
  
  constructor(
    private parametroAplicacionService:ParametroAplicacionService,
    public dialogo: MatDialogRef<EditarTablaAuxiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) 
    {
      console.log(data)
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
        cboEstado: ''
      });
     }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {

  }

  getDetalleTablaMaestra() {
    this.parametroAplicacionService.get('/TablaCabecera/' + this.data.iid).subscribe((res: any) => {
      this.dataSource.data = res.objModel.tablaDetalleObjs;   
      this.formRegistro.patchValue({
        txtNombre: this.data.vdescripcion,        
        cboEstado: ''
      });   

    }, error => {

    });
  }

}
