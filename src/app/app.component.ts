import { Component, NgModule, ViewChild, ElementRef, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  multi: any[];
  view: any[] = [700, 400];

  @ViewChild('chartDiv',{static: false}) chartDiv: ElementRef;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';

  output1 : any;
  output2 : any;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {
    Object.assign(this, { multi })
  }

  ngAfterViewInit(): void {
    console.log(this.chartDiv);
    if(this.multi.length > 2){
      this.renderer.setStyle(this.chartDiv.nativeElement, "height", "50vh");
    }
    else{
      this.renderer.setStyle(this.chartDiv.nativeElement, "height", "15vh");
    }
  }
  ngOnInit(): void {
    this.httpClient.get(environment.url + '/api/v1/users/1').subscribe(x => {
      this.output1 = x;
    });

    this.httpClient.get(environment.url +'/api/v1/users').subscribe(x => {
      this.output2 = x;
    })
  } 

  onSelect(event) {
    console.log(event);
  }
}
