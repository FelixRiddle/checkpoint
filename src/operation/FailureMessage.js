/**
 * Failure messages for validation operations
 * 
 * Made into a class so that the functions have less parameters.
 */
module.exports = class FailureMessages {
    /**
     * Create object with the field name
     * 
     * @param {string} fieldName The field name
     * @param {*} data Data for some messages
     */
    constructor(fieldName, data) {
        this.fieldName = fieldName;
        this.data = data;
    }
    
    /**
    * Is not falsy failure message
    * 
    * @returns {string}
    */
    isNotFalsy() {
        return `The field ${this.fieldName} is falsy, that means the data given is not correct.`;
    }
    
    /**
    * Max length failure message
    * 
    * @param {number} length Maximum length
    * @returns {string}
    */
    maxLength(length) {
        return `The field ${this.fieldName} can't exceed ${length} characters.`;
    }
    
    /**
    * Minimum length
    * 
    * @param {number} length Minimum length
    * @returns {string}
    */
    minLength(length) {
        return `The field ${this.fieldName} can't have less than ${length} characters.`;
    }
    
    /**
    * Email message
    * 
    * @returns {string}
    */
    isEmail() {
        return `The field ${this.fieldName} is not an E-Mail.`;
    }
    
    // - Data types -
    /**
    * Is number
    * 
    * @returns {string}
    */
    isNum() {
        return `The field ${this.fieldName} is not a number.`;
    }
    
    /**
    * 
    * Number range
    * 
    * @param {number} min Range start
    * @param {number} max Range end
    * @returns {string}
    */
    numRange(min, max) {
        return `The field ${this.fieldName} is not in the number range ${min} to ${max}.`;
    }
    
    /**
    * 
    * Is string
    * 
    * @returns {string}
    */
    isStr() {
        return `The field ${this.fieldName} is not a string.`;
    }
    
    /**
    * 
    * Is bool
    * 
    * @returns {string}
    */
    isBool() {
        return `The field ${this.fieldName} is not a boolean.`;
    }
    
    /**
    * 
    * Is array
    * 
    * @returns {string}
    */
    isArray() {
        return `The field ${this.fieldName} is not an array.`;
    }
    
    /**
    * 
    * Is object
    * 
    * @returns {string}
    */
    isObject() {
        return `The field ${this.fieldName} is not an object.`;
    }
    
    /**
    * Length range of some text
    * 
    * @param {number} minLen Minimum length
    * @param {number} maxLen Maximum length
    * @returns {string}
    */
    lengthRange(minLen, maxLen) {
        return `The field ${this.fieldName} must be in the range of ${minLen} - ${maxLen} characters, current length: ${this.data.length}.`;
    }
};

