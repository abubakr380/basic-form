import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';
import { EnterService } from '../../services/enter.service';
import { MoviesService } from '../../services/movies.service';
import { SearchResultModel } from '../../models/movies.model';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {
  formData!: FormGroup;
  submitted: boolean = false;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, public enterService: EnterService, private router: Router) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      username: ["", Validators.email],
      country: ["", Validators.required],
      postCode: [""],
      favouriteMovie: [""]
    });

    this.formData.get("country")?.valueChanges.subscribe((value: string) => {
      if (value === "Ireland") {
        this.formData.controls['postCode'].setValidators([Validators.minLength(6), Validators.maxLength(10)]);
      }
      else {
        this.formData.controls['postCode'].setValidators([Validators.required, Validators.pattern('^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$')]);
      }
      this.formData.get('postCode')?.updateValueAndValidity();
    });
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) =>
        this.moviesService.searchMovies(term).pipe(
          map(response => {
            let yearsDict: { [id: string]: SearchResultModel[] } = {};
            response.Search.forEach(movie => {
              if (!yearsDict[movie.Year]) {
                yearsDict[movie.Year] = [];
              }
              yearsDict[movie.Year].push(movie);
            });
            console.log(yearsDict);
            
            let keys = Object.keys(yearsDict).sort().reverse();
            let yearsArray: SearchResultModel[][] = [];
            for(let i in keys) {
              yearsArray[yearsArray.length] = yearsDict[keys[i]];
            }
            console.log(yearsArray);
            
            return response.Search.map(searchResult => searchResult.Title);
          }),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )
  }

  submitForm(): void {
    this.submitted = true;
    if (this.formData.status === 'VALID') {
      this.enterService.data = this.formData.value;
      this.router.navigateByUrl('thankyou');
    }
  }
}