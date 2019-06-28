import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-linhas-onibus',
  templateUrl: './linhas-onibus.component.html',
  styleUrls: ['./linhas-onibus.component.css']
})
export class LinhasOnibusComponent implements OnInit,AfterViewInit {
   displayedColumns: string[] = ['id', 'codigo', 'nome'];
   exampleDatabase: ExampleHttpDatabase | null;
   dataSource: MatTableDataSource<any>;

   resultsLength = 0;
   isLoadingResults = true;
   isRateLimitReached = false;

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

   constructor(private httpClient: HttpClient) {}


   ngOnInit() {
   this.dataSource = new MatTableDataSource();
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  //this.isLoadingResults = true;
 }

   ngAfterViewInit() {

     this.exampleDatabase = new ExampleHttpDatabase(this.httpClient);

     // If the user changes the sort order, reset back to the first page.
     //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

     this.exampleDatabase!.getRepoIssues().subscribe(data => {

        this.dataSource.data = data;
       this.isLoadingResults = false;
       console.log("dadasdasd",data);


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
 }

 // export interface GithubApi {
 //   items: GithubIssue[];
 //   total_count: number;
 // }
 //
 // export interface GithubIssue {
 //   created_at: string;
 //   number: string;
 //   state: string;
 //   title: string;
 // }

 export interface DataPoaApi {
   items: Linhas[];
   //total_count: number;
 }

 export interface Linhas {
   id: string;
   codigo: string;
   nome: string;

 }

 /** An example database that the data source uses to retrieve data for the table. */
 export class ExampleHttpDatabase {
   constructor(private httpClient: HttpClient) {
     // this._httpClient.get('http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o').subscribe(data=>{
     //   console.log("data", data);
     // })
   }

   getRepoIssues(): Observable<any> {
     const href = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o';
     return this.httpClient.get<Array<Linhas>>(href);


   }

  //  getRepoIssues(sort: string, order: string, page: number): Observable<DataPoaApi> {
  //    const href = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o';
  //      // const requestUrl =
  //      //     `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
  // //   const requestUrl =
  //       // `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
  //
  //    return this._httpClient.get<DataPoaApi>(href);
  //  }


}
