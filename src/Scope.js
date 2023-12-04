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
     * @param {number} operationId 
     * @param {object} operationArgs 
     * @returns {Scope}
     */
    appendOperation(operationId, fieldName, data, operationArgs = {}) {
        let op = new OperationController(
            operationId,
            fieldName,
            data,
            operationArgs,
        )
        
        // Create a new operation
        this.operations.push(
        );
        
        return this;
    }
}
