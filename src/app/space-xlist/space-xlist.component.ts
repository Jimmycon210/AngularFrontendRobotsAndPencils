import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-space-xlist',
  templateUrl: './space-xlist.component.html',
  styleUrls: ['./space-xlist.component.css']
})
export class SpaceXListComponent implements OnInit {

  allData: any;
  launchData: any;

  filterLand = false;
  filterReuse = false;
  filterReddit = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  // getTextFile(filename: string) {
  //   return this.http.get(filename, {responseType: 'text'})
  //   .pipe(tap(data=>this.log(filename,data), error=>this.logError(filename,error)));
  // }

  getData(){
    this.http.get('https://api.spacexdata.com/v2/launches').subscribe((res : any[])=>{
      this.launchData = res;
      this.allData = res;
    });
    setTimeout(() => {this.checkbox(-1);}, 350);
  }

  getDate(utc){
    let date = new Date(utc)
    return ""+(Number(date.getMonth())+1)+"/"+date.getDate()+"/"+date.getFullYear()
  }

  checkbox(box) {
    this.launchData = this.allData;
    switch(box) {
      case 0: {
        if(document.getElementById("land").getAttribute("class") === "check") {
          document.getElementById("land").setAttribute("class", "checkmarked");
          // this.launchData = this.allData.filter(launch => launch.rocket.first_stage.cores[0].land_success === true);
          this.filterLand = true;
        } else {
          document.getElementById("land").setAttribute("class", "check");
          // this.launchData = this.allData;
          this.filterLand = false
        }
        break;
      }
      case 1: {
        if(document.getElementById("reused").getAttribute("class") === "check") {
          document.getElementById("reused").setAttribute("class", "checkmarked");
          // this.launchData = this.allData.filter(launch => launch.rocket.first_stage.cores[0].reused === true);
          this.filterReuse = true;
        } else {
          document.getElementById("reused").setAttribute("class", "check");
          // this.launchData = this.allData;
          this.filterReuse = false;
        }
      }
      break;
      case 2: {
        if(document.getElementById("reddit").getAttribute("class") === "check") {
          document.getElementById("reddit").setAttribute("class", "checkmarked");
          this.filterReddit = true;
        } else {
          document.getElementById("reddit").setAttribute("class", "check");
          this.filterReddit = false;
        }
      }
      break;
      default: break;
    }
    if(this.filterLand) {
      this.launchData = this.launchData.filter(launch => launch.rocket.first_stage.cores[0].land_success === true)
    }
    if(this.filterReuse) {
      this.launchData = this.launchData.filter(launch => launch.rocket.first_stage.cores[0].reused === true);
    }
    if(this.filterReddit) {
      this.launchData = this.launchData.filter(launch => launch.links.reddit_campaign !== null || launch.links.reddit_launch !== null || launch.links.reddit_recovery !== null || launch.links.reddit_media !== null)
    }
  }
}
