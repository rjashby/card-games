import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Blackjack from './blackjack.js';

let blackjack1 = new Blackjack();
showHands();

$('#playerHit').click(function() {
  blackjack1.playerHits();
  showHands();
});

$('#playerStand').click(function() {
  blackjack1.playerStands();
  showHands();  
});

function showHands() {
  // console.log(blackjack1);
  $('#playerHand').html(blackjack1.playerHand);
  $('#dealerHand').html(blackjack1.dealerHand);
  $('#output').html(blackjack1.winner);
  $('#playerScore').html(blackjack1.playerScore);
  $('#dealerScore').html(blackjack1.dealerScore);
}

