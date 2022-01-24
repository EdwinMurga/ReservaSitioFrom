import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mantenimiento',
    templateUrl: './mantenimiento.component.html',
    styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }
}