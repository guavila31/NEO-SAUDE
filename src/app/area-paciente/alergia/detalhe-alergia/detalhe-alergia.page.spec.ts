import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheAlergiaPage } from './detalhe-alergia.page';

describe('DetalheAlergiaPage', () => {
  let component: DetalheAlergiaPage;
  let fixture: ComponentFixture<DetalheAlergiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalheAlergiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
