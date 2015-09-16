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
        var testSpace = new Space(1, 2);
        testSpace.mark_by(testPlayer);
        expect(testSpace.markedBy()).to.equal(testPlayer);
    });

    it("determines if a space is taken by a player", function(){
        var testPlayer = new Player("X");
        var testSpace = new Space(1, 2);
        testSpace.mark_by(testPlayer);
        var taken = true;
        expect(testSpace.spaceCheck(1, 2, testPlayer)).to.equal(taken);
    });
});

describe('Game', function(){
    it("Takes two players and a board and creates a game", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard);
        expect(testGame.p1, testGame.p2, testGame.board).to.eql(testPlayer, testPlayer2, testBoard);
    });

    it("Checks marked spaces for winning combinations", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard);
        var testSpace1 = new Space(2,1);
        var testSpace2 = new Space(2,2);
        var testSpace3 = new Space(2,3);
        testSpace1.mark_by(testPlayer);
        testSpace2.mark_by(testPlayer);
        testSpace3.mark_by(testPlayer);
        testBoard.markedSquare(testSpace1);
        testBoard.markedSquare(testSpace2);
        testBoard.markedSquare(testSpace3);
        expect(testGame.win(testBoard)).to.eql(testPlayer.mark);
    });
});

describe('Board', function(){
    it("Takes a space and marks the position on the board", function(){
        var testPlayer = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board();
        var testGame = new Game(testPlayer, testPlayer2, testBoard);
        var testSpace = new Space(2,2);
        testSpace.mark_by(testPlayer);
        expect(testBoard.markedSquare(testSpace)).to.equal(testPlayer.mark);
    });
});
