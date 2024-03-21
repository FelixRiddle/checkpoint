import ValidationResult from "./ValidationResult";
import FieldData from "./model/FieldData";
import OperationController from "./operation/OperationController";

interface ScopeConfig {
    debug: boolean,
}

/**
 * Scope class
 * 
 * Used to quantize operations and store operations.
 */
export default class Scope {
    name = "";
    // Array of 'OperationController's
    operations: Array<OperationController> = [];
    config: ScopeConfig;
    fieldData: FieldData;
    
    /**
     * Construct with field data
     * 
     * @param {string} scopeName 
     * @param {FieldData} fieldData Field data
     * @param {Object} config Configuration data
     */
    constructor(scopeName: string, fieldData: FieldData, config = {
        debug: false,
    }) {
        this.name = scopeName;
        this.fieldData = fieldData;
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
        let name = JSON.parse(JSON.stringify(this.name));
        let fieldData = this.fieldData.clone();
        
        // Create scope
        let scope = new Scope(name, fieldData, this.config);
        
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
    cloneWith(scopeName: string, fieldName: string, data: any) {
        if(this.config.debug) console.log(`Scope.cloneWith Scope name: ${scopeName}`);
        // Clone config
        let config = JSON.parse(JSON.stringify(this.config))
        
        if(this.config.debug) console.log(`Create new scope`);
        // Create new scope
        // When using an existing scope, we can't give it the same name
        // For now, an empty string will do
        let scope = new Scope(scopeName, new FieldData(fieldName, data), config);
        
        if(this.config.debug) console.log(`Clone operators`);
        // --- Update field data ---
        // Set field data updates operators with the new data
        // So here we just clone the operators
        scope.operations = this.cloneOperators();
        
        if(this.config.debug) console.log(`Replace operators data`);
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
        if(this.config.debug) console.log(`Cloning operators.`);
        
        return this.operations.map((op) => {
            if(this.config.debug) console.log(`Operator: `, op);
            if(this.config.debug) console.log(`Operator field data: `, op.fieldData);
            
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
    appendOperation(operationId: number, operationArgs = {}) {
        if(this.config.debug) console.log(`Scope/Append operation with id ${operationId}`);
        if(this.config.debug) console.log(`Scope field object: `, this.fieldData);
        
        // Create operation
        let op = new OperationController(
            operationId,
            this.fieldData,
            operationArgs,
            { debug: this.config.debug }
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
        if(this.config.debug) console.log(`Operations: `, this.operations.length);
        
        // I'm sorry guys I need results 😭😭😭😭
        let resultMessages: any[] = [];
        
        this.operations.filter((op) => {
            if(this.config.debug) console.log(`Operation: `, op);
            
            let result = op.executeAndGetMessage();
            if(result) {
                if(this.config.debug) console.log(`Result message: `, result);
                
                // Create validation result
                let resMsg = new ValidationResult();
                resMsg.setAsError(this.fieldData.fieldName, result);
                if(this.config.debug) console.log(`Adding validation result: `, resMsg);
                
                resultMessages.push(resMsg);
            }
        });
        
        if(this.config.debug) console.log(`Result messages: `, resultMessages.length);
        
        return resultMessages;
    }
    
    /**
     * Replace operations field data and this object field data
     * 
     * @param {FieldData} newData The new field data
     * @returns {this} This object
     */
    setFieldData(newData: FieldData) {
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
    getOperationsId(): Array<number> {
        let operationsId: Array<number> = [];
        
        const operations: Array<OperationController> = this.operations;
        // This was wrong before
        // It had 'op in operations' and it didn't get the type hehe
        for(const op of operations) {
            const operation: OperationController = op;
            // operationsId.push(op.operation);
            operationsId.push(operation.operation)
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
    static findByName(scopes: Array<Scope>, name: string) {
        
        // This was wrong before
        // It had 'scope in scopes' and it didn't get the type hehe
        for(const scope of scopes) {
            // Check if name match and return it
            if(scope.name === name) {
                return scope;
            }
        }
    }
}
