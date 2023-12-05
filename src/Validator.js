const Scope = require("./Scope");
const ValidationResult = require("./ValidationResult");
const Operation = require("./model/Operation");

/**
 * Validator object
 * 
 * @author Felix Riddle
 */
module.exports = class Validator {
    // If every test has passed
    passed = true;
    // Scopes
    scopes = [];
    
    /**
     * Create object with the given data.
     *
     */
    constructor(config = {}) { }
    
    /**
     * Create a new scope.
     * 
     * Create a scope and set the data to it.
     * 
     * Use it for every field that needs valiation.
     * 
     * @param {string} scopeName Scope name
     * @returns {Validator} This object
     */
    createScope(scopeName, fieldName, data) {
        // Create new scope
        this.scope = new Scope(scopeName, fieldName, data);
        
        // Append scope to the list
        this.scopes.push(this.scope);
        
        return this;
    }
    
    /**
     * Check that a scope exists, otherwise throw an error.
     */
    scopeValidation() {
        if(!this.scope) {
            throw Error("You must create a scope prior to validate the data.");
        }
    }
    
    /**
     * Validate
     * 
     * Run operations, and return its result messages
     * 
     * @returns {Array} An array of 'ValidationResult'
     */
    validate() {
        let results = [];
        
        // Run operations
        this.scopes.map((scope, _index, _a) => {
            let result = scope.runOperations();
            
            results = results.concat(result);
        });
        
        return results;
    }
    
    /**
     * Alias for validate
     * 
     * @returns {Array} An array of 'ValidationResult'
     */
    run() {
        return this.validate();
    }
    
    // --- Validation functions ---
    /**
     * If the data given is not falsy it passes the check
     * 
     * @returns {Validator}
     */
    isNotFalsy() {
        this.scopeValidation();
        
        // Append operation
        this.scope.appendOperation(Operation.IsNotFalsy);
        return this;
    }
    
    /**
     * Max length
     * 
     * @param {Number}
     * @returns {Validator}
     */
    maxLength(length) {
        this.scopeValidation();
        
        // Append operation
        this.scope.appendOperation(Operation.MaxLength, {
            length
        });
        return this;
    }
    
    /**
     * Minimum length
     * 
     * @param {Number} length 
     * @returns {Validator}
     */
    minLength(length) {
        this.scopeValidation();
        
        // Append operation
        this.scope.appendOperation(Operation.MinLength, {
            length
        });
        return this;
    }
    
    /**
     * Length range
     * 
     * @param {number} min Minimum length
     * @param {number} max Maximum length 
     * @returns {Validator}
     */
    lengthRange(min, max) {
        this.scopeValidation();
        
        // Append operation
        this.scope.appendOperation(Operation.LengthRange, {
            min,
            max
        });
        return this;
    }
    
    /**
     * Check if it's an email
     * 
     * @returns {Validator}
     */
    isEmail() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsEmail);
        return this;
    }
    
    // - Data types -
    /**
     * 
     * Check if the data given is a number
     * 
     * @returns {Validator}
     */
    isNum() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsNum);
        return this;
    }
    
    /**
     * 
     * Number range
     * 
     * Doesn't check whether the field is a number, this should be done before
     * 
     * @returns {Validator}
     */
    numRange(min, max) {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.NumRange, {min, max});
        return this;
    }
    
    /**
     * 
     * Check if the data given is a number
     * 
     * @returns {Validator}
     */
    isStr() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsStr);
        return this;
    }
    
    /**
     * 
     * Check if the data given is a boolean
     * 
     * @returns {Validator}
     */
    isBool() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsBool);
        return this;
    }
    
    /**
     * 
     * Check if the data given is an array
     * 
     * @returns {Validator}
     */
    isArray() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsArray);
        return this;
    }
    
    /**
     * 
     * Check if the data given is an object
     * 
     * @returns {Validator}
     */
    isObject() {
        this.scopeValidation();
        
        this.scope.appendOperation(Operation.IsObject);
        return this;
    }
}
