const ValidationResult = require("./ValidationResult.js");
const FieldData = require("./model/FieldData.js");
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
     * Construct with field data
     * 
     * @param {string} scopeName 
     * @param {FieldData} fieldData Field data
     */
    constructor(scopeName, fieldData, config = {
        debug: false,
    }) {
        this.name = scopeName;
        this.data = fieldData;
        this.config = config;
    }
    
    // --- Types of clones ---
    /**
     * Clones this object
     * 
     * @returns {Scope} A copy of this object
     */
    clone() {
        // Clone data
        let name = JSON.parse(JSON.stringify(this.scopeName));
        let fieldData = this.fieldData.clone();
        
        // Create scope
        let scope = new Scope(name, fieldData);
        
        return scope;
    }
    
    /**
     * Perform a deep clone of this object
     * 
     * Replaces the clone data with the given one
     * 
     * Cloning is really computer-expensive, because everything is 
     * cloned down the tree.
     * For now it's fine, I'll try to fix it if I get problems from it only.
     * That's my rule, "It's not a problem until it affects me".
     * 
     * @param {string} scopeName Scope name
     * @param {string} fieldName Field name
     * @param {*} data Data
     * @returns {Scope} The new scope
     */
    cloneWith(scopeName, fieldName, data) {
        // Create new scope
        // When using an existing scope, we can't give it the same name
        // For now, an empty string will do
        let scope = new Scope(scopeName, new FieldData(fieldName, data));
        
        // --- Update field data ---
        // Set field data updates operators with the new data
        // So here we just clone the operators
        scope.operations = this.cloneOperators();
        
        // Replace scope field data
        // It also replaces each operation field data
        let fieldData = new FieldData(fieldName, data);
        scope.setFieldData(fieldData);
        // --------------------------
        
        return scope;
    }
    
    /**
     * Perform a deep clone of the operation controllers
     * 
     * @returns {Array} Array of new operations
     */
    cloneOperators() {
        // Check if on debug mode
        // Jest will take you so far
        if(this.config.debug) {
            console.log(`Cloning operators.`);
        }
        
        return this.operations.map((op) => {
            if(this.config.debug) {
                console.log(`Operator field data: `, op.fieldData);
            }
            
            return op.clone();
        });
    }
    
    // --- Operations ---
    /**
     * Append a operation to the list
     * 
     * @param {number} operationId Operation id
     * @param {object} operationArgs Operation args
     * @returns {Scope}
     */
    appendOperation(operationId, operationArgs = {}) {
        // Create operation
        let op = new OperationController(
            operationId,
            this.fieldData,
            operationArgs,
        );
        
        // Create a new operation
        this.operations.push(op);
        
        return this;
    }
    
    /**
     * Run every operation in this scope
     * 
     * @returns {Array} Returns an array of messages
     * The messages are contained in the 'ValidationResult' class.
     */
    runOperations() {
        if(this.config.debug) {
            console.log(`Operations: `, this.operations);
        }
        
        let resultMessages = this.operations.filter((op) => {
            if(this.config.debug) console.log(`Operation: `, op);
            
            let result = op.executeAndGetMessage();
            if(result) {
                // Create validation result
                let resMsg = new ValidationResult();
                resMsg.setAsError(this.fieldData.fieldName, result);
                
                return resMsg;
            }
        });
        
        if(this.config.debug) console.log(`Result messages: `, resultMessages);
        
        return resultMessages;
    }
    
    /**
     * Replace operations field data and this object field data
     * 
     * @param {FieldData} newData The new field data
     * @returns {this} This object
     */
    setFieldData(newData) {
        if(this.config.debug) console.log(`Setting field data.`);
        this.fieldData = newData;
        
        // Replace operations data
        this.operations.map((op) => {
            op.fieldData = newData;
        });
        
        return this;
    }
    
    /**
     * Get operations id as an array
     * 
     * @returns {Array} Array of operations
     */
    getOperationsId() {
        let operationsId = [];
        
        for(let op in this.operations) {
            operationsId.push(op.operation);
        }
        
        return operationsId;
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
