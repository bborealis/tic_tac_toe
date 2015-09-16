describe('Player', function() {
    it("Takes a user name and 'marker' and creates a new player", function() {
        var testPlayer = new Player("X");
        expect(testPlayer.mark).to.be.eql("X");
    });
});

describe('Space', function() {
    it("returns the player's mark", function() {
        var testSpace = new Space(1,2);
        expect(testSpace.x_axis).to.equal(1);
    });

    it("returns the player's mark", function() {
        var testSpace = new Space(1,2);
        expect(testSpace.y_axis).to.equal(2);
    });

    it("lets a player mark a space", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testSpace = new Space(1, 2);
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        testSpace.mark_by(testPlayer, testBoard, testGame);
        expect(testSpace.markedBy()).to.equal(testPlayer.mark);
    });

    it("determines if a space is taken by a player", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testSpace = new Space(1, 2);
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        testSpace.mark_by(testPlayer, testBoard, testGame);
        var taken = true;
        expect(testSpace.spaceCheck(1, 2, testPlayer.mark)).to.equal(taken);
    });
});

describe('Game', function(){
    it("Takes two players and a board and creates a game", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        expect(testGame.p1, testGame.p2, testGame.board).to.eql(testPlayer, testPlayer2, testBoard);
    });

    it("Checks marked spaces for winning combinations", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        var testSpace1 = new Space(1,1);
        var testSpace2 = new Space(1,2);
        var testSpace3 = new Space(1,3);
        testSpace1.mark_by(testPlayer, testBoard, testGame);
        testSpace2.mark_by(testPlayer, testBoard, testGame);
        testSpace3.mark_by(testPlayer, testBoard, testGame);
        testBoard.markedSquare(testSpace1);
        testBoard.markedSquare(testSpace2);
        testBoard.markedSquare(testSpace3);
        expect(testGame.win(testBoard, testGame.turns)).to.eql(testPlayer.mark);
    });

    it("keeps a tally of number of turns => increase number of turns by one every turn", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        expect(testGame.advanceTurns()).to.equal(1);
    });

    it("determines if the game is a draw", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard, 0);
        var testSpace1 = new Space(1,1);
        var testSpace2 = new Space(1,2);
        var testSpace3 = new Space(1,3);
        var testSpace4 = new Space(2,1);
        var testSpace5 = new Space(2,2);
        var testSpace6 = new Space(2,3);
        var testSpace7 = new Space(3,1);
        var testSpace8 = new Space(3,2);
        var testSpace9 = new Space(3,3);
        testSpace1.mark_by(testPlayer, testBoard, testGame);
        testSpace2.mark_by(testPlayer, testBoard, testGame);
        testSpace5.mark_by(testPlayer, testBoard, testGame);
        testSpace6.mark_by(testPlayer, testBoard, testGame);
        testSpace7.mark_by(testPlayer, testBoard, testGame);
        testSpace3.mark_by(testPlayer2, testBoard, testGame);
        testSpace4.mark_by(testPlayer2, testBoard, testGame);
        testSpace8.mark_by(testPlayer2, testBoard, testGame);
        testSpace9.mark_by(testPlayer2, testBoard, testGame);
        expect(testGame.win(testBoard, testGame.turns)).to.equal("DRAW");
    });
});

describe('Board', function(){
    it("Takes a space and marks the position on the board", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard);
        var testSpace = new Space(2,2);
        testSpace.mark_by(testPlayer, testBoard, testGame);
        expect(testBoard.markedSquare(testSpace)).to.equal(testPlayer.mark);
    });
});
