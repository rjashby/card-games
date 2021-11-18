let data;

export default class CardService {
  constructor() {
    this.deckId;
  }

  static async getCards(deckSize = "1") {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckSize}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      data = await response.json();
      // console.log(data);
      data = data.deck_id;
    } catch(error) {
      return error.message;
    }
  }

  static async drawCard(num) {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${data}/draw/?count=${num}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async shuffleDeck() {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${data}/shuffle/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json().shuffled;
    } catch(error) {
      return error.message;
    }
  }
}