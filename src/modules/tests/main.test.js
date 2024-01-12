const ship = require("../../main");

let carrierFactory = ship.ship('Carrier', 5)
let destroyerFactory = ship.ship('Destroyer', 3)
let maxHitFactory = ship.ship('Destroyer', 3)
destroyerFactory.hit()

maxHitFactory.hit()
maxHitFactory.hit()
maxHitFactory.hit()
maxHitFactory.hit()

test("Ship Factory - Ship Name", () => {
    expect(carrierFactory.name).toEqual('Carrier')
})

test("Ship Factory - Ship Length", () => {
    expect(carrierFactory.length).toEqual(5)
})

test("Ship Factory - Hit method initial value", () => {
    expect(carrierFactory.hit()).toEqual(0)
})

test("Ship Factory - Hit method incremental value", () => {
    expect(destroyerFactory.hit()).toEqual(1)
})

test("Ship Factory - Hit method max hit crossed", () => {
    expect(maxHitFactory.hit()).toEqual(3)
})

test("Ship Factory - isSunk method, Ship not sunk", () => {
    expect(carrierFactory.isSunk()).toEqual(false)
})

test("Ship Factory - isSunk method, Ship is sunk", () => {
    expect(maxHitFactory.isSunk()).toEqual(true)
})