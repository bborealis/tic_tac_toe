function Player(mark){
    this.mark = mark;
}

function Space(x_axis, y_axis){
    this.x_axis = x_axis;
    this.y_axis = y_axis;
    this.player = null;
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

Game.prototype.win = function(board){
    var allTaken = false;
    var combos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    for (var i = 0; i < combos.length; i++){
        for(var j = 0; j < combos[i].length; j++){
            if((board.spaces[combos[i][j]] === board.spaces[combos[i][j+1]]) &&
                (board.spaces[combos[i][j+1]] === board.spaces[combos[i][j+2]])
                && (board.spaces[combos[i][j]] !== "")){
                return "Player " + board.spaces[combos[i][j]] + " wins!";
            }else if((i === combos.length - 1 && j === combos[i].length - 1) && this.turns === 9){
                return "DRAW";
            }
        }
    }
    return false;
}

Game.prototype.advanceTurns = function(){
    this.turns++;
    return this.turns;
}

Space.prototype.mark_by = function(player, board, game){
    if (this.player === null){
      this.player = player.mark;
      //board.markedSquare(this);
      game.advanceTurns();
      return true;
    }else{
      return false;
    }
}

Space.prototype.markedBy = function(){
    if(this.player === null){
      return null;
    }else{return true;}

}

Space.prototype.spaceCheck = function(){
    if (this.markedBy() === null){
        return false;
    } else {return true;}
}
// returns the div id to mark, or returns true if the space is taken
// calls Space::spaceCheck()
Board.prototype.markedSquare = function(space){
    var x = space.x_axis;
    var y = space.y_axis;
    if (x === 1) {
        if (y === 1 ) {
            console.log(this.spaces[0]);
          if(this.spaces[0] === ""){
            this.spaces[0] = space.player;
            return 0;
          }else{
            return 9;
          }
        } else if (y === 2){
          if(this.spaces[1] === ""){
            this.spaces[1] = space.player;
            return 1;
          }else{
            return 9;
          }
        } else {
            if (this.spaces[2] === ""){
              this.spaces[2] = space.player;
              return 2;
            }else{
              return 9;
            }
        }
    }
    if (x === 2) {
        if (y === 1 ) {
          if(this.spaces[3] === ""){
            this.spaces[3] = space.player;
            return 3;
          }else{
            return 9;
          }
        } else if (y === 2){
          if(this.spaces[4] === ""){
            this.spaces[4] = space.player;
            return 4;
          }else{
            return 9;
          }
        } else {
          if(this.spaces[5] === ""){
            this.spaces[5] = space.player;
            return 5;
          }else{
            return 9;
          }
        }
    }
    if (x === 3) {
        if (y === 1 ) {
          if(this.spaces[6] === ""){
            this.spaces[6] = space.player;
            return 6;
          }else{
            return 9;
          }
        } else if (y === 2){
          if(this.spaces[7] === ""){
            this.spaces[7] = space.player;
            return 7;
          }else{
            return 9;
          }
        } else {
          if(this.spaces[8] === ""){
            this.spaces[8] = space.player;
            return 8;
          }else{
            return 9;
          }
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
    $(".container h3#playerX").hide();
    $(".container h3#playerO").show();
    player = playerO;
    return player;
  }
  else {
    $(".container h3#playerO").hide();
    $(".container h3#playerX").show();
    player = playerX;
    return player;
  }
}
//create play function
var currPlayer = playerX;
var validMove = true;
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
        if (currPlayer === playerX){
            playSpace.mark_by(playerX, board, game);
            var id_to_mark = board.markedSquare(playSpace);
            if (id_to_mark === 9){
              validMove = false;
              game.turns--;
              alert("invalid square");
            }else{
              var divId = "#_" + id_to_mark + " span#X";
              var divIdDisabled = "#_" + id_to_mark;
              $(divIdDisabled).prop("disabled", true);
              $(divId).show();
              validMove = true;
            }
        }
        else{
            playSpace.mark_by(playerO, board, game);

            var id_to_mark = board.markedSquare(playSpace);
            if (id_to_mark === 9){
              validMove = false;
              game.turns--;
              alert("invalid square");
            }else{
              var divId = "#_" + id_to_mark + " span#O";
              var divIdDisabled = "#_" + id_to_mark;
              $(divIdDisabled).prop("disabled", true);
              $(divId).show();
              validMove = true;
            }
        }
        var result = game.win(board);
        if (result === false){

        }
        else{
          alert(result);
          (alert).click(window.location.reload());
        }
        if(validMove){
          currPlayer = switchPlayer(currPlayer);
        }

    });
  }
// start game -- only happens once, after play button is clicked
$("button").click(function(event){
  event.preventDefault();
  $(this).hide();
  $("#playerX").show("slow");
  play(currPlayer);
});
