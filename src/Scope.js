const FieldData = require("./model/FieldData.js");
const Operation = require("./model/Operation.js");
const OperationController = require("./operation/OperationController.js");

/**
 * Scope class
 * 
 * Used to quantize operations and store operations.
 */
module.exports = class Scope {
    name = "";
    // Array of 'OperationController's
    operations = [];
    
    /**
     * Create a scope, with a given name.
     * 
     * @param {string} scopeName 
     * @param {string} fieldName Field name
     * @param {*} data Data
     */
    constructor(scopeName, fieldName, data) {
        // Just set the name
        this.name = scopeName;
        
        // Data container
        this.fieldData = new FieldData(fieldName, data);
    }
    
    /**
     * Append a operation to the list
     * 
     * @param {number} operationId Operation id
     * @param {FieldData} fieldData Field data
     * @param {object} operationArgs Operation args
     * @returns {Scope}
     */
    appendOperation(operationId, fieldData, operationArgs = {}) {
        // Create operation
        let op = new OperationController(
            operationId,
            fieldData,
            operationArgs,
        );
        
        // Create a new operation
        this.operations.push(op);
        
        return this;
    }
    
    /**
     * Run every operation in this scope
     * 
     * @return {Array} Returns an array of messages
     */
    runOperations() {
        let resultMessages = [];
        
        // Iterate over ops
        for(let op of this.operations) {
            // It could be a string or undefined
            let result = op.executeAndGetMessage();
            if(result) {
                // If exists, push it
                resultMessages.push(result);
            }
        }
        
        return resultMessages;
    }
    
    /**
     * 
     * Find a scope by name
     * 
     * @param {Array} scopes Array of scopes
     * @param {string} name Name of the scope to find
     * @returns {*} The scope that was found or undefined
     */
    static findByName(scopes, name) {
        for(let scope in scopes) {
            // Check if name match and return it
            if(scope.name === name) {
                return scope;
            }
        }
    }
}
