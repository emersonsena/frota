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

   listaItinerario(row){
     this.router.navigate(['/itinerario',row.id]);
   }
 }
