test("Testing Ship Factory", () => {
    expect(ship()).toBe(10)
})

test("Testing Ship Factory - hit method", () => {
    expect(ship.hit()).toBe(10)
})

test("Testing Ship Factory - isSunk method", () => {
    expect(ship.isSunk()).toBe(10)
})