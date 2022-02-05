import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilComponent } from '../perfil.component';
import { PerfilService } from 'src/app/core/service/perfil.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



 interface IPerfil 
 {
  iid_perfil: number;
  vnombre_perfil: string;
  vdescripcion_perfil: string;
}

 interface IPerfilOpcion {
  iid_perfil: number;
  iid_opcion: number;

  vmodulo: string;
  vopcion: string;

  iacceso_crear: number;
  iacceso_actualizar: number;
  iacceso_eliminar: number;
  iacceso_visualizar: number;

  icrear: boolean;
  iactualizar: boolean;
  ieliminar: boolean;
  ivisualizar: boolean;

  iid_perfil_opcion:  number;
  flg_accesos:boolean;
}

const swal = require('sweetalert');

@Component({
  selector: 'app-agregar-perfil',
  templateUrl: './agregar-perfil.component.html',
  styleUrls: ['./agregar-perfil.component.scss'],
})
export class AgregarPerfilComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  //@Output() onClick = new EventEmitter<any>();
  //@Output() onClickPopupShow = new EventEmitter<any>();
  // @Input() idPerfil: number;
  // perfiles: IPerfil[] = [];

   
  dsperfilOpcion: IPerfilOpcion[] = [];
  formGroupPerfil: FormGroup;
  select_perfOpcion:any[]=[];
  // selection = new SelectionModel<IPerfil>(true, []);
  //selectionVer = new SelectionModel<IPerfilOpcion>(true, []);
  //selectionCrear = new SelectionModel<IPerfilOpcion>(true, []);
  //selectionEditar = new SelectionModel<IPerfilOpcion>(true, []);
  //selectionBorrar = new SelectionModel<IPerfilOpcion>(true, []);

  displayedColumns: string[] = [
    // 'select',
    'vmoduloName',
    'vopcionName',
    'ver',
    'crear',
    'editar',
    'borrar',
  ];

  dataSource = new MatTableDataSource<IPerfilOpcion[]>();
  idPerfil: any;
  Titulo: string = 'Agregar ';
  totalRecord:any=0;

  pageIndex :any = 1;
  pageSize :any=5;

  req:any={
    pageNum: 1,
    pageSize: 5,
    iid_estado_registro:-1,
    iid_usuario_registra: -1,
    iid_perfil_opcion: -1,
    iid_perfil: -1,
    iid_opcion: -1,
    flg_accesos:true ,//envia lista de accesos inactivos
  };

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<AgregarPerfilComponent>,
  ) 
  {

    this.formGroupPerfil = this.fb.group({
      perfil: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['-1'],
    });

    if(this.data.flgnuevo==0)
    {
      this.Titulo="Agregar";
    }
    else
    {
      this.req.iid_perfil = this.data.flgnuevo;
      this.req.flg_accesos=false;
    }

    this.loadData(this.req);

  }

  ngOnInit(): void 
  { 

  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  
  confirmado(): void {
    this.dialogo.close(true);
  }

  loadData(req: any) {
    //this.isLoading = true;   
    this.perfilService.post(req, '/Perfil/GetListPerfilOpcion').subscribe(res => {
        if (!res.isSuccess) {
         //   this.isLoading = false;
            swal('Error', res.message, 'error'); return;
        }
        this.dataSource = res.data;
        this.totalRecord = res.totalregistro;

        //console.log(this.dataSource);
        // debugger;;

          if(this.dsperfilOpcion!=null){
            this.dsperfilOpcion.forEach(element => {
                res.data.forEach(function (value) {
                    if( value.iid_perfil_opcion==element.iid_perfil_opcion  )
                    {
                      value.icrear= element.icrear;
                      value.iactualizar= element.iactualizar;
                      value.ieliminar= element.ieliminar;
                      value.ivisualizar= element.ivisualizar;
                    }  
                });
            });

          }
    })
}

changePage(event:any)
{
  this.req.pageNum = (event.pageIndex*event.pageSize)+1;
  this.req.pageSize = event.pageSize;
  this.loadData(this.req);
}

selectCheck(select:any)
{
 // debugger;
 // console.log(select);

  var item : IPerfilOpcion={
    iid_perfil: select.iid_perfil,
    iid_opcion: select.iid_opcion,
    iacceso_crear: (select.icrear == true ? 1 : 0),
    iacceso_actualizar: (select.iactualizar == true ? 1 : 0),
    iacceso_eliminar: (select.ieliminar == true ? 1 : 0),
    iacceso_visualizar: (select.ivisualizar == true ? 1 : 0),

    icrear: select.icrear,
    iactualizar: select.iactualizar,
    ieliminar: select.ieliminar,
    ivisualizar: select.ivisualizar,
    vmodulo: '',
    vopcion: '',
    iid_perfil_opcion: select.iid_perfil_opcion,
    flg_accesos:(this.data.flgnuevo==0?true:false),
  };

    if(this.dsperfilOpcion.find(x=> x.iid_perfil_opcion==select.iid_perfil_opcion))
    {
      this.dsperfilOpcion.splice(this.dsperfilOpcion.findIndex(x=> x.iid_perfil_opcion==select.iid_perfil_opcion ),1);
      this.dsperfilOpcion.push(item);
    }
    else
    {
      this.dsperfilOpcion.push(item);  
    }

}


savePerfil(event) {

  //console.log(this.dsperfilOpcion);

  if(this.dsperfilOpcion!=null){
    this.dsperfilOpcion.forEach(element => {
      
      if(element.icrear== true ||
        element.iactualizar== true  ||
        element.ieliminar==true ||
        element.ivisualizar==true)
      {
        console.log(element);
      }else
      {
        this.dsperfilOpcion.splice(this.dsperfilOpcion.findIndex(x=> x.iid_perfil_opcion==element.iid_perfil_opcion ),1);
      }
         
       
    });

  }

  let value = this.formGroupPerfil.value;
  for (let c in this.formGroupPerfil.controls) {
      this.formGroupPerfil.controls[c].markAsTouched();
  }

if(this.formGroupPerfil.valid && this.dsperfilOpcion!=null){

 // var items=

var req = {
  "perfil": { 
    "iid_usuario_registra":1,
    "iid_estado_registro": 1,   
    "iid_perfil": this.data.flgnuevo,
    "vnombre_perfil":this.formGroupPerfil.controls['perfil'].value,
    "vdescripcion_perfil": this.formGroupPerfil.controls['descripcion'].value
  },
  "perfilOpcion":  this.dsperfilOpcion

};

 // console.log(event);
  this.perfilService.post(req, '/Perfil/RegisterPerfilOpcion').subscribe(res => {
      if (!res.isSuccess) {
      //   this.isLoading = false;
          swal('Error', res.message, 'error'); return;
          
      }else
      {
        swal('Información', 'Perfil Registrado o Actualizado correctamente', 'success');return;
      }
    
    });

}else
{

  swal('Advertencia','selecione algún item de acciones.', 'error'); return;
}

}

 
}



