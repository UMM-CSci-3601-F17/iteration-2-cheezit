import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    DisableButton: boolean = false;

  constructor() {
  }

  @Input() card: Card;

  @Input() selected?: number[] = [];

  ngOnInit() {
  }

  hitUpvote(): number {
      this.card.likes += 1;
      this.DisableButton = true;
      console.log(this.card.likes);
      return this.card.likes;
  }

}
