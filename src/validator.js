const Scope = require("./scope");
const ValidationResult = require("./validationResult");

/**
 * Validator object
 * 
 */
module.exports = class Validator {
    // If it has passed every test
    passed = true;
    // Gather messages here
    messages = [];
    // Know you checkpoint
    lastCheckpoint = "";
    
    /**
     * Create object with the given data.
     *
     * @author: Felix
     */
    constructor(data, fieldName) {
        this.data = data;
        this.fieldName = fieldName;
        
        // Use the scope to record operations
        this.scope = new Scope(fieldName);
    }
    
    // --- Validation functions ---
    /**
     * If the data given is not falsy it passes the check
     * 
     * @returns {Validator}
     */
    isNotFalsy() {
        // Append operation
        this.scope.appendOperation("isNotFalsy");
        
        if(!this.data) {
            // Insert new failed checkpoint
            this.appendFailedCheckpoint(
                "isNotFalsy",
                `The field ${this.fieldName} is falsy, that means the data given is not correct.`
            );
        }
        
        return this;
    }
    
    /**
     * Max length
     * 
     * @param {Number}
     * @returns {Validator}
     */
    maxLength(length) {
        // Append operation
        this.scope.appendOperation("maxLength", {});
        
        if(this.data.length > length) {
            // Insert new failed checkpoint
            this.appendFailedCheckpoint(
                "maxLength",
                `The field ${this.fieldName} can't exceed ${length} characters.`
            );
        }
        
        return this;
    }
    
    /**
     * Minimum length
     * 
     * @param {Number} length 
     * @returns {Validator}
     */
    minLength(length) {
        // Append operation
        this.scope.appendOperation("minLength");
        
        if(this.data.length < length) {
            // Insert new failed checkpoint
            this.appendFailedCheckpoint(
                "minLength",
                `The field ${this.fieldName} can't have less than ${length} characters.`
            );
        }
        
        return this;
    }
    
    /**
     * Check if it's an email
     * 
     * @returns {Validator}
     */
    isEmail() {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data))) {
            // Insert new failed checkpoint
            this.appendFailedCheckpoint(
                "isEmail",
                `The field ${this.fieldName} is not an E-Mail.`
            );
        }
        
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
        if(!(typeof(this.data) === typeof(0))) {
            this.appendFailedCheckpoint(
                "isNum",
                `The field ${this.fieldName} is not a number.`
            );
        }
        
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
        if(this.data < min || this.data > max) {
            this.appendFailedCheckpoint(
                "numRange",
                `The field ${this.fieldName} is not in the number range ${min} to ${max}.`
            );
        }
        
        return this;
    }
    
    /**
     * 
     * Check if the data given is a number
     * 
     * @returns {Validator}
     */
    isStr() {
        if(!(typeof(this.data) === typeof(""))) {
            this.appendFailedCheckpoint(
                "isStr",
                `The field ${this.fieldName} is not a string.`
            );
        }
        
        return this;
    }
    
    /**
     * 
     * Check if the data given is a boolean
     * 
     * @returns {Validator}
     */
    isBool() {
        if(!(typeof(this.data) === typeof(true))) {
            this.appendFailedCheckpoint(
                "isBool",
                `The field ${this.fieldName} is not a boolean.`
            );
        }
        
        return this;
    }
    
    /**
     * 
     * Check if the data given is an array
     * 
     * @returns {Validator}
     */
    isArray() {
        if(!(typeof(this.data) === typeof([]))) {
            this.appendFailedCheckpoint(
                "isArr",
                `The field ${this.fieldName} is not an array.`
            );
        }
        
        return this;
    }
    
    /**
     * 
     * Check if the data given is an object
     * 
     * @returns {Validator}
     */
    isObject() {
        if(!(typeof(this.data) === typeof({}))) {
            this.appendFailedCheckpoint(
                "isObject",
                `The field ${this.fieldName} is not an object.`
            );
        }
        
        return this;
    }
    
    // --- Miscellaneous ---
    
    /**
     * Add a failed checkpoint
     * 
     * @param {string} checkpointName 
     * @param {string} message 
     * @returns {Validator}
     */
    appendFailedCheckpoint(checkpointName, message) {
        this.passed = false;
        this.lastCheckpoint = checkpointName;
        this.messages.push(
            new ValidationResult()
                .setAsError(
                    this.fieldName,
                    message,
                )
        );
        
        return this;
    }
    
    /**
     * Override message of the previous check
     * 
     * @param {string} msg
     * @returns {ValidationResult}
     */
    overrideMessage(msg) {
        // Fetch last message and change it.
        this.fetchLastMessage().message = msg;
        
        return this;
    }
    
    /**
     * Get errors
     * 
     * @returns {Array}
     */
    getErrors() {
        // Gather errors
        let errors = this.messages.map((valRes, _index, _a) => {
            // Check if it's an error
            if(valRes.error) {
                return valRes;
            }
        });
        
        return errors;
    }
    
    // --- Transform Validator ---
    /**
     * Fetch last message
     * 
     * @param {boolean} pop Remove it from the list
     * @returns {ValidationResult}
     */
    fetchLastMessage(pop = false) {
        // If pop, remove it and return
        if(pop) {
            return this.messages.pop();
        }
        
        // Fetch last message
        let lastMessage = this.messages[this.messages.length - 1];
        
        return lastMessage;
    }
}
