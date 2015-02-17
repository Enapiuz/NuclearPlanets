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
        var self = this;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.setScreenSize(true);
        this.scale.refresh();
        
        //this.maxPlanets = getRandomInt(3, 5);
        this.maxPlanets = 5;
        this.playerPlanet = getRandomInt(1, this.maxPlanets);
        this.gridStep = this.world.height / 22;
        this.gridWhiteSpace = (5 - this.maxPlanets) * this.gridStep;
        
        this.activeAttack = 0;
        this.activeShield = 0;
        
        this.rockets = [];
        
        for (var i = 1; i <= this.maxPlanets; i++) {
            this["followPlanet" + i] = this.game.add.group();
        }
        
        $(".item").css({width: this.gridStep * 3, height: this.gridStep * 3});
        $("#controls").show(true);
        
        $(".attack").click(function(){
            $(".attack").removeClass("inverted");
            $(this).addClass("inverted");
            self.activeAttack = $(this).data("type");
        });
        
        $(".shield").click(function(){
            $(".shield").removeClass("inverted");
            $(this).addClass("inverted");
            self.activeShield = $(this).data("type");
        });
    },

    preload: function () {
        this.load.image('sun', 'asset/sun.png');
        this.load.image('planet1', 'asset/planet1.png');
        this.load.image('planet2', 'asset/planet2.png');
        this.load.image('planet3', 'asset/planet3.png');
        this.load.image('planet4', 'asset/planet4.png');
        this.load.image('planet5', 'asset/planet5.png');
        this.load.image('jets', 'asset/jets.png');
        this.load.image('general-rocket', 'asset/general-rocket.png');
        this.load.image('nuclear-rocket', 'asset/nuclear-rocket.png');
    },

    create: function () {
        this.game.stage.smoothed = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.graphics = this.add.graphics(0, 0);
        this.graphics.lineStyle(1, 0xffffff, 0.3);
        
        var style = { font: "22px Arial", fill: "#ffffff", wordWrap: false, /*wordWrapWidth: 500,*/ align: "center" };
        this.playerHeallthText = this.add.text(10, 10, "100 HP", style);
        this.playerEnergyText = this.add.text(10, 35, "100 E", style);
        
        for (var i = 1; i <= this.maxPlanets; i++) {
            this.addPlanet(i, getRandomNotNull(-3, 3));
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
        this.playerEnergyText.text = this["planet" + this.playerPlanet].energy + " E";
    },
    
    render: function(game) {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
    },

    gameResized: function (width, height) {},
    
    addPlanet: function(num, speed) {
        var self = this;
        
        var graphics = new Phaser.Graphics(this.game, 0, 0);
        var color = [
            0xff0000,
            0x00ff00,
            0x0000ff,
            0xff00ff,
            0x00ffff,
        ];
        graphics.lineStyle(this.gridStep * 0.8, color[num - 1], 3);
        if (num == this.playerPlanet) {
            graphics.beginFill(color[num - 1], 1);
        } else {
            graphics.beginFill(0x000000, 1);
        }
        
        graphics.drawCircle(0, 0, this.gridStep * 2);
        var texture = graphics.generateTexture();
        
        this["planet" + num] = this.add.sprite(
            this.world.centerX + this.gridStep * (num * 2) + this.gridWhiteSpace, 
            this.world.centerY,
            texture);
            //'planet' + num);
        this["planet" + num].anchor.setTo(0.5, 0.5);
        this["planet" + num].width = this.gridStep * 2;
        this["planet" + num].height = this.gridStep * 2;
        
        this["planet" + num].health = 100;
        this["planet" + num].energy = 100;
        
        this["p" + num] = new Phaser.Point(this.world.centerX + this.gridStep * (num * 2) + this.gridWhiteSpace, this.world.centerY);
        this.graphics.drawCircle(this.world.centerX, this.world.centerY, this.gridStep * (num * 2) + this.gridWhiteSpace);
        
        this.game.physics.enable(this["planet" + num], Phaser.Physics.ARCADE);
        
        this["planet" + num].energyTimer = this.game.time.events.loop(Phaser.Timer.SECOND, function(){
            if (self["planet" + num].energy + 5 <= 100) {
                self["planet" + num].energy += 5;
            }
        }, this);
        
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
                if (self.activeAttack == 1) {
                    self.launchNuclearRocket(self.playerPlanet, num);
                } else if (self.activeAttack == 2) {
                    
                } else if (self.activeAttack == 3) {
                    
                }
            }
        });
    },
    
    launchNuclearRocket: function(launcher, target) {
        var self = this;
        var planet = this["planet" + launcher];
        var targetPlanet = this["planet" + target];
        
        if (planet.energy - 20 < 0) return;
        
        planet.energy -= 20;
        
        var rocket = this.add.sprite(planet.x, planet.y, "nuclear-rocket");
        this["followPlanet" + target].add(rocket);
        rocket.scale.setTo(0.3, 0.3);
        rocket.anchor.setTo(0.5, 0.5);
        
        //  Enable Arcade Physics for the sprite
        this.game.physics.enable(rocket, Phaser.Physics.ARCADE);

        //  Tell it we don't want physics to manage the rotation
        rocket.body.allowRotation = false;
        rocket.update = function() {
            self.game.physics.arcade.moveToObject(rocket, targetPlanet, self.gridStep * 10);
            rocket.rotation = self.game.physics.arcade.angleBetween(rocket, targetPlanet) + 1.57079633;
            
            self.game.physics.arcade.collide(rocket, targetPlanet, function(){
                targetPlanet.damage(10);
                rocket.kill();
                if (targetPlanet.health < 1) {                  
                    self["followPlanet" + target].callAll('kill');
                }
                if (planet.energy + 10 <= 100) {
                    planet.energy += 10;
                }
            });
        }
        
        //targetPlanet.addChild(rocket);
    }

};