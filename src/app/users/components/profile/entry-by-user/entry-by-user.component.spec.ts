import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryByUserComponent } from './entry-by-user.component';

describe('EntryByUserComponent', () => {
  let component: EntryByUserComponent;
  let fixture: ComponentFixture<EntryByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryByUserComponent]
    });
    fixture = TestBed.createComponent(EntryByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
