import { Component, OnInit, AfterContentInit, Input, Renderer, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-hr-filter',
  templateUrl: './hr_filter.component.html',
  styleUrls: ['./hr_filter.component.css']
})
export class HRFilterComponent {

  @Input() hidden: boolean;
  sideNav;
  sampleObjectData: any[];
  assetNames: Array<any>;
  fieldNames: Array<any>;
  regions: Array<any>;
  assetCount: number;
  categories;
  flag = true;
  result: any[];
  ASSETS = new Set<any>();
  FIELDS = new Set<any>();
  REGIONS = new Set<any>();
  filteredCategories = { 'assets': new Set(), 'fields': new Set() }

  constructor(private dataservice: DataService, private render: Renderer, private router: Router) {
    this.sideNav = document.getElementsByClassName('sidenav')
    this.categories = ["Currently Working at Shell", "FieldName"]
  }

  ngOnInit(): void {  }


  getStyle(list){
      let styles = {
            'height':  list!=undefined && list.length>5 ? '210px' : '100%',     
            'width': list!=undefined && list.length>5 ? '95%'   : 'normal',  
            'overflow-y':list!=undefined && list.length>5? 'scroll':'hidden'
        };
      return styles;
  }

  getData() {
    this.dataservice.getResultData().subscribe((data) => {
      if(data.Data_Type === "HR_Data") {
        this.sampleObjectData = data.Result;
        this.getAllCategories();
        this.sortData(this.sampleObjectData);
      }
    })
  }

  getAllCategories() {
    this.sampleObjectData.map(data => {
      this.ASSETS.add(data['Currently Working at Shell']);
      this.FIELDS.add(data.Roles[0]);
      // this.REGIONS.add(data.Region);
    })
    this.filteredCategories.assets = this.ASSETS;
    this.filteredCategories.fields = this.FIELDS;
    // this.filteredCategories.regions = this.REGIONS;
    // console.log('Filtered Categories',this.filteredCategories);
  }

  getLength(category) {
    if (category == "assets") return this.ASSETS.size;
    if (category == 'fields') return this.FIELDS.size;
    // if (category == 'regions') return this.REGIONS.size;
  }

  getSet(category) {
    if (category == 'assets') return this.ASSETS;
    if (category == 'fields') return this.FIELDS;
    // if (category == 'regions') return this.REGIONS;
  }


  sortData(sampleData) {
    let assetNames = new Set()
    let fieldNames = new Set()
    // let regions = new Set()
    sampleData.map(obj => {
      assetNames.add(obj['Currently Working at Shell']);
      fieldNames.add(obj.Roles[0]);
      // regions.add(obj.Region);
    })

    this.assetNames = Array.from(assetNames);
    this.assetNames = this.assetNames.map((el) => {
      return { name: el, count: this.countValues(this.categories[0], el) }
    })

    this.fieldNames = Array.from(fieldNames)
    this.fieldNames = this.fieldNames.map((el) => {
      return { name: el, count: this.countValues("Roles", el) }
    })

    // this.regions = Array.from(regions)
    // this.regions = this.regions.map((el) => {
    //   return { name: el, count: this.countValues(this.categories[2], el) }
    // })
  }

  countValues(key: string, value: string) {
    let count = 0;
    if(key !== "Roles")
      this.sampleObjectData.map(el => { return el[key] === value ? count++ : count })
    else
      this.sampleObjectData.map(el => { return el.Roles[0] === value ? count++ : count })
    return count;
  }

  clicked(event, category) {
    let value = event.target.value;
    if (event.target.checked) {
      if (this.filteredCategories['' + category].size == this.getLength(category)) {
        this.filteredCategories['' + category] = new Set();
      }
      this.filteredCategories['' + category].add(value);
    }
    else {
      this.filteredCategories['' + category].delete(value);
      if (this.filteredCategories['' + category].size == 0) {
        this.filteredCategories['' + category] = this.getSet(category);
      }
    }
    this.filterResultData(this.filteredCategories);
  }

  filterResultData(filteredCategories) {
    this.result = this.sampleObjectData.map((row) => {
      if (filteredCategories['assets'].has(row['Currently Working at Shell']) &&
        filteredCategories['fields'].has(row.Roles[0])) {
        row.selected = true
        return row;
      }
      else {
        row.selected = false
        return row;
      }
    })
    function isValid(obj) { return (obj.selected || obj.selected == undefined) };

    let answer = this.result.filter(isValid);

    if (this.filteredCategories['assets'].size == 0 && this.filteredCategories['fields'].size == 0 ) {
      this.reset();
    } else {
      console.log("answer",answer);
      this.dataservice.dataComm(answer);
    }
  }

  reset() {
    this.result=this.sampleObjectData;
    this.filteredCategories = { 'assets': new Set(), 'fields': new Set()};
    this.dataservice.dataComm(this.result);
    this.getData();
  }
}
