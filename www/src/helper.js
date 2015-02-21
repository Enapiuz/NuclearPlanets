var CONSTANTS = {
    'nuclearDamage': 20,
    'passiveShield': 0.9,
    'activeShield': 0.7,
    'activeShieldDelay': 1000,
    'activeShieldCost': 5,
    'nuclearDelay': 1000,
    'generalDelay': 700
};

function getRandomInt(min, max) {
    min = min || 0;
    max = max || 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNotNull(min, max) {
    var ret = 0;
    while (ret === 0) {
        ret = getRandomInt(min, max);
    }
    return ret;
}

function getRandomNotThis(min, max, not) {
    var ret = not;
    while (ret === not) {
        ret = getRandomInt(min, max);
    }
    return ret;
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.force.y = Math.sin(angle) * speed;
}