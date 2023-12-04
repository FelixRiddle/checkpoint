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

test("Max length", () => {
    expect(Op.execute(
        Op.MaxLength,
        "asdf",
        {
            // It seems like the names don't matter
            // The only thing that matters is the order maybe?
            len: 4,
        }
    )).toBe(true)
});

test("Min length", () => {
    expect(Op.execute(
        Op.MinLength,
        "asdf",
        {
            // It seems like the names don't matter
            // The only thing that matters is the order maybe?
            len: 4,
        }
    )).toBe(true)
});

test("Is email", () => {
    expect(Op.execute(
        Op.IsEmail,
        "email@email.com",
    )).toBe(true)
});

test("Num range", () => {
    expect(Op.execute(
        Op.NumRange,
        5,
        {
            min: 1,
            max: 10,
        }
    )).toBe(true)
});

test("Is num", () => {
    expect(Op.execute(
        Op.IsNum,
        5,
    )).toBe(true)
});

test("Is Str", () => {
    expect(Op.execute(
        Op.IsStr,
        "",
    )).toBe(true)
});

test("Is bool", () => {
    expect(Op.execute(
        Op.IsBool,
        false,
    )).toBe(true)
});

test("Is array", () => {
    expect(Op.execute(
        Op.IsArray,
        [],
    )).toBe(true)
});

test("Is object", () => {
    expect(Op.execute(
        Op.IsObject,
        {},
    )).toBe(true)
});
