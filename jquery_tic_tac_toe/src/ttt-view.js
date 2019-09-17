class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click","li", (ev => {
      const $box = $(ev.currentTarget);
      this.makeMove($box);
    }));
  }

  makeMove($box) {
    let pos = $box.data('position');
    const currentPl = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("This " + e.msg);
      return;
    }

    $box.addClass(currentPl);

    if(this.game.isOver()){
      this.$el.off("click");
      this.$el.addClass("game-over");
    
      const winner = this.game.winner();
      const $figcap = $("<figcaption>");
      
      if (winner){
        this.$el.addClass(`winner-${winner}`);
        $figcap.html(`Winner winner, chicken dinner!!! <br> ${winner} wins the game!!!`);
      }else {
        $figcap.html('Its a tie!!! <br> you both suck');
      }
      this.$el.append($figcap);
    }
  }

  setupBoard() {  
    let $ul = $("<ul>");

    for(let row = 0; row < 3;row++){
      for (let col = 0; col < 3; col++) {
        let $li = $("<li>");
        $li.data( { position: [row, col] } );
        $ul.append($li);
      }
    }
    return this.$el.append($ul);
  }
}

module.exports = View;
