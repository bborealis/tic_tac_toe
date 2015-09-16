describe('Player', function() {
    it("Takes a user name and 'marker' and creates a new player", function() {
        var testPlayer = new Player("Joe", "X");
        expect(testPlayer.playerName, testPlayer.mark).to.be.eql("Joe", "X");
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
        var testPlayer = new Player("Joe", "X");
        var testSpace = new Space(1, 2);
        testSpace.mark_by(testPlayer);
        expect(testSpace.markedBy()).to.equal(testPlayer);
    });

    it("determines if a space is taken by a player", function(){
        var testPlayer = new Player("Joe", "X");
        var testSpace = new Space(1, 2);
        testSpace.mark_by(testPlayer);
        var taken = true;
        expect(testSpace.spaceCheck(1, 2, testPlayer)).to.equal(taken);
    });
});
