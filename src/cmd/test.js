const { Namespace } = require("argparse");
const Validator = require("../Validator");

/**
 * Main function 
 * 
 * @param {Namespace} args Argument list
 */
module.exports = function main(args) {
    testValidator();
}

/**
 * Test validator
 */
function testValidator() {
    // Use scope example
    // Create validator
    let val = new Validator({ debug: true, })
        .createScope("email", "email", "felix@email.com")
        .isNotFalsy()
        .isEmail()
        .lengthRange(5, 64);
    
    // Get reference to first scope
    let firstScope = val.scope;
    
    console.log(`Using a scope`);
    
    // Use a new scope
    val
        // Use the same scope on another email
        .useScope("email", "email", "joe@email.com")
    
    // Reference to second scope
    let secondScope = val.scope;
    
    // Perform validations
    let result = val.validate();
    
    let passed = 0;
    let failed = 0;
    if(result.length === 0) passed += 1;
    else failed += 1;
    
    if(firstScope.fieldData.data !== secondScope.fieldData.data) passed += 1;
    else failed += 1;
    
    console.log(`Tests passed ${passed}`);
    console.log(`Tests failed ${failed}`);
}
