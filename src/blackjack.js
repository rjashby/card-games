import CardService from "./card-service";
export default class Blackjack {
  constructor() {
    this.deckId = CardService.getCards(6);
    this.deal();
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameOver = false;
    this.winner = "";
  }

  deal() {
    this.playerHand = [];
    this.dealerHand = [];
    this.drawCard(playerHand);
    this.drawCard(dealerHand);
    this.drawCard(playerHand);
    this.drawCard(dealerHand);
  }

  drawCard(hand) {
    let response = CardService.drawCard(this.deckId, 1);
    hand.push(response.cards[0]);
    if (parseInt(response.remaining) < 15) {
      CardService.shuffleDeck(this.deckId);
    }
    this.updateScores();
  }

  updateScores() {
    //Player score
    let scoreSum = 0;
    let aces = 0;
    this.playerHand.forEach(function(card) {
      let cardValue;
      switch (card.value) {
        case 'KING':
        case 'QUEEN':
        case 'JACK':
        case '10':
          cardValue = 10;
          break;
        case '9':
        case '8':
        case '7':
        case '6':
        case '5':
        case '4':
        case '3':
        case '2':
          cardValue = parseInt(card.value);
          break;
        case 'ACE':
          aces++;
          break;
      }
      scoreSum += cardValue;
    });
    if (aces > 0) {
      for (let i = 0; i <= aces; i++) {
        if (scoreSum > 10) {
          scoreSum += 1;
        } else {
          scoreSum += 11;
        }
      }      
    }
    this.playerScore = scoreSum;
    //Dealer score
    scoreSum = 0;
    aces = 0;
    this.dealerHand.forEach(function(card) {
      let cardValue;
      switch (card.value) {
        case 'KING':
        case 'QUEEN':
        case 'JACK':
        case '10':
          cardValue = 10;
          break;
        case '9':
        case '8':
        case '7':
        case '6':
        case '5':
        case '4':
        case '3':
        case '2':
          cardValue = parseInt(card.value);
          break;
        case 'ACE':
          aces++;
          break;
      }
      scoreSum += cardValue;
    });
    if (aces > 0) {
      for (let i = 0; i <= aces; i++) {
        if (scoreSum > 10) {
          scoreSum += 1;
        } else {
          scoreSum += 11;
        }
      }      
    }
    this.dealerScore = scoreSum;
  }  

  playerHits() {
    this.drawCard(this.playerHand);    
    if (this.playerScore > 21) {
      this.gameOver = true;
      this.winner = "dealer";
    }
  }

  playerStands() {
    while (this.dealerScore < 17) {
      this.drawCard(this.dealerHand);
    }
    this.gameOver = true;
    if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
      this.winner = "player";
    } else if (this.playerScore < this.dealerScore) {
      this.winner = "dealer";
    } else {
      this.winner = "push";
    }
  }
}