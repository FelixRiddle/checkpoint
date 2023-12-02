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
})
