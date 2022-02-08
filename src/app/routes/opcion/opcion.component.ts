import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { PerfilService } from 'src/app/core/service/perfil.service';

@Component({
    selector: 'app-opcion',
    templateUrl: './opcion.component.html',
    styleUrls: ['./opcion.component.scss']
})
export class OpcionComponent implements OnInit {
    currentUser:any;
    subMenuItems:any;
    idModulo;
    constructor(
        private router:Router,
        private _perfilService:PerfilService,
        private _authService:AuthenticationService,
        private _activatedroute: ActivatedRoute){

    }
    ngOnInit(): void {
        this.idModulo = this._activatedroute.snapshot.paramMap.get("idmodulo");
        this.getSubMenu();
    }

    getSubMenu(){
        if(this._authService.estaLogueado()){
            this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            this.subMenuItems = [];
            this._perfilService.get('/Opcion/GetSubMenu/' + this.currentUser.iid_perfil+'/'+this.idModulo).subscribe(res => {
                this.subMenuItems = res.item;
                console.log(this.subMenuItems)
            });
        }
    }

    Ir(url:string){
        console.log(url)
        this.router.navigateByUrl(url);
    }
}