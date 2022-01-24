import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-detalle-reserva',
    templateUrl: './detalle-reserva.component.html',
    styleUrls: ['./detalle-reserva.component.scss']
})
export class DetalleReservaComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }
    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }
}