import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFiltroReceitasComponent } from './modal-filtro-receitas.component';

describe('ModalFiltroReceitasComponent', () => {
  let component: ModalFiltroReceitasComponent;
  let fixture: ComponentFixture<ModalFiltroReceitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltroReceitasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFiltroReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
