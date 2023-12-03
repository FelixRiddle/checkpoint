const Op = require("./operation");

test("Data is not falsy", () => {
    expect(
        Op.execute(
            Op.IsNotFalsy,
            "a",
        )
    ).toBe(true);
});

test("Data is falsy", () => {
    expect(
        Op.execute(
            Op.IsNotFalsy,
            "",
        )
    ).toBe(false);
});
