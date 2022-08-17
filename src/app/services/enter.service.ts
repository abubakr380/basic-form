import { Injectable } from '@angular/core';
import { EnterModel } from '../models/enter.model';

@Injectable({
  providedIn: 'root'
})
export class EnterService {
  data!: EnterModel;

  constructor() {
    this.data = {
      name: "",
      username: "",
      country: "Ireland",
      postCode: "",
      favouriteMovie: ""
    }
  }
}