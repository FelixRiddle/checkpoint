const op = require("./operationLib");

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
     * @param {*} data Given data to perform the operation on.
     * @param {object} args Optional arguments that some operations require.
     * @returns {bool} 
     */
    static execute(operation, data, args = {}) {
        let result = false;
        
        // Execute operation
        switch(operation) {
            case(this.IsNotFalsy): {
                result = op.isNotFalsy(data, ...Object.values(args));
                break;
            }
            case this.MaxLength: {
                result = op.maxLength(data, ...Object.values(args));
                break;
            }
            case this.MinLength: {
                result = op.minLength(data, ...Object.values(args));
                break;
            }
            case this.IsEmail: {
                result = op.isEmail(data, ...Object.values(args));
                break;
            }
            case this.NumRange: {
                result = op.numRange(data, ...Object.values(args));
                break;
            }
            case this.IsNum: {
                result = op.isNum(data, ...Object.values(args));
                break;
            }
            case this.IsStr: {
                result = op.isStr(data, ...Object.values(args));
                break;
            }
            case this.IsBool: {
                result = op.isBool(data, ...Object.values(args));
                break;
            }
            case this.IsArray: {
                result = op.isArray(data, ...Object.values(args));
                break;
            }
            case this.IsObject: {
                result = op.isObject(data, ...Object.values(args));
                break;
            }
            case this.LengthRange: {
                result = op.lengthRange(data, ...Object.values(args));
                break;
            }
            default: {
                throw Error("The given operation id does not exist.");
            }
        };
        
        return result;
    }
};

