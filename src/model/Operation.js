/**
 * Operations enum
 */
module.exports = class Operation {
    // Classics
    static IsNotFalsy = 0;
    static MaxLength = 1;
    static MinLength = 2;
    static IsEmail = 3;
    static NumRange = 4;
    // Types
    static IsNum = 5;
    static IsStr = 6;
    static IsBool = 7;
    static IsArray = 8;
    static IsObject = 9;
    // Others that were made after the previous ones
    static LengthRange = 10;
    static IsInt = 11;
    static IsFloat = 12;
    
    /**
     * Get an operation by name
     * 
     * @param {string} name Operation name
     * @returns {number} Id of the operation in the enum
     */
    static getByName(name) {
        return this[name];
    }
};


