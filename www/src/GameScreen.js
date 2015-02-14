// create GameScreen Class
GameScreen = {

};

// create Game function in GameScreen
GameScreen.Game = function (game) {
};

// set Game function prototype
GameScreen.Game.prototype = {

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
        this.load.image('sun', 'asset/sun.png');
        this.load.image('planet1', 'asset/planet1.png');
    },

    create: function () {
        this.sun = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'sun');
        // Set the anchor to the center of the sprite
        this.sun.anchor.setTo(0.5, 0.5);
        
        this.planet1 = this.add.sprite(
            this.world.centerX - (this.world.width / 6), 
            this.world.centerY,
            'planet1');
        this.planet1.anchor.setTo(0.5, 0.5);
        
        this.planet2 = this.add.sprite(
            this.world.centerX - (this.world.width / 4), 
            this.world.centerY,
            'planet1');
        this.planet2.anchor.setTo(0.5, 0.5);
        
        this.p1 = new Phaser.Point(this.world.centerX - (this.world.width / 6), this.world.centerY);
        this.d1 = 1;
        this.p2 = new Phaser.Point(this.world.centerX - (this.world.width / 4), this.world.centerY);
        this.d2 = -2;
    },
    
    update: function() {
        this.p1.rotate(this.world.centerX, this.world.centerY, this.game.math.wrapAngle(this.d1), true);
        this.p2.rotate(this.world.centerX, this.world.centerY, this.game.math.wrapAngle(this.d2), true);
        
        this.planet1.x = this.p1.x;
        this.planet1.y = this.p1.y;
        this.planet2.x = this.p2.x;
        this.planet2.y = this.p2.y;
        
    },

    gameResized: function (width, height) {
    }

};