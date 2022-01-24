import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lista-reserva',
    templateUrl: './lista-reserva.component.html',
    styleUrls: ['./lista-reserva.component.scss']
})
export class ListaReservaComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }
}