function Player(playerName, mark){
    this.playerName = playerName;
    this.mark = mark;
}

function Space(x_axis, y_axis){
    this.x_axis = x_axis;
    this.y_axis = y_axis;
}

Space.prototype.mark_by = function(player){
    this.player = player;
}

Space.prototype.markedBy = function(){
    return this.player;
}

Space.prototype.spaceCheck = function(x, y, player){
    if (this.markedBy() === player){
        return true;
    } else {return false;}
}
