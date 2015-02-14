// create HelloScreen Class
HelloScreen = {

};

// create Game function in HelloScreen
HelloScreen.Game = function (game) {
    this.game = game;
};

// set Game function prototype
HelloScreen.Game.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.setScreenSize(true);
        this.scale.refresh();
    },

    preload: function () {
        this.load.image('start', 'asset/start.png');
    },

    create: function () {
        var self = this;
        var style = { font: "32px Arial", fill: "#16b000", wordWrap: false, /*wordWrapWidth: 500,*/ align: "center" };
        
        var text = this.add.text(this.world.centerX, this.world.centerY - (this.world.height / 10), "NUCLEAR PLANETS", style);
        text.anchor.set(0.5);
        
        var start = this.add.sprite(this.world.centerX, this.world.centerY + (this.world.height / 10), 'start');
        start.anchor.set(0.5);
        start.inputEnabled = true;
        start.events.onInputDown.add(function(){
            self.game.state.start('Game');
        });

    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};