// Operation controller
//
// Operation is low level code, normally you would use one of the high level apis
import FailureMessage from "./FailureMessage";
import Operation from "../model/Operation";
import OperationFunctions from "./operationLib";
import FieldData from "../model/FieldData";

interface OperationControllerConfig {
    debug: boolean;
}

/**
 * Operation controller class
 * 
 * This is used to perform operations more easily.
 */
export default class OperationController {
    operation: number;
    fieldData: FieldData;
    config: OperationControllerConfig;
    // I need results 😭😭😭
    // I'll fix it later
    args: any;
    
    /**
     * Create operation controller
     * 
     * @param {number} operation Operation id.
     * @param {FieldData} fieldData Field data container
     * @param {object} args Operation arguments, like max length, min length, etc.
     * 
     * The name doesn't matter, what matters for the 'args' argument is the order.
     */
    constructor(operation: number, fieldData: FieldData, args = {}, config = { debug: false }) {
        this.operation = operation;
        this.fieldData = fieldData;
        this.args = args;
        this.config = config;
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
    
    /**
     * Perform a deep clone
     * 
     * @returns {OperationController} A clone of this 'OperationController'.
     */
    clone() {
        if(this.config.debug) console.log(`Operation controller: `, this);
        
        // Clone the field
        let newField = this.fieldData.clone();
        
        // Clone the rest
        let operation = JSON.parse(JSON.stringify(this.operation));
        let args = JSON.parse(JSON.stringify(this.args));
        
        return new OperationController(operation, newField, args);
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
        
        // 😭😭
        const values: any[] = Object.values(this.args);
        
        // Execute operation
        switch(this.operation) {
            case(Operation.IsNotFalsy): {
                result = OperationFunctions.isNotFalsy(this.fieldData.data);
                break;
            }
            case Operation.MaxLength: {
                result = OperationFunctions.maxLength(this.fieldData.data, values[0]);
                break;
            }
            case Operation.MinLength: {
                result = OperationFunctions.minLength(this.fieldData.data, values[0]);
                break;
            }
            case Operation.IsEmail: {
                result = OperationFunctions.isEmail(this.fieldData.data);
                break;
            }
            case Operation.NumRange: {
                result = OperationFunctions.numRange(this.fieldData.data, values[0], values[1]);
                break;
            }
            case Operation.IsNum: {
                result = OperationFunctions.isNum(this.fieldData.data);
                break;
            }
            case Operation.IsStr: {
                result = OperationFunctions.isStr(this.fieldData.data);
                break;
            }
            case Operation.IsBool: {
                result = OperationFunctions.isBool(this.fieldData.data);
                break;
            }
            case Operation.IsArray: {
                result = OperationFunctions.isArray(this.fieldData.data);
                break;
            }
            case Operation.IsObject: {
                result = OperationFunctions.isObject(this.fieldData.data);
                break;
            }
            case Operation.LengthRange: {
                result = OperationFunctions.lengthRange(this.fieldData.data, values[0], values[1]);
                break;
            }
            case Operation.IsInt: {
                result = OperationFunctions.isInt(this.fieldData.data);
                break;
            }
            case Operation.IsFloat: {
                result = OperationFunctions.isFloat(this.fieldData.data);
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
        
        // TODO: Fix
        const values: any[] = Object.values(this.args);
        
        // Execute operation
        switch(this.operation) {
            case(Operation.IsNotFalsy): {
                result = failMsg.isNotFalsy();
                break;
            }
            case Operation.MaxLength: {
                result = failMsg.maxLength(values[0]);
                break;
            }
            case Operation.MinLength: {
                result = failMsg.minLength(values[0]);
                break;
            }
            case Operation.IsEmail: {
                result = failMsg.isEmail();
                break;
            }
            case Operation.NumRange: {
                result = failMsg.numRange(values[0], values[1]);
                break;
            }
            case Operation.IsNum: {
                result = failMsg.isNum();
                break;
            }
            case Operation.IsStr: {
                result = failMsg.isStr();
                break;
            }
            case Operation.IsBool: {
                result = failMsg.isBool();
                break;
            }
            case Operation.IsArray: {
                result = failMsg.isArray();
                break;
            }
            case Operation.IsObject: {
                result = failMsg.isObject();
                break;
            }
            case Operation.LengthRange: {
                result = failMsg.lengthRange(values[0], values[1]);
                break;
            }
            case Operation.IsInt: {
                result = failMsg.isInt();
                break;
            }
            case Operation.IsFloat: {
                result = failMsg.isFloat();
                break;
            }
            default: {
                throw Error("The given operation id does not exist.");
            }
        };
        
        return result;
    }
}
