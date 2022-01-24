import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nueva-reserva',
    templateUrl: './nueva-reserva.component.html',
    styleUrls: ['./nueva-reserva.component.scss']
})
export class NuevaReservaComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }


}