/*
  getModules() {
    this.perfilService.getModules().subscribe((res: any[]) => {
      res.map((ele) => {
        ele.ver = false;
        ele.crear = false;
        ele.editar = false;
        ele.borrar = false;
      });
      this.dataSource.data = res;

      this.dataSource.data.forEach((row) => {
        if (row.ver) {
          this.selectionVer.select(row);
        }
        if (row.crear) {
          this.selectionCrear.select(row);
        }
        if (row.editar) {
          this.selectionEditar.select(row);
        }
        if (row.borrar) {
          this.selectionBorrar.select(row);
        }
        row.iidPerfilOpcion=0
      });
    });
  }
  
  */
/*
  getValuesForEdit() {
    this.perfilComponent.idPerfilSourced$.subscribe((res) => {
    //  this.onClickPopupShow.emit(true);
      this.idPerfil = res;
      this.perfilService.getById(this.idPerfil).subscribe((res) => {
        this.textButton = 'Editar';
        this.textButton2 = 'Editar Perfil';
        this.formGroupAddPerfil.setValue(res);        
        this.perfilService.getOptions(this.idPerfil).subscribe((res) => {
          if(res.length ===0 ){
            this.getModules();
          }else{
            const data = res.map((ele) => {
              return {
                iidOpcion: ele.iidOpcion,
                vmoduloName: ele.vmoduloName,
                vopcionName: ele.vopcionName,
                ver: ele.iaccesoVisualizar == 1 ? true : false,
                crear: ele.iaccesoCrear == 1 ? true : false,
                editar: ele.iaccesoActualizar == 1 ? true : false,
                borrar: ele.iaccesoEliminar == 1 ? true : false,
                iidPerfilOpcion:ele.iidPerfilOpcion
              };
            });
            this.dataSource.data = data;
          }
          
        });
        // this.dataSource.data = this.perfiles;
      });
    });
  }
  */
