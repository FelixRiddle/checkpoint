/**
 * Operations enum
 */
module.exports = class Operation {
    // Classics
    IsNotFalsy = 0;
    MaxLength = 1;
    MinLength = 2;
    IsEmail = 3;
    NumRange = 4;
    // Types
    IsNum = 5;
    IsStr = 6;
    IsBool = 7;
    IsArray = 8;
    IsObject = 9;
    // Others that were made after the previous ones
    LengthRange = 10;
    
    /**
     * Get an operation by name
     * 
     * @param {string} name Operation name
     * @returns {number} Id of the operation in the enum
     */
    static getByName(name) {
        return this[name];
    }
    
    /**
     * Execute a validation operation
     * 
     * Returns the result of it.
     * 
     * @param {number} operation Operation enum id.
     * @param {object} args Optional arguments that some operations require.
     * @returns {bool} 
     */
    static execute(operation, args = {}) {
    }
};


