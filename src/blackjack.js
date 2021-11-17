import CardService from "./card-service";
export default class Blackjack {
  constructor() {
    this.deckId = CardService.getCards(6);
    this.deal();
  }

  deal() {
    this.playerHand = [];
    this.dealerHand = [];
    this.drawCard(playerHand);
    this.drawCard(playerHand);
    this.drawCard(dealerHand);
    this.drawCard(dealerHand);
  }

  drawCard(hand) {
    let response = CardService.drawCard(this.deckId, 1);
    hand.push(response.cards[0]);
    if (parseInt(response.remaining) < 15) {
      CardService.shuffleDeck(this.deckId);
    }
  }

  playerTurn(hit) {
    //TODO
  }

  dealerTurn() {
    //TODO
  }
}