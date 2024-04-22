import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteItemListComponent } from './favourite-item-list.component';

describe('FavouriteItemListComponent', () => {
  let component: FavouriteItemListComponent;
  let fixture: ComponentFixture<FavouriteItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
