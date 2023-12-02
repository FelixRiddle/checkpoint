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
    }
    
    /**
     * If the data given is not falsy it passes the check
     * 
     * @returns {Validator}
     */
    isNotFalsy() {
        if(!this.data) {
            this.passed = false;
            this.lastCheckpoint = "isNotFalsy";
            this.messages.push(
                new ValidationResult()
                    .setAsError(
                        this.fieldName,
                        `The field ${this.fieldName} is falsy, that means the data given is not correct.`
                    )
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
        if(this.data.length > length) {
            this.passed = false;
            this.lastCheckpoint = "maxLength";
            this.messages.push(
                new ValidationResult()
                    .setAsError(
                        this.fieldName,
                        `The field ${this.fieldName} can't exceed ${length} characters.`
                    )
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
            this.passed = false;
            this.lastCheckpoint = "isEmail";
            this.messages.push(
                new ValidationResult()
                    .setAsError(
                        this.fieldName,
                        `The field ${this.fieldName} is not an E-Mail.`
                    )
            );
        }
        
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
