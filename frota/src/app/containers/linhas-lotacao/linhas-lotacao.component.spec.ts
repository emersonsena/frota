import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './linhas-lotacao.component';

describe('LinhasLotacaoComponent', () => {
  let component: LinhasLotacaoComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasLotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
