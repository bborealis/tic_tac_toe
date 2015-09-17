function Player(mark){
    this.mark = mark;
}

function Space(x_axis, y_axis){
    this.x_axis = x_axis;
    this.y_axis = y_axis;
}

function Game(p1, p2, board, turns){
    this.p1 = p1;
    this.p2 = p2;
    this.board = board;
    this.turns = 0;
}

function Board(){
    var empty = "";
    this.spaces = [ empty, empty, empty, empty, empty, empty, empty, empty, empty ];
}

Game.prototype.win = function(board, turns){
    var allTaken = false;
    var combos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    for (var i = 0; i < combos.length; i++){
        for(var j = 0; j < combos[i].length; j++){
            if((board.spaces[combos[i][j]] === board.spaces[combos[i][j+1]]) &&
                (board.spaces[combos[i][j+1]] === board.spaces[combos[i][j+2]])
                && (board.spaces[combos[i][j]] !== "")){
                return board.spaces[combos[i][j]];
            }else if((i === combos.length - 1 && j === combos[i].length - 1) && turns === 9){
                return "DRAW";
            }
        }
    }
}

Game.prototype.advanceTurns = function(){
    this.turns++;
    return this.turns;
}

Space.prototype.mark_by = function(player, board, game){
    this.player = player.mark;
    board.markedSquare(this);
    game.advanceTurns();
}

Space.prototype.markedBy = function(){
    return this.player;
}

Space.prototype.spaceCheck = function(x, y, player){
    if (this.markedBy() === player){
        return true;
    } else {return false;}
}

Board.prototype.markedSquare = function(space){
    var x = space.x_axis;
    var y = space.y_axis;
    if (x === 1) {
        if (y === 1 ) {
            this.spaces[0] = space.markedBy();
            return 0;
        } else if (y === 2){
            this.spaces[1] = space.markedBy();
            return 1;
        } else {
            this.spaces[2] = space.markedBy();
            return 2;
        }
    }
    if (x === 2) {
        if (y === 1 ) {
            this.spaces[3] = space.markedBy();
            return 3;
        } else if (y === 2){
            this.spaces[4] = space.markedBy();
            return 4;
        } else {
            this.spaces[5] = space.markedBy();
            return 5;
        }
    }
    if (x === 3) {
        if (y === 1 ) {
            this.spaces[6] = space.markedBy();
            return 6;
        } else if (y === 2){
            this.spaces[7] = space.markedBy();
            return 7;
        } else {
            this.spaces[8] = space.markedBy();
            return 8;
        }
    }
}
//create game elements
var playerX = new Player("X");
var playerO = new Player("O");
var board = new Board();
var game = new Game(playerX, playerO, board, 0);
var switchPlayer = function(player){
  if(player === playerX) {
    player = playerO;
    return player;
  }
  else {
    player = playerX;
    return player;
  }
}
//create play function
var currPlayer = playerX;
var play = function(player){
  $(".game div").click(function(event){
      event.preventDefault();
      var rawSpace = $(this).attr("id");
      switch (rawSpace){
          case "_0":
              var playSpace = new Space(1, 1);
              break;
          case "_1":
              var playSpace = new Space(1, 2);
              break;
          case "_2":
              var playSpace = new Space(1, 3);
              break;
          case "_3":
              var playSpace = new Space(2, 1);
              break;
          case "_4":
              var playSpace = new Space(2, 2);
              break;
          case "_5":
              var playSpace = new Space(2, 3);
              break;
          case "_6":
              var playSpace = new Space(3, 1);
              break;
          case "_7":
              var playSpace = new Space(3, 2);
              break;
          case "_8":
              var playSpace = new Space(3, 3);
              break;
      }
      console.log(playSpace);
      if (currPlayer === playerX){
          playSpace.mark_by(playerX, board, game);
          var id_to_mark = board.markedSquare(playSpace);
          var divId = "#_" + id_to_mark + " span#X";
          $(divId).show();
          console.log("ID = " + id_to_mark + ", html id = " + divId);
          console.log("turns: " + game.turns);
      } else{
          playSpace.mark_by(playerO, board, game);
          var id_to_mark = board.markedSquare(playSpace);
          var divId = "#_" + id_to_mark + " span#O";
          $(divId).show();
          console.log("ID = " + id_to_mark + ", html id = " + divId);
          console.log("turns: " + game.turns);
      }
      currPlayer = switchPlayer(currPlayer);
      console.log(currPlayer);

      play(currPlayer);

      console.log(currPlayer);
      //////////////////////////
  });
}
// start game
$("button").click(function(event){
  event.preventDefault();
  $(this).hide();
  $("#playerX").show("slow");
});

play(currPlayer);

//////////////////////////
// player1 play()
//    check for win

// switch players

// player2 play()
//    check for win
