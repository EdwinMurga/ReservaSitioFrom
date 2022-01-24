import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs/observable';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    lstFila: any;

    // CAROUSEL PROPS
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public slides: Array<any> = [];

        // BAR STACKED
    // -----------------------------------
    barStackeData: any;
    barStackedOptions = {
        series: {
            stack: true,
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function(label, x, y) { return x + ' : ' + y; }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            max: 200, // optional: use it for a clear represetation
            // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickColor: '#eee'
        },
        shadowSize: 0
    };

    constructor(public settings: SettingsService, public http: HttpClient) {
        this.settings.setLayoutSetting('offsidebarOpen', true);
        console.log('aqui')
        this.getChartData('assets/server/chart/barstacked.json').subscribe(data => this.barStackeData = data);
        console.log(this.barStackeData )
    }

    getChartData(url): Observable<any> {
        return this.http.get(url);
    }

    ngOnInit() {
        this.slides.push({chart:'flot'});
    }
    ready($event) {
        // $event == { plot: PlotObject }
        console.log('Ready!');
    }
}
