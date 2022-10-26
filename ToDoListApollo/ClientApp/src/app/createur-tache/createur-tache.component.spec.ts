import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateurTacheComponent } from './createur-tache.component';

describe('CreateurTacheComponent', () => {
  let component: CreateurTacheComponent;
  let fixture: ComponentFixture<CreateurTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateurTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateurTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
