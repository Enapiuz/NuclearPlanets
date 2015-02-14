// create HelloScreen Class
HelloScreen = {

};

// create Game function in HelloScreen
HelloScreen.Game = function (game) {
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
        this.load.image('logo', 'asset/phaser.png');
    },

    create: function () {
        this.logo = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'logo');
        // Set the anchor to the center of the sprite
        this.logo.anchor.setTo(0.5, 0.5);
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};