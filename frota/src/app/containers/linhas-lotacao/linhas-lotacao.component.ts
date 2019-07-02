import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {LinhasLotacaoService} from './linhas-lotacao.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-linhas-lotacao',
  templateUrl: './linhas-lotacao.component.html',
  styleUrls: ['./linhas-lotacao.component.css']
})
export class LinhasLotacaoComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'codigo', 'nome','acoes'];
  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private linhasLotacaoService:LinhasLotacaoService,
    private router: Router,
  ) {}


  ngOnInit() {
  this.dataSource = new MatTableDataSource();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}

  ngAfterViewInit() {

    this.linhasLotacaoService!.getLinhasLotacao().subscribe(data => {
      this.dataSource.data = data;
      this.isLoadingResults = false;
    }),catchError(() => {
          this.isLoadingResults = false;
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
