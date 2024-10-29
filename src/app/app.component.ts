import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './models/card';
import { deck } from './deck';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Colour Memory';
  shuffledDeck: Card[] = [];
  selectedCards: Card[] = [];
  points = 0;
  disableCardSelection = false;

  ngOnInit(): void {
    this.shuffledDeck = this.fisherYatesShuffle(deck);
  }

  //Select a card
  selectCard(card: Card) {
    console.log(card);
    if (!this.disableCardSelection) {
      card.isRevealed = true;
      this.selectedCards.push(card);
    }
    if (this.selectedCards.length === 2) {
      this.checkMatch();
    }
  }

  //Check if the cards are either matching or not
  checkMatch() {
    let [card1, card2] = this.selectedCards;
    this.disableCardSelection = true;

    setTimeout(() => {
      if (card1.colour === card2.colour) {
        this.points += 1;
        this.shuffledDeck = this.shuffledDeck.filter(
          (card) => card.id !== card1.id && card.id !== card2.id
        );
      } else {
        this.points -= 1;
      }
      card1.isRevealed = false;
      card2.isRevealed = false;
      this.selectedCards = [];
      this.disableCardSelection = false;
    }, 2000);
  }
  //Sort a new deck to be able to play again
  playAgain() {
    this.shuffledDeck = this.fisherYatesShuffle(deck);
    this.points = 0;
  }
  // Sorting algorithm to sort the deck
  fisherYatesShuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
}
