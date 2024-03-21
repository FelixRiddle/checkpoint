import ValidationResult from "./ValidationResult";
import Validator from "./Validator";
import { testMessage } from "./test/testMessage";

/**
 * Email scope test
 */
export function testEmailScope() {
    // Create validator
    let val = new Validator()
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Perform validations
    let result = val.validate();
    
    // If validations passed, the resulting messages are 0
    testMessage(result.length === 0, "Email scope")
}

/**
 * Wrong email returns error
 */
export function testWrongEmailReturnsErrorMessages() {
    // Create validator
    let val = new Validator()
        .createScope("email", "email", "fe@a")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Perform validations
    let result = val.validate();
    
    // Validate that there are more than 0 messages
    testMessage(result.length > 0, "Wrong email returns error messages");
}

/**
 * Scope tests
 * 
 * I require to share variables to not repeat code twice
 */
export function testScopes() {
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
    
    // If validations passed, the resulting messages are 0
    testMessage(result.length === 0, "Use same scope on another email");
    
    // Validate that both scopes have different values
    testMessage(
        firstScope && secondScope && firstScope.fieldData.data !== secondScope.fieldData.data,
        "New scope doesn't have previous data"
    );
}

/**
 * Scope works
 */
export function testSameScopeDifferentField() {
    // Now we run a test in  which another field uses the same scope
    let val = new Validator()
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64)
        .useScope("email", "friend_email", "joe@email.com");
    
    // Perform validations
    let result = val.validate();
    
    // If validations passed, the resulting messages are 0
    testMessage(result.length === 0, "Use same scope on another email")
}

/**
 * Test scope works 2
 */
export function testScopeAssertErrors() {
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
        testMessage(typesMatch, "Type is 'ValidationResult'");
    }
    
    // 2 for wrong emails, 2 for length range
    // If validations passed, the resulting messages are 0
    testMessage(result.length === 4, "Validate that there are exactly 4 errors");
}

/**
 * Test multiple scopes
 */
export function testMultipleScopes() {
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
    testMessage(result.length === 2, "There are exactly 2 errors");
}

/**
 * Frontend validation
 * 
 * One with many fields
 */
export function testFullFledgedFrontendValidation() {
    // Data heavy one
    let resultObject = {
        "title": "asdfasdf",
        "description": "slkdajfksfjsdalkfsadjflkjasdfl",
        "rooms": 5,
        "parking": 4,
        "bathrooms": 4,
        "street": "3801 S Broadway",
        "latitude": 39.647467988379,
        "longitude": -104.988104982762,
        "priceId": 2,
        "categoryId": 3
    };
    
    // Frontend validation
    let idBasedScope = "id_based";
    let coordinateScope = "coordinate_scope";
    let val = new Validator()
        // Title scope    
        .createScope("title", "title", resultObject.title)
            .isNotFalsy()
            .lengthRange(3, 128)
        // Description scope
        .createScope("description", "description", resultObject.description)
            .isNotFalsy()
            .lengthRange(10, 512)
        // Categories and price
        .createScope(idBasedScope, "categoryId", resultObject.categoryId)
            .isNotFalsy()
            .isInt()
            .numRange(0, 20)
        // Others
        .useScope(idBasedScope, "priceId", resultObject.priceId)
        .useScope(idBasedScope, "rooms", resultObject.rooms)
        .useScope(idBasedScope, "parking", resultObject.parking)
        .useScope(idBasedScope, "bathrooms", resultObject.bathrooms)
        .createScope(coordinateScope, "latitude", resultObject.latitude)
            .isNotFalsy()
            .isFloat()
        .useScope(coordinateScope, "longitude", resultObject.longitude)
        .createScope("street", "street", resultObject.street)
            .isNotFalsy();
    
    // Perform validations
    let result = val.validate();
    
    testMessage(result.length === 0, "Property data passes");
}

/**
 * Run all tests
 */
export default function runAllValidationTests() {
    testEmailScope();
    testWrongEmailReturnsErrorMessages();
    testScopes();
    testSameScopeDifferentField();
    testScopeAssertErrors();
    testMultipleScopes();
    testFullFledgedFrontendValidation();
}
