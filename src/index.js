import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Blackjack from './blackjack.js';
import CardBack from './assets/images/dealer-card.jpg';
import Table from "./assets/images/table.jpg";

$(".container").prepend(`<img src='${Table}'>`);

let blackjack1;
getBlackjack();

$('#bet1').click(async function() {
  await blackjack1.deal();
  $("#betButtons").hide();
  blackjack1.initialBet(1);
  showHands();
  $("html, body").animate({
    scrollTop: $(
      'html, body').get(0).scrollHeight
  }, 10);
});

$('#bet5').click(async function() {
  await blackjack1.deal();
  $("#betButtons").hide();
  blackjack1.initialBet(5);
  $("html, body").animate({
    scrollTop: $(
      'html, body').get(0).scrollHeight
  }, 10);
  showHands();
});

$('#bet10').click(async function() {
  await blackjack1.deal();
  $("#betButtons").hide();
  blackjack1.initialBet(10);
  $("html, body").animate({
    scrollTop: $(
      'html, body').get(0).scrollHeight
  }, 10);
  showHands();
});

$("#newGame").click(function(){
  location.reload();
});  

$('#playerHit').click(function() {
  blackjack1.playerHits().then(() => {
    showHands();
  });
});

$('#doubleDown').click(function() {
  blackjack1.doubleDown().then(() => {
    showHands();
  });
});

$('#playerStand').click(function() {
  blackjack1.playerStands().then(() => {
    showHands();
  });
});

function showHands() {
  let playerHandStr = "";
  blackjack1.playerHand.forEach((card) => {
    playerHandStr = playerHandStr.concat(`<img class='cardImg' src="${card.image}">`);
  });
  $('#playerHand').html(playerHandStr);
  let dealerHandStr = "";
  for (let i = 0; i < blackjack1.dealerHand.length; i++) {
    if (blackjack1.gameOver === false && i === 0) {
      dealerHandStr += `<img class='cardImg' src='${CardBack}'>`;
    } else {
      dealerHandStr = dealerHandStr.concat(`<img class='cardImg' src="${blackjack1.dealerHand[i].image}">`);
    }
  }
  if (blackjack1.gameOver) {
    $('#betButtons').show();
    $('#playButtons').hide();
  } else {
    $('#playButtons').show();
    $('#betButtons').hide();
  }
  if (blackjack1.playerHand.length == 2 && (blackjack1.playerScore >= 9 && blackjack1.playerScore <= 11)) {
    $('#doubleDown').prop("disabled", false);
  } else {
    $('#doubleDown').prop("disabled", true);
  }
  $('#dealerHand').html(dealerHandStr);
  $('#output').html("Winner: " + blackjack1.winner);
  $('#bet').html(blackjack1.currentBet);
  $('#chipCount').html(blackjack1.chips);
}

async function getBlackjack() {
  let blackjackPromise = Blackjack.build();
  let newBlackjack;
  await blackjackPromise.then(function(blackjackObj) {
    newBlackjack = blackjackObj;
  });
  return newBlackjack.deal().then(() => {    
    blackjack1 = newBlackjack;
  });
}