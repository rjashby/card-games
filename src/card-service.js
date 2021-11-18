export default class CardService {
  static async getCards(deckSize = "1") {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckSize}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch(error) {
      return error.message;
    }
  }

  static async drawCard(deckId, num) {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`);
      if (!response.ok) { 
        throw Error(response.statusText);
      }
      return await response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async shuffleDeck(deckId) {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json().shuffled;
    } catch(error) {
      return error.message;
    }
  }
}