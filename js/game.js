const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missHits = 0;

function round() {
  //$(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(`${hits+1}`);
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").hide();
  $(".game-field").removeClass("target");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#difference-hits-miss").text(hits-missHits);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".game-field").text("");
    $(event.target).removeClass("target");
    round();
  }
  else {
    $(event.target).addClass("miss");
    missHits++;
  }
}

function reloadGame() {
  $("#win-message").addClass("d-none");
  hits = 0;
  firstHitTime = 0;
  missHits = 0;
  $(".game-field").text("");
  $(".game-field").show();
  firstHitTime = getTimestamp();
  round();
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-reload").click(reloadGame);
}

$(document).ready(init);
