
import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {LinhasLotacaoService} from './linhas-lotacao.service';

@Component({
  selector: 'app-linhas-lotacao',
  templateUrl: './linhas-lotacao.component.html',
  styleUrls: ['./linhas-lotacao.component.css']
})
export class LinhasLotacaoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'codigo', 'nome','acoes'];
 // exampleDatabase: ExampleHttpDatabase | null;
  dataSource: MatTableDataSource<any>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private linhasLotacaoService:LinhasLotacaoService
   // private httpClient: HttpClient
  ) {}


  ngOnInit() {
  this.dataSource = new MatTableDataSource();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
 //this.isLoadingResults = true;
}

  ngAfterViewInit() {

 //   this.exampleDatabase = new ExampleHttpDatabase(this.httpClient);

    // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.linhasLotacaoService!.getLinhasLotacao().subscribe(data => {

       this.dataSource.data = data;
      this.isLoadingResults = false;


    }),catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })



    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.exampleDatabase!.getRepoIssues(
    //         this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.total_count;
    //
    //       return data.items;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => this.data = data);
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
     }

  consultaItinerario(row){

     this.linhasLotacaoService!.getItinerario(row.id).subscribe(data => {

      //  this.dataSource.data = data;

     // console.log("dadasdasd",data[0]);
      //https://www.google.com/maps/?q=LATITUDE,LONGITUDE

      const href = `https://www.google.com/maps/?q=${data[0].lat},${data[0].lng}`
       window.open(href);
        this.isLoadingResults = false;
     // this.exampleDatabase!.linkGoogleMaps(data[0].lat,data[0].lng);


    }),catchError(() => {
         this.isLoadingResults = false;
       //   Catch if the GitHub API has reached its rate limit. Return empty data.
         this.isRateLimitReached = true;
          return observableOf([]);
        })

  }
}
