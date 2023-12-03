const Validator = require("./validator");

test("Validate falsy doesn't pass", () => {
    // Create validator
    let val = new Validator(
            undefined,
            "email",
        ).isNotFalsy();
    
    expect(val.passed).toBe(false);
});

test("Validate wrong email doesn't pass", () => {
    // Create validator
    let val = new Validator(
            "asfsfs@asdff",
            "email",
        ).isEmail();
    
    expect(val.passed).toBe(false);
});

test("Validate override last message message", () => {
    // Create validator
    let newMsg = "Email is wrong";
    let val = new Validator(
            "asfsfs@asdff",
            "email",
        ).isEmail()
        .overrideMessage(newMsg);
    
    expect(val.fetchLastMessage().message).toBe(newMsg);
});

test("Validate that the last message is popped", () => {
    // Create validator
    let val = new Validator(
            "asfsfs@asdff",
            "email",
        ).isEmail();
    let _lastMessage = val.fetchLastMessage(true)
    
    expect(val.messages.length).toBe(0);
});

test("Min length", () => {
    // Create validator
    let val = new Validator(
            "asdf",
            "title",
        ).minLength("asdf".length);
    
    expect(val.passed).toBe(true);
});

test("Min length, lesser length fails", () => {
    // Create validator
    let val = new Validator(
            "asd",
            "title",
        ).minLength("asdf".length);
    
    expect(val.passed).toBe(false);
});

// --- Data types ---
test("Data type is number", () => {
    // Create validator
    let val = new Validator(
            1,
            "title",
        ).isNum();
    
    expect(val.passed).toBe(true);
});

test("Data type is string", () => {
    // Create validator
    let val = new Validator(
            "",
            "title",
        ).isStr();
    
    expect(val.passed).toBe(true);
});

test("Data type is not string", () => {
    // Create validator
    let val = new Validator(
            1,
            "title",
        ).isStr();
    
    expect(val.passed).toBe(false);
});

test("Data type is boolean", () => {
    // Create validator
    let val = new Validator(
            true,
            "something",
        ).isBool();
    
    expect(val.passed).toBe(true);
});

test("Data type is array", () => {
    // Create validator
    let val = new Validator(
            [],
            "something",
        ).isArray();
    
    expect(val.passed).toBe(true);
});

test("Data type is object", () => {
    // Create validator
    let val = new Validator(
            {},
            "something",
        ).isObject();
    
    expect(val.passed).toBe(true);
});

test("Number range", () => {
    // Create validator
    let val = new Validator(
            5,
            "something",
        ).numRange(
            1, 10
        );
    
    expect(val.passed).toBe(true);
});

test("Number range fails #1", () => {
    // Create validator
    let val = new Validator(
            -5,
            "something",
        ).numRange(
            1, 10
        );
    
    expect(val.passed).toBe(false);
});

test("Number range fails #2", () => {
    // Create validator
    let val = new Validator(
            15,
            "something",
        ).numRange(
            1, 10
        );
    
    expect(val.passed).toBe(false);
});
