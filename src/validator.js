/**
 * Validator object
 * 
 */
module.exports = class Validator {
    // If it has passed every test
    passed = true;
    // Gather messages here
    messages = [];
    
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
        }
        
        return this;
    }
    
    /**
     * Give a message if it fails
     * 
     * @param {string} msg
     * @returns {ValidationResult}
     */
    msg(msg) {
        if(!this.passed) {
            return new ValidationResult()
                .setAsError(this.fieldName, msg);
        }
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
}
