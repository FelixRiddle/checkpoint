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

// I require to share variables to not repeat code twice
(() => {
    // Use scope example
    // Create validator
    let val = new Validator()
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Get reference to first scope
    let firstScope = val.scope;
    
    // Use a new scope
    val
        // Use the same scope on another email
        .useScope("email", "email", "joe@email.com")
    
    // Reference to second scope
    let secondScope = val.scope;
    
    // Perform validations
    let result = val.validate();
    
    test("Use same scope on another email", () => {
        // If validations passed, the resulting messages are 0
        expect(result.length).toBe(0);
    });
    
    test("New scope doesn't have previous data", () => {
        // Validate that both scopes have different values
        expect(firstScope.fieldData.data !== secondScope.fieldData.data).toBe(true);
    });
})();
