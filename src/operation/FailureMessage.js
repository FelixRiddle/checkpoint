const FieldData = require("../model/FieldData");

/**
 * Failure messages for validation operations
 * 
 * Made into a class so that the functions have less parameters.
 */
module.exports = class FailureMessages {
    /**
     * Create object with the field name
     * 
     * @param {FieldData} fieldData Field data
     */
    constructor(fieldData) {
        this.fieldData = fieldData;
    }
    
    /**
    * Is not falsy failure message
    * 
    * @returns {string}
    */
    isNotFalsy() {
        return `The field ${this.fieldData.fieldName} is falsy, that means the data given is not correct.`;
    }
    
    /**
    * Max length failure message
    * 
    * @param {number} length Maximum length
    * @returns {string}
    */
    maxLength(length) {
        return `The field ${this.fieldData.fieldName} can't exceed ${length} characters.`;
    }
    
    /**
    * Minimum length
    * 
    * @param {number} length Minimum length
    * @returns {string}
    */
    minLength(length) {
        return `The field ${this.fieldData.fieldName} can't have less than ${length} characters.`;
    }
    
    /**
    * Email message
    * 
    * @returns {string}
    */
    isEmail() {
        return `The field ${this.fieldData.fieldName} is not an E-Mail.`;
    }
    
    // - Data types -
    /**
    * Is number
    * 
    * @returns {string}
    */
    isNum() {
        return `The field ${this.fieldData.fieldName} is not a number.`;
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
        return `The field ${this.fieldData.fieldName} is not in the number range ${min} to ${max}.`;
    }
    
    /**
    * 
    * Is string
    * 
    * @returns {string}
    */
    isStr() {
        return `The field ${this.fieldData.fieldName} is not a string.`;
    }
    
    /**
    * 
    * Is bool
    * 
    * @returns {string}
    */
    isBool() {
        return `The field ${this.fieldData.fieldName} is not a boolean.`;
    }
    
    /**
    * 
    * Is array
    * 
    * @returns {string}
    */
    isArray() {
        return `The field ${this.fieldData.fieldName} is not an array.`;
    }
    
    /**
    * 
    * Is object
    * 
    * @returns {string}
    */
    isObject() {
        return `The field ${this.fieldData.fieldName} is not an object.`;
    }
    
    /**
    * Length range of some text
    * 
    * @param {number} minLen Minimum length
    * @param {number} maxLen Maximum length
    * @returns {string}
    */
    lengthRange(minLen, maxLen) {
        return `The field ${this.fieldData.fieldName} must be in the range of ${minLen} - ${maxLen} characters, current length: ${this.fieldData.data.length}.`;
    }
};

