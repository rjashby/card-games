export default class CardService {
  static async getCards() {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.deck_id.json();
    } catch(error) {
      return error.message;
    }
  }

  static async drawCard(deckId, num) {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`);
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}