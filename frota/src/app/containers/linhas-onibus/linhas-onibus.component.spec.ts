import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasOnibusComponent } from './linhas-onibus.component';

describe('LinhasOnibusComponent', () => {
  let component: LinhasOnibusComponent;
  let fixture: ComponentFixture<LinhasOnibusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasOnibusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasOnibusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
