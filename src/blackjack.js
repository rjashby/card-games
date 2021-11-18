import CardService from "./card-service";
export default class Blackjack {
  constructor(deckId) {   
    this.deckId = deckId;
    this.chips = 100;
  }

  static build() {
    return CardService.getCards(6).then(function(response) {
      return new Blackjack(response.deck_id);
    });
  }

  async deal() {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameOver = false;
    this.winner = "";
    this.playerHand = [];
    this.dealerHand = [];
    this.currentBet = 0;
    await this.drawCard(this.playerHand);
    await this.drawCard(this.dealerHand);
    await this.drawCard(this.playerHand);
    return await this.drawCard(this.dealerHand);
  }

  async drawCard(hand) {
    let response = CardService.drawCard(this.deckId, 1);
    return await response.then(async (serverResponse) => {
      hand.push(serverResponse.cards[0]);
      if (parseInt(response.remaining) < 15) {
        await CardService.shuffleDeck(this.deckId);
      }
      this.updateScores();
    });
  }

  updateScores() {
    //Player score
    let scoreSum = 0;
    let aces = 0;
    this.playerHand.forEach(function(card) {
      let cardValue = 0;
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
      for (let i = 0; i < aces; i++) {
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
      let cardValue = 0;
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
      for (let i = 0; i < aces; i++) {
        if (scoreSum > 10) {
          scoreSum += 1;
        } else {
          scoreSum += 11;
        }
      }      
    }
    this.dealerScore = scoreSum;
  }  

  async playerHits() {
    if (!this.gameOver) {
      return this.drawCard(this.playerHand)
        .then(() => {
          if (this.playerScore > 21) {
            this.gameOver = true;
            this.winner = "dealer";
          }        
        });
    }
  }

  async playerStands() {
    while (this.dealerScore < 17) {
      await this.drawCard(this.dealerHand);
    }
    return new Promise((resolve) => {
      this.gameOver = true;
      if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
        this.winner = "player";
        if (this.playerScore === 21 && this.playerHand.length === 2) {
          this.chips += this.currentBet * 2.5;
        } else {
          this.chips += this.currentBet * 2;
        }
      } else if (this.playerScore < this.dealerScore) {
        this.winner = "dealer";
      } else {
        this.winner = "push";
        this.chips += this.currentBet;
      }
      resolve();
    });
  }

  async doubleDown() {
    this.initialBet(this.currentBet);
    await this.playerHits();
    if (!this.gameOver) {
      await this.playerStands();
    }
  }

  initialBet(betAmount) {
    this.chips -= betAmount;
    this.currentBet += betAmount;
  }
}