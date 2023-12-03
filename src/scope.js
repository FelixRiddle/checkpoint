const Operation = require("./operation/operation.js");

/**
 * Scope class
 * 
 * Used to quantize operations and store operations.
 */
module.exports = class Scope {
    name = "";
    operations = [];
    
    /**
     * Create a scope, with a given name.
     * 
     * @param {string} scopeName 
     */
    constructor(scopeName) {
        // Just set the name
        this.name = scopeName;
    }
    
    /**
     * Append a operation to the list
     * 
     * @param {string} operationName 
     * @param {object} operationArgs 
     * @returns {Scope}
     */
    appendOperation(operationName, operationArgs) {
        // Create a new operation
        this.operations.push(new Operation(operationName, operationArgs))
        
        return this;
    }
}
