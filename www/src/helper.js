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