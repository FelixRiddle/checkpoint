// Operation controller
//
// Operation is low level code, normally you would use one of the high level apis
const FailureMessage = require("./FailureMessage");
const Operation = require("../model/Operation");
const operationLib = require("./operationLib");
const FieldData = require("../model/FieldData");

/**
 * Operation controller class
 * 
 * This is used to perform operations more easily.
 */
module.exports = class OperationController {
    
    /**
     * Create operation controller
     * 
     * @param {number} operation Operation id.
     * @param {FieldData} fieldData Field data container
     * @param {object} args Operation arguments, like max length, min length, etc.
     * For the args it doesn't matter the names, just the order.
     */
    constructor(operation, fieldData, args = {}) {
        this.operation = operation;
        this.fieldData = fieldData;
        this.args = args;
    }
    
    /**
     * Execute a validation operation
     * 
     * Returns the result of it.
     * 
     * @returns {bool} 
     */
    execute() {
        let result = false;
        
        // Execute operation
        switch(this.operation) {
            case(Operation.IsNotFalsy): {
                result = operationLib.isNotFalsy(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.MaxLength: {
                result = operationLib.maxLength(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.MinLength: {
                result = operationLib.minLength(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsEmail: {
                result = operationLib.isEmail(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.NumRange: {
                result = operationLib.numRange(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsNum: {
                result = operationLib.isNum(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsStr: {
                result = operationLib.isStr(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsBool: {
                result = operationLib.isBool(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsArray: {
                result = operationLib.isArray(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.IsObject: {
                result = operationLib.isObject(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            case Operation.LengthRange: {
                result = operationLib.lengthRange(this.fieldData.data, ...Object.values(this.args));
                break;
            }
            default: {
                throw Error("The given operation id does not exist.");
            }
        };
        
        return result;
    }
    
    /**
     * Get the failure message of an operation
     * 
     * @returns {string} 
     */
    failureMessage() {
        let result = "";
        
        // Create object
        let failMsg = new FailureMessage(this.fieldData);
        
        // Execute operation
        switch(this.operation) {
            case(Operation.IsNotFalsy): {
                result = failMsg.isNotFalsy(...Object.values(this.args));
                break;
            }
            case Operation.MaxLength: {
                result = failMsg.maxLength(...Object.values(this.args));
                break;
            }
            case Operation.MinLength: {
                result = failMsg.minLength(...Object.values(this.args));
                break;
            }
            case Operation.IsEmail: {
                result = failMsg.isEmail(...Object.values(this.args));
                break;
            }
            case Operation.NumRange: {
                result = failMsg.numRange(...Object.values(this.args));
                break;
            }
            case Operation.IsNum: {
                result = failMsg.isNum(...Object.values(this.args));
                break;
            }
            case Operation.IsStr: {
                result = failMsg.isStr(...Object.values(this.args));
                break;
            }
            case Operation.IsBool: {
                result = failMsg.isBool(...Object.values(this.args));
                break;
            }
            case Operation.IsArray: {
                result = failMsg.isArray(...Object.values(this.args));
                break;
            }
            case Operation.IsObject: {
                result = failMsg.isObject(...Object.values(this.args));
                break;
            }
            case Operation.LengthRange: {
                result = failMsg.lengthRange(...Object.values(this.args));
                break;
            }
            default: {
                throw Error("The given operation id does not exist.");
            }
        };
        
        return result;
    }
    
    /**
     * Execute an operation and get the message
     * 
     * Note the result may be undefined if the message for the operation result doesn't exist.
     * 
     * For now the messages that don't exist are:
     * - Every success message
     * 
     * @returns {*} string or undefined 
     */
    executeAndGetMessage() {
        let opResult = this.execute();
        
        // Execute operation
        if(!opResult) {
            let failureMessage = this.failureMessage();
            return failureMessage; 
        }
    }
};
