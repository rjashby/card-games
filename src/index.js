import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Blackjack from './blackjack.js';
import CardBack from './assets/images/dealer-card.jpg';

let blackjack1;
getBlackjack();

$("#newGame").click(function(){
  location.reload();
});  

$('#playerHit').click(function() {
  blackjack1.playerHits().then(() => {
    showHands();
  });
});

$('#playerStand').click(function() {
  blackjack1.playerStands().then(() => {
    showHands();
  });
});

//<img src="/src/assets/images/dealer-card.jpg"></img>

function showHands() {
  let playerHandStr = "";
  blackjack1.playerHand.forEach((card) => {
    playerHandStr = playerHandStr.concat(`<img src="${card.image}">`);
  });
  $('#playerHand').html(playerHandStr);
  let dealerHandStr = "";
  for (let i = 0; i < blackjack1.dealerHand.length; i++) {
    if (blackjack1.gameOver === false && i === 0) {
      dealerHandStr += `<img src='${CardBack}'>`;
    } else {
      dealerHandStr = dealerHandStr.concat(`<img src="${blackjack1.dealerHand[i].image}">`);
    }
  }
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
  blackjack1.deal().then(() => {
    blackjack1.updateScores();
    showHands();
  });
}
