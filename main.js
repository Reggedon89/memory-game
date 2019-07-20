$(document).ready(() => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach(card => (card.win = false));
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
});
