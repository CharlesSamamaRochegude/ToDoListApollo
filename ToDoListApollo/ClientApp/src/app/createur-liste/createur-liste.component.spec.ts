import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateurListeComponent } from './createur-liste.component';

describe('CreateurListeComponent', () => {
  let component: CreateurListeComponent;
  let fixture: ComponentFixture<CreateurListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateurListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
