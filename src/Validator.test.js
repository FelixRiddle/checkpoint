const ValidationResult = require("./ValidationResult");
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

(() => {
    // Now we run a test in  which another field uses the same scope
    let val = new Validator()
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64)
        .useScope("email", "friend_email", "joe@email.com");
    
    // Perform validations
    let result = val.validate();
    
    test("Use same scope on another email", () => {
        // If validations passed, the resulting messages are 0
        expect(result.length).toBe(0);
    });
})();

(() => {
    // Now we run a test in  which another field uses the same scope
    let val = new Validator({ debug: false })
        .createScope("email", "email", "felix@.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(20, 64)
        .useScope("email", "friend_email", "joe@email");
    
    // Perform validations
    let result = val.validate();
    
    // Prevent an error
    if(result.length > 0) {
        let first = result[0];
        let typesMatch = first instanceof ValidationResult;
        
        // Validate it's an exact type
        test("Type is 'ValidationResult'", () => {
            expect(typesMatch).toBe(true);
        });
    }
    
    // 2 for wrong emails, 2 for length range
    test("Validate that there are exactly 4 errors", () => {
        // If validations passed, the resulting messages are 0
        expect(result.length).toBe(4);
    });
})();

(() => {
    // Testing multiple scopes
    let val = new Validator({ debug: false })
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64)
        .isStr()
        // Use scope
        .useScope("email", "friend_email", "joe@email.com")
        // Create new scope
        // These ones pass
        .createScope("username", "username", "my_cool_username_65")
        .isNotFalsy()
        .lengthRange(5, 64)
        .isStr()
        // Phone scope
        .createScope("phone", "phone_number", 6756829123)
        .isNotFalsy()
        .isNum()
        // Use phone scope again
        // And fail both tests
        .useScope("phone", "alt_phone", "");
    
    // Perform validations
    let result = val.validate();
    
    // 2 for wrong emails, 2 for length range
    test("There are exactly 2 errors", () => {
        // If validations passed, the resulting messages are 0
        expect(result.length === 2).toBe(true);
    });
})();
