import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

    constructor(private router:Router){

    }
    ngOnInit(): void {
       
    }

    Ir(url:string){
        console.log(url)
        this.router.navigate([url]);
    }
}