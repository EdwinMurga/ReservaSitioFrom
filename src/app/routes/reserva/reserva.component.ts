import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }
}