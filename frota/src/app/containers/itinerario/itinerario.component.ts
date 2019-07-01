import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {ItinerarioService} from './itinerario.service';
import{Itinerario} from '../../core/models/itinerario.model';
//import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.css']
})
export class ItinerarioComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['lat', 'lng','acoes'];
  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  itinerarioId: string;
  codigo:string;
  idLinha: string;
  nome:string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(

   private itinerarioService:ItinerarioService,
   private route: ActivatedRoute,
   private router: Router,
   private itinerario:Itinerario

  ) {
    this.route.params.subscribe(params => {
     console.log("id ", params['id']) ;
     if (params['id']) {
     // do control for edit

       this.itinerarioId = params['id'];
     }

     });
  }


  ngOnInit() {

  this.dataSource = new MatTableDataSource();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.isLoadingResults = false;
}

  ngAfterViewInit() {



    this.itinerarioService!.getItinerario(this.itinerarioId).subscribe(data => {
    //  this.itinerario = data;
      console.log("data itinerario",data);
    
      // this.idLinha = data.idlinha;
      // this.codigo = data.codigo;
      // this.nome = data.nome;


    //  this.dataSource.data = data;
      this.isLoadingResults = false;


    }),catchError(() => {
          this.isLoadingResults = false;
          // Catch if the  API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        });

  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
     }

  posicaoMaps(row){

  //    this.linhasOnibusService!.getItinerario(row.id).subscribe(data => {
  //
  //      console.log("data",data);
  //
  //     const href = `https://www.google.com/maps/?q=${data[0].lat},${data[0].lng}`
  //      window.open(href);
  //       this.isLoadingResults = false;
  //    // this.exampleDatabase!.linkGoogleMaps(data[0].lat,data[0].lng);
  //
  //
  //   }),catchError(() => {
  //        this.isLoadingResults = false;
  //      //   Catch if the GitHub API has reached its rate limit. Return empty data.
  //        this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //
   }

}
