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
        
        this.maxPlanets = getRandomInt(3, 5);
//        this.maxPlanets = 5;
        this.playerPlanet = getRandomInt(1, this.maxPlanets);
        this.gridStep = this.world.height / 22;
        this.gridWhiteSpace = (5 - this.maxPlanets) * this.gridStep;
        
        this.rockets = [];
        
        for (var i = 1; i <= this.maxPlanets; i++) {
            this["followPlanet" + i] = this.game.add.group();
        }
        
        $(".item").css({width: this.gridStep * 3, height: this.gridStep * 3});
        $("#controls").show(true);
        
        $(".item").click(function(){
            $(".item").removeClass("inverted");
            $(this).addClass("inverted");
        });
    },

    preload: function () {
        this.load.image('sun', 'asset/sun.png');
        this.load.image('planet1', 'asset/planet1.png');
        this.load.image('planet2', 'asset/planet2.png');
        this.load.image('planet3', 'asset/planet3.png');
        this.load.image('planet4', 'asset/planet4.png');
        this.load.image('planet5', 'asset/planet5.png');
        this.load.image('general-rocket', 'asset/general-rocket.png');
        this.load.image('nuclear-rocket', 'asset/nuclear-rocket.png');
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.graphics = this.add.graphics(0, 0);
        this.graphics.lineStyle(1, 0xffffff, 0.3);
        
        var style = { font: "22px Arial", fill: "#ffffff", wordWrap: false, /*wordWrapWidth: 500,*/ align: "center" };
        this.playerHeallthText = this.add.text(10, 10, "100 HP", style);
        
        for (var i = 1; i <= this.maxPlanets; i++) {
            this.addPlanet(i, getRandomNotNull(-1, 3));
        }
        
        this.sun = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'sun');
        // Set the anchor to the center of the sprite
        this.sun.anchor.setTo(0.5, 0.5);
        this.sun.width = this.gridStep * 2;
        this.sun.height = this.gridStep * 2;
        //this.sun.scale.setTo(0.5);
        
        this.megaScale = 1;
    },
    
    update: function() {
        for (var i = 1; i <= this.maxPlanets; i++) {
            this["p" + i].rotate(this.world.centerX, this.world.centerY, this.game.math.wrapAngle(this["d" + i]), true);
            this["planet" + i].x = this["p" + i].x;
            this["planet" + i].y = this["p" + i].y;
        }
        
        // TODO убрать тестовый дамаг
        //this["planet" + this.playerPlanet].damage(1);
        
        this.playerHeallthText.text = this["planet" + this.playerPlanet].health + " HP";
    },
    
    render: function(game) {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
    },

    gameResized: function (width, height) {},
    
    addPlanet: function(num, speed) {
        var self = this;
        
        this["planet" + num] = this.add.sprite(
            this.world.centerX + this.gridStep * (num * 2) + this.gridWhiteSpace, 
            this.world.centerY,
            'planet' + num);
        this["planet" + num].anchor.setTo(0.5, 0.5);
        this["planet" + num].width = this.gridStep;
        this["planet" + num].height = this.gridStep;
        this["planet" + num].health = 100;
        
        this["p" + num] = new Phaser.Point(this.world.centerX + this.gridStep * (num * 2) + this.gridWhiteSpace, this.world.centerY);
        this.graphics.drawCircle(this.world.centerX, this.world.centerY, this.gridStep * (num * 2) + this.gridWhiteSpace);
        
        this.game.physics.enable(this["planet" + num], Phaser.Physics.ARCADE);
        
        if (speed > 0) {
            speed += 1 / (num / 5);
        } else {
            speed -= 1 / (num / 5);
        }
        
        if (num % 2 == 0) {
            if (speed < 0) {
                speed *= (-1);
            }
        } else if (speed > 0) {
            speed *= (-1);
        }
        
        this["d" + num] = speed / 4;
        
        this["planet" + num].update = function() {
            // TODO тут проверки
        }
        
        this["planet" + num].inputEnabled = true;
        this["planet" + num].events.onInputDown.add(function(){
            if (num != self.playerPlanet) {
                self.launchNuclearRocket(self.playerPlanet, num);
            }
        });
    },
    
    launchNuclearRocket: function(launcher, target) {
        var self = this;
        var planet = this["planet" + launcher];
        var targetPlanet = this["planet" + target];
        
        var rocket = this.add.sprite(planet.x, planet.y, "nuclear-rocket");
        this["followPlanet" + target].add(rocket);
        rocket.scale.setTo(0.3, 0.3);
        
        //  Enable Arcade Physics for the sprite
        this.game.physics.enable(rocket, Phaser.Physics.ARCADE);

        //  Tell it we don't want physics to manage the rotation
        rocket.body.allowRotation = false;
        rocket.update = function() {
            self.game.physics.arcade.moveToObject(rocket, targetPlanet, 150);
            rocket.rotation = self.game.physics.arcade.angleBetween(rocket, targetPlanet) + 1.57079633;
            
            self.game.physics.arcade.collide(rocket, targetPlanet, function(){
                targetPlanet.kill(true);
                rocket.kill();
                self["followPlanet" + target].callAll('kill');
            });
        }
        
        //targetPlanet.addChild(rocket);
    }

};