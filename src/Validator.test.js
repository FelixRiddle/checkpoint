const Validator = require("./Validator");

test("Email scope", () => {
    // Create validator
    let val = new Validator()
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Perform validations
    let result = val.validate();
    
    // If validations passed, the resulting messages are 0
    expect(result.length).toBe(0);
});

test("Wrong email returns error messages", () => {
    // Create validator
    let val = new Validator()
        .createScope("email", "email", "fe@a")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Perform validations
    let result = val.validate();
    
    // Validate that there are more than 0 messages
    expect(result.length > 0).toBe(true);
});
