import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Blackjack from './blackjack.js';

let blackjack1;
getBlackjack();

$('#playerHit').click(function() {
  blackjack1.playerHits().then(() => {
    showHands();
  });
});

$('#playerStand').click(function() {
  blackjack1.playerStands();
  showHands();  
});

function showHands() {
  // console.log(blackjack1);
  let playerHandStr = "";
  blackjack1.playerHand.forEach((card) => {
    playerHandStr = playerHandStr.concat(" " + card.value);
  });
  $('#playerHand').html(playerHandStr);
  let dealerHandStr = "";
  blackjack1.dealerHand.forEach((card) => {
    dealerHandStr = dealerHandStr.concat(" " + card.value);
  });
  $('#dealerHand').html(dealerHandStr);
  $('#output').html(blackjack1.winner);
  $('#playerScore').html(blackjack1.playerScore);
  $('#dealerScore').html(blackjack1.dealerScore);
}

async function getBlackjack() {
  let blackjackPromise = Blackjack.build();
  let newBlackjack;
  await blackjackPromise.then(function(blackjackObj) {
    newBlackjack = blackjackObj;
  });
  blackjack1 = newBlackjack;
  //Might not be entirely correct
  blackjack1.deal().then(() => {
    blackjack1.updateScores();
    showHands();
  });
}