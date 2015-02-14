// create GameScreen Class
var GameScreen = {

};

// create Game function in GameScreen
GameScreen.Game = function (game) {
    this.game = game;
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
        var graphics = this.add.graphics(0, 0);
        
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.drawCircle(this.world.centerX, this.world.centerY, this.world.width / 6);
        graphics.drawCircle(this.world.centerX, this.world.centerY, this.world.width / 4);
        
        this.sun = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'sun');
        // Set the anchor to the center of the sprite
        this.sun.anchor.setTo(0.5, 0.5);
        this.sun.scale.setTo(0.5);
        
        this.planet1 = this.add.sprite(
            this.world.centerX - (this.world.width / 6), 
            this.world.centerY,
            'planet1');
        this.planet1.anchor.setTo(0.5, 0.5);
        this.planet1.scale.setTo(0.5);
        
        this.planet2 = this.add.sprite(
            this.world.centerX - (this.world.width / 4), 
            this.world.centerY,
            'planet1');
        this.planet2.anchor.setTo(0.5, 0.5);
        this.planet2.scale.setTo(0.5);
        
        this.p1 = new Phaser.Point(this.world.centerX - (this.world.width / 6), this.world.centerY);
        this.d1 = 2 / 3;
        this.p2 = new Phaser.Point(this.world.centerX - (this.world.width / 4), this.world.centerY);
        this.d2 = -1 / 3;
        
        this.megaScale = 1;
    },
    
    update: function() {
        this.p1.rotate(this.world.centerX, this.world.centerY, this.game.math.wrapAngle(this.d1), true);
        this.p2.rotate(this.world.centerX, this.world.centerY, this.game.math.wrapAngle(this.d2), true);
        
        this.planet1.x = this.p1.x;
        this.planet1.y = this.p1.y;
        this.planet2.x = this.p2.x;
        this.planet2.y = this.p2.y;
    },
    
    render: function(game) {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
    },

    gameResized: function (width, height) {}

};