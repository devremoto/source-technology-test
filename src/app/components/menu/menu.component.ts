import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: Category[] = [
    { description: 'Top Games', name: 'top', group: 'top' },
    { description: 'New Games', name: 'new', group: 'new' },
    { description: 'Slots', name: 'slots', group: 'slots' },
    { description: 'Jackpots', name: 'jackpots', group: 'jackpots' },
    { description: 'Live', name: 'live', group: 'live' },
    { description: 'Blackjack', name: 'blackjack', group: 'blackjack' },
    { description: 'Roullete', name: 'roulette', group: 'roulette' },
    { description: 'Table', name: 'table', group: 'table' },
    { description: 'Pocker', name: 'poker', group: 'poker' },
    { description: 'Other', name: 'fun', group: 'other' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
