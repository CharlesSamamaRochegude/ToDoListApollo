import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getBaseUrl } from '../../main';

import { CreateurListeComponent } from './createur-liste.component';

describe('CreateurListeComponent', () => {
  let component: CreateurListeComponent;
  let fixture: ComponentFixture<CreateurListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateurListeComponent],
      imports: [HttpClientModule]
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
class MainStub {

}