/*
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
   }

   masterToggle() {
     this.isAllSelected()
       ? this.selection.clear()
       : this.dataSource.data.forEach((row) => this.selection.select(row));
   }
*/
 
  /*
  addPerfil(data: IPerfil, event) {
    const reqData: IPerfilResponse = {
      iid: 0,
      iidEstadoRegistro: 0,
      userId: 0,
      vdescripcionPerfil: data.descripcion,
      vestadoRegistro: data.estado,
      vnombrePerfil: data.perfil,
    };
    if (this.textButton == 'Agregar') {
      // this.perfiles.push(data);
      // this.dataSource.data = this.perfiles;
      // this.formGroupAddPerfil.reset();
      this.perfilService.savePerfil(reqData).subscribe((res) => {
        this.idPerfil = res;
        // this.perfiles = [];
        // this.dataSource.data = this.perfiles;
        // this.onClick.emit(event);
      });
    } else {
      // this.perfiles = [];
      // this.perfiles.push(data);
      // this.dataSource.data = this.perfiles;
      this.updatePerfil(reqData);
    }
  }
  */

  /*
  updatePerfil(data) {
    const reqData: IPerfilResponse = {
      iid: this.idPerfil,
      iidEstadoRegistro: 0,
      userId: 0,
      vdescripcionPerfil: data.vdescripcionPerfil,
      vestadoRegistro: data.vestadoRegistro + '',
      vnombrePerfil: data.vnombrePerfil,
    };
    // reqData.idd= this.idPerfil;
    this.perfilService.updatePerfil(reqData).subscribe((res) => {
      // this.perfiles = [];
      // this.dataSource.data = this.perfiles;
      // this.onClick.emit(event);
    });
  }
*/
  

/*
const seletedVer = this.selectionVer.selected;
const selectionCrear = this.selectionCrear.selected;
const selectionEditar = this.selectionEditar.selected;
const selectionBorrar = this.selectionBorrar.selected;
  const lista = this.dataSource.data;
      lista de ver
     lista.map((ele) => {
       const marcado = seletedVer.find((p) => p.iidOpcion == ele.iidOpcion);
       if (marcado) {
         ele.ver = true;
       }
     });
     lista de crear
     lista.map((ele) => {
       const marcado = selectionCrear.find((p) => p.iidOpcion == ele.iidOpcion);
       if (marcado) {
         ele.crear = true;
       }
     });
     lista de editar
     lista.map((ele) => {
       const marcado = selectionEditar.find((p) => p.iidOpcion == ele.iidOpcion);
       if (marcado) {
         ele.editar = true;
       }
     });
     lista de borrar
     lista.map((ele) => {
       const marcado = selectionBorrar.find((p) => p.iidOpcion == ele.iidOpcion);
       if (marcado) {
         ele.borrar = true;
       }
     });
     */
/*
    const dataReq = this.dataSource.data.map((ele) => {
      return {
        iidOpcion: ele.iidOpcion,
        iidPerfil: this.idPerfil,
        iidPerfilOpcion: this.textButton === 'Editar'? ele.iidPerfilOpcion : 0,
        iaccesoCrear: ele.crear ? 1 : 0,
        iaccesoActualizar: ele.editar ? 1 : 0,
        iaccesoEliminar: ele.borrar ? 1 : 0,
        iaccesoVisualizar: ele.ver ? 1 : 0,
        iidEstadoRegistro: 0,
        userId: 0,
      };
    });

    this.perfilService.saveOptions(dataReq).subscribe(res=>{
       
      if(res > 0){
        swal("Información","Se registró correctamente.","success");
      }else{
        swal("Información","Ocurrioun problema, intenteo nuevamente dentro de unos minutos.","warning");
      }
    });

    */