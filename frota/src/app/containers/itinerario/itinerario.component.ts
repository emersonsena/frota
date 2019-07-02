import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {ItinerarioService} from './itinerario.service';
import { ActivatedRoute } from '@angular/router';
// import {Itinerario} from '../../core/models/itinerario.model';


@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.css']
})
export class ItinerarioComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = [ 'lat', 'lng','acoes'];
  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  idLinha:string;
  codigo:string;
  nome:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private itinerarioService:ItinerarioService,
              private route: ActivatedRoute,
            )
              {

         this.recParametro();
           }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  recParametro(){
    this.route.params.subscribe(parametros =>{

      if (parametros['id']) {
         this.idLinha = parametros['id'];
      }

    });
  }
  ngAfterViewInit() {
    this.itinerario(this.idLinha);

  }

  itinerario(id){
    this.itinerarioService!.getItinerario(id).subscribe(data => {

    this.codigo = data.codigo;
    this.nome = data.nome;

    var array = Object.values(data);

    const objetos = array.filter(obj => {
      return  typeof(obj) === 'object';
    });

      this.dataSource.data = objetos;
      this.isLoadingResults = false;

    }),catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
  }

  irParaMaps(row){
     this.itinerarioService!.linkGoogleMaps(row.lat,row.lng);
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
     }
}
