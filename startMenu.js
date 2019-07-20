$(document).ready(() => {
  $("#startScreen").on("click", function() {
    $(".memory-game").css({ display: "flex" });
    $("#startButton").css({ display: "none" });
    $("#livesWrapper").css({ display: "flex" });
  });
});
