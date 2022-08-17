import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EnterModel } from '../../models/enter.model';
import { EnterService } from '../../services/enter.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankyouComponent implements OnInit {
  enterData: EnterModel | undefined;
  displayNames = {
    name: "Name",
    username: "Username",
    country: "Country",
    postCode: "Post Code",
    favouriteMovie: "Favourite Movie"
  };

  constructor(private enterService: EnterService) { }

  ngOnInit(): void {
    this.enterData = this.enterService.data;
  }

  keepOrder(item1: KeyValue<keyof EnterModel, string>, item2: KeyValue<keyof EnterModel, string>): number {
    return Number(item1.key);
  }
}