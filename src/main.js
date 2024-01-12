function ship(name, length){
    let damage = 0
    return {
        name: name,
        length: length,
        hit: () => {
            if (damage !== length) return damage++;
            return damage;
        },
        isSunk: () => {
            return damage === length ? true : false;
        },
    }
}

module.exports = {
    ship: ship,
}