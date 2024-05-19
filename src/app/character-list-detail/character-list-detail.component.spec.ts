import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListDetailComponent } from './character-list-detail.component';

describe('CharacterListDetailComponent', () => {
  let component: CharacterListDetailComponent;
  let fixture: ComponentFixture<CharacterListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
