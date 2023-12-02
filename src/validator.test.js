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
