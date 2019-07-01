import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {LinhasOnibusService} from './linhas-onibus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-linhas-onibus',
  templateUrl: './linhas-onibus.component.html',
  styleUrls: ['./linhas-onibus.component.css']
})
export class LinhasOnibusComponent implements OnInit,AfterViewInit {
   displayedColumns: string[] = ['id', 'codigo', 'nome','acoes'];
   dataSource: MatTableDataSource<any>;
   resultsLength = 0;
   isLoadingResults = true;
   isRateLimitReached = false;

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

   constructor(
     private linhasOnibusService:LinhasOnibusService,
    private router: Router,

   ) {}


   ngOnInit() {
   this.dataSource = new MatTableDataSource();
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  //this.isLoadingResults = true;
 }

   ngAfterViewInit() {

     this.linhasOnibusService!.getLinhasOnibus().subscribe(data => {

       this.dataSource.data = data;
       this.isLoadingResults = false;


     }),catchError(() => {
           this.isLoadingResults = false;
           // Catch if the  API has reached its rate limit. Return empty data.
           this.isRateLimitReached = true;
           return observableOf([]);
         })

   }

   applyFilter(filterValue: string) {
       this.dataSource.filter = filterValue.trim().toLowerCase();

       if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
       }
      }

   consultaItinerario(row){

     this.router.navigate(['/itinerario',row.id]);

     //  this.linhasOnibusService!.getItinerario(row.id).subscribe(data => {
     //
     //    console.log("data",data);
     //
     //   const href = `https://www.google.com/maps/?q=${data[0].lat},${data[0].lng}`
     //    window.open(href);
     //     this.isLoadingResults = false;
     //  // this.exampleDatabase!.linkGoogleMaps(data[0].lat,data[0].lng);
     //
     //
     // }),catchError(() => {
     //      this.isLoadingResults = false;
     //    //   Catch if the GitHub API has reached its rate limit. Return empty data.
     //      this.isRateLimitReached = true;
     //       return observableOf([]);
     //     })

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

 // export interface DataPoaApi {
 //   items: Linhas[];
 //   //total_count: number;
 // }
 //
 // export interface Linhas {
 //   id: string;
 //   codigo: string;
 //   nome: string;
 //
 // }

 /** An example database that the data source uses to retrieve data for the table. */
 // export class ExampleHttpDatabase {
 //   constructor(private httpClient: HttpClient) {
 //     // this._httpClient.get('http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o').subscribe(data=>{
 //     //   console.log("data", data);
 //     // })
 //   }

   // getLinhasOnibus(): Observable<any> {
   //   const href = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o';
   //   return this.httpClient.get<Array<Linhas>>(href);
   //
   //
   // }



    // getItinerário(id){
    //   const href = `http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${id}`;
    //   return this.httpClient.get<any>(href);
    //
    // }



     // linkGoogleMaps(lat,long): any{
     //   console.log("link", lat, long);
     //   const href = `https://www.google.com/maps/?q=${lat},${long}`;
     //   return this.httpClient.post<any>(href);
     //
     // }






  //  getRepoIssues(sort: string, order: string, page: number): Observable<DataPoaApi> {
  //    const href = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o';
  //      // const requestUrl =
  //      //     `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
  // //   const requestUrl =
  //       // `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
  //
  //    return this._httpClient.get<DataPoaApi>(href);
  //  }


//}
