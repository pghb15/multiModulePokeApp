import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerriesPageComponent } from './berries-page.component';

describe('BerriesPageComponent', () => {
  let component: BerriesPageComponent;
  let fixture: ComponentFixture<BerriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerriesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BerriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
