import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { window } from 'rxjs/operator/window';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})
export class MapFilterComponent implements OnInit {

  constructor(private dataService: DataService) { }

  lat: number = 35.416348;
  lng: number = -118.979953;

  markers: Array<any> = [];
  polygon: any = {};
  flag = false;

  mapResult: Array<any> = [];
  searchResult: Array<any> = [];

  ngOnInit() { this.getQueryResults(); }

  placeMarker($event) {
    let lat = $event.coords.lat;
    let lng = $event.coords.lng;
    console.log("lat", lat, "lng", lng);
    this.markers.push({ lat: lat, lng: lng });
  }

  getQueryResults(){
    this.dataService.getResultData().subscribe( (data) => {this.searchResult = data;console.log("search Result",this.searchResult);
	//this.lat = this.searchResult[0].Latitude;this.lng = this.searchResult[0].Longitude;
	});
  }

  clearMap() {
    if (confirm('Do you really want to remove all Markers and Polygon from Map ?')) {
      this.markers = [];
      this.flag = false;
      this.mapResult = [];
	  this.searchResult = [];
    }
  }

  undo() {
    this.markers.pop();
    this.flag = false;
  }

  polygonMap() {
    this.flag = true;
    this.polygon.paths = this.markers;
    this.polygon.strokeColor = '#FF0000';
    this.polygon.strokeOpacity = 0.8;
    this.polygon.strokeWeight = 2;
    this.polygon.fillColor = '#FF0000';
    this.polygon.fillOpacity = 0.35;
	//this.searchWells();
  }

  searchWells() {	
	this.searchResult = [];
    this.dataService.getMapResult(this.markers).subscribe(data => { this.mapResult = data.Result; if(this.mapResult.length==0){alert("No wells found in the selected region")};console.log(this.mapResult); });
  }

}
