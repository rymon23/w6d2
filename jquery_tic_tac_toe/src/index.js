const View = require("./ttt-view");
const Game = require("./game");

  $(() => {
    const g = new Game();
    new View(g, $('.ttt'));
  });

