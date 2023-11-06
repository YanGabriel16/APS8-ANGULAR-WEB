import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarLocalComponent } from './modal-adicionar-local.component';

describe('ModalAdicionarLocalComponent', () => {
  let component: ModalAdicionarLocalComponent;
  let fixture: ComponentFixture<ModalAdicionarLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdicionarLocalComponent]
    });
    fixture = TestBed.createComponent(ModalAdicionarLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
