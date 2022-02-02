import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
//import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

const swal = require('sweetalert');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    constructor(
        private _authenticationService: AuthenticationService,
        public settings: SettingsService,
        fb: FormBuilder,
        private router: Router) {

        this.formLogin = fb.group({
            'user': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([
                Validators.required,
                // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
                //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
            ])]
        });


    }

    submitFormLogin($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.formLogin.controls) {
            this.formLogin.controls[c].markAsTouched();
        }
        if (this.formLogin.valid) {
            // this.recaptchaV3Service.execute('importantAction')
            // .subscribe((token: string) => {
            const req: any = {
                userName: value.user,
                password: value.password,
                googleToken: 'asdadsd'
            };
            this._authenticationService.postLogin(req, '/Auth/Login').subscribe((res: any) => {
                console.log(res)
                if (!res.isSuccess) {
                   swal('Error',res.message,'error');return;
                }
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("token", JSON.stringify(res.token));
                localStorage.setItem('user', JSON.stringify(res.data));  
                this.router.navigate(['/home']);
            });
            // });
        }
    }

    ngOnInit() {

    }

    Ir(url: string) {
        console.log(url)
        this.router.navigate([url]);
    }

}
