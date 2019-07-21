$(document).ready(() => {
  const cards = document.querySelectorAll(".memory-card");
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let trys = 8;
  $("#lives").html(trys);

  //this function contols the card flips
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }
    secondCard = this;
    checkForMatch();
  }

  //this checks the dataset of each card flipped and returns true or false
  function checkForMatch() {
    let isMatch = firstCard.dataset.framwork === secondCard.dataset.framwork;
    isMatch ? disableCards() : unflipCards();
    liveAgain(isMatch);
  }

  //if lives equal 0 then the game resets
  function liveAgain(isMatch) {
    if (!isMatch) {
      trys--;
    }
    $("#lives").html(trys);
    if (trys === 0) {
      $("#livesp").text("You Lose!");
      $("#livesWrapper").append(
        "<br><button enabled class='play-again'>Play again?</button>"
      );
    }
    $(".play-again").on("click", function() {
      location.reload(true);
    });
  }
  //this disables the card once a match has been found
  let win = 0;
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    console.log(cards);
    win++;

    resetBoard();
    console.log(win);
    if (win === 9) {
      $("#livesp").text("You Win!");
      $("#livesWrapper").append(
        "<br><button enabled class='play-again'>Play again?</button>"
      );
      start;
    }
    $(".play-again").on("click", function() {
      location.reload(true);
    });
  }

  //this flips the cards back if the selection is wrong
  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  } //this shuffles the deck each time turned off to make testing easier

  //   (function shuffle() {
  //     cards.forEach(card => {
  //       let randomPos = Math.floor(Math.random() * 12);
  //       card.style.order = randomPos;
  //     });
  //   })();
  cards.forEach(card => card.addEventListener("click", flipCard));
  //this function handles the timer
  function startTimer(duration, display) {
    let start = Date.now(),
      diff,
      minutes,
      seconds;
    function timer() {
      // get the number of seconds that have elapsed

      diff = duration - (((Date.now() - start) / 1000) | 0);
      // does the same job as parseInt truncates the float

      minutes = (diff / 60) | 0;
      seconds = diff % 60 | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      if (diff <= 0) {
        // this code adds an extra second to make the timer start at the full duration
        start = Date.now() + 1000;
      }
    }
    timer();
    setInterval(timer, 1000);
  }
  $("#startScreen").on("click", function() {
    $(".memory-game").css({ display: "flex" });
    $("#startButton").css({ display: "none" });
    $("#livesWrapper").css({ display: "flex" });

    var fiveMinutes = 60 * 0.02,
      display = document.querySelector("#display");
    startTimer(fiveMinutes, display);
  });
  //trying to tie a lose conditions to the timer

  if ($("#display") === "00:00") {
    alert("you lose");
  }
});
