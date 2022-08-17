import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnterModel } from 'src/app/models/enter.model';

import { EnterComponent } from './enter.component';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
      ],
      declarations: [EnterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly pass entered data', () => {
    const submitButton = fixture.nativeElement.querySelector('button.btn-primary');
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#enter-name');
    const usernameInput: HTMLInputElement = fixture.nativeElement.querySelector('#enter-username');
    const countrySelect: HTMLSelectElement = fixture.nativeElement.querySelector('#enter-country');
    const postCodeInput: HTMLInputElement = fixture.nativeElement.querySelector('#enter-postCode');
    const favouriteMovieInput: HTMLInputElement = fixture.nativeElement.querySelector('#enter-favouriteMovie');
    fixture.detectChanges();

    nameInput.value = "aabb";
    usernameInput.value = "aa@bb";
    countrySelect.value = countrySelect.options[1].value;
    postCodeInput.value = "aabbcc";
    favouriteMovieInput.value = "aabb";

    nameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('input'));
    countrySelect.dispatchEvent(new Event('change'));
    postCodeInput.dispatchEvent(new Event('input'));
    favouriteMovieInput.dispatchEvent(new Event('input'));

    const enteredData: EnterModel = {
      name: fixture.nativeElement.querySelector('#enter-name').value,
      username: fixture.nativeElement.querySelector('#enter-username').value,
      country: fixture.nativeElement.querySelector('#enter-country').value,
      postCode: fixture.nativeElement.querySelector('#enter-postCode').value,
      favouriteMovie: fixture.nativeElement.querySelector('#enter-favouriteMovie').value
    };

    submitButton.click();
    fixture.detectChanges();

    expect(component.submitted).toBe(true);
    expect(component.formData.status).toBe('VALID');
    fixture.whenStable().then(() => {
      expect(component.enterService.data).toEqual(enteredData);
    });
  });
});
