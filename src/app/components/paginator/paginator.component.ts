import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit, OnChanges {

  totalPagesArray: number[] = [];

  disableLeftButton: boolean = true;
  disableRightButton: boolean = false;
  
  
  totalOfRecordsForPaginator:number = 0;
  startRecordsFrom: number = 0;
  
  currentPage: number = 0;
  totalPageLen: number = 0;


  
  @Output() sendPaginator = new EventEmitter();
  @Input() totalRecords: number = 0;
  @Input() recordsPerPage: number = 0;
  

  constructor() { }

  ngOnInit(): void {
    this.configPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // changes.prop contains the old and the new value...
    if(!changes['totalRecords'].firstChange){
      this.configPaginator();
      if(this.currentPage == this.totalPageLen){
        this.changePage(-1);
      }
      if(this.currentPage == (this.totalPageLen - 1)){
        this.disableRightButton = true;
      }
    }
  }

  /*Sistema de paginado*/
  configPaginator(){
    this.totalPageLen = 0;
    this.totalOfRecordsForPaginator = 0;
    this.totalPagesArray = [];
    //Determina las paginas que se demostraran a partir del total de usuarios
    for(var i = 0; this.totalOfRecordsForPaginator < this.totalRecords; i++){
      this.totalPagesArray[i] = i+1;
      this.totalPageLen++;
      this.totalOfRecordsForPaginator += this.recordsPerPage;
    }
  }

  changePage(num: number){
    this.currentPage = this.currentPage + num;
    this.startRecordsFrom = this.currentPage * this.recordsPerPage;
    if(this.currentPage <= 0){
      this.disableLeftButton = true;
    }else{
      this.disableLeftButton = false;
    }
    if((this.startRecordsFrom + this.recordsPerPage) >= this.totalRecords){
      this.disableRightButton = true;
    }else{
      this.disableRightButton = false;
    }
    this.emitStartRecordsFrom();
  }

  goToPage(page: number){
    this.currentPage = page - 1;
    this.startRecordsFrom = this.currentPage * this.recordsPerPage;
    if(this.currentPage <= 0){
      this.disableLeftButton = true;
    }else{
      this.disableLeftButton = false;
    }
    if((this.startRecordsFrom + this.recordsPerPage) >= this.totalRecords){
      this.disableRightButton = true;
    }else{
      this.disableRightButton = false;
    }
    this.emitStartRecordsFrom();
  }

  emitStartRecordsFrom(){
    //this.sendPaginator.emit(this.startRecordsFrom); //emit the skip records or in other words where the records will start
    this.sendPaginator.emit(this.currentPage); //Uncomment this if you need to emit page
  }

  calculatePageToShow(page: number){
    if(this.currentPage < 3){
      return ((page-1) == 0)
      ||((page-1) == 1)||
      ((page-1) == 2)||
      ((page-1) == 3)||
      ((page-1) == 4);
    }else if(this.currentPage > (this.totalPageLen - 3)){
      return ((page-1) == this.totalPageLen - 1)
      ||((page-1) == this.totalPageLen - 2)||
      ((page-1) == this.totalPageLen - 3)||
      ((page-1) == this.totalPageLen - 4)||
      ((page-1) == this.totalPageLen - 5);
    }else{
      return ((page-1) == this.currentPage-2)
      ||((page-1) == this.currentPage-1)||
      ((page-1) == this.currentPage)||
      ((page-1) == this.currentPage+1)||
      ((page-1) == this.currentPage+2);
    }
  }
}