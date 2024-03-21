import Scope from "./Scope";
// import ValidationResult from "./ValidationResult";
import FieldData from "./model/FieldData";
import Operation from "./model/Operation";
import { StatusWrapper } from "felixriddle.my-types";

export interface ValidatorConfig {
    debug: boolean,
}

/**
 * Validator object
 * 
 * @author Felix Riddle
 */
export default class Validator {
    // Scopes
    scopes: Array<Scope> = [];
    config: ValidatorConfig;
    scope: Scope | undefined;
    
    /**
     * Create object with the given data.
     *
     */
    constructor(config = {
        debug: false,
    }) {
        this.config = config;
    }
    
    /**
     * Create a new scope.
     * 
     * Create a scope and set the data to it.
     * 
     * Use it for every field that needs valiation.
     * 
     * @param {string} scopeName Scope name
     * @returns {Validator} This object
     */
    createScope(scopeName: string, fieldName: string, data: any) {
        if(this.config.debug) console.log(`Create scope ${scopeName}`);
        
        let fieldData = new FieldData(fieldName, data);
        if(this.config.debug) console.log(`Field data: `, fieldData);
        
        // Create new scope
        this.scope = new Scope(scopeName, fieldData, { debug: this.config.debug });
        
        // Append scope to the list
        this.scopes.push(this.scope);
        
        return this;
    }
    
    /**
     * Use an existing scope
     * 
     * @param {string} scopeName Scope name 
     * @param {string} fieldName Field name
     * @param {*} data Data
     * @returns {Validator} This object
     */
    useScope(scopeName: string, fieldName: string, data: any) {
        // Find the scope
        let usingScope = this.findScope(scopeName);
        if(this.config.debug) console.log(`Found scope: `, usingScope);
        
        if(!usingScope) {
            throw Error(`Scope with name '${scopeName}' couldn't be found`);
        }
        
        // Deep clone of the scope
        // Clone the scope and set it an empty name,
        // because we don't want two scopes with the same name
        // That's a temporal fix btw, I don't know how to improve it for now
        let scope = usingScope.cloneWith("", fieldName, data);
        if(this.config.debug) console.log(`Deep cloned scope and with its data replaced: `, scope);
        
        // Append scope to the list
        this.scopes.push(scope);
        
        // Set as current scope
        this.scope = scope;
        
        return this;
    }
    
    /**
     * Find scope by name
     * 
     * @param {string} scopeName The scope name
     * @returns {Scope}
     */
    findScope(scopeName: string) {
        return this.scopes.find((scope) => {
            // Check if names match and return
            if(scope.name === scopeName) {
                return scope;
            }
        });
    }
    
    /**
     * Check that a scope exists, otherwise throw an error.
     */
    scopeValidation() {
        if(!this.scope) {
            throw Error("You must create a scope prior to validate the data.");
        }
    }
    
    /**
     * Validate
     * 
     * Run operations, and return its result messages
     */
    validate(): Array<StatusWrapper> {
        let results: any = [];
        
        if(this.config.debug) console.log(`Validating data`);
        
        // Run operations
        this.scopes.map((scope: Scope, _index, _a) => {
            if(this.config.debug) console.log(`Scope: `, scope.name);
            let result = scope.runOperations();
            if(this.config.debug) console.log(`Operations result: `, result);
            
            results = results.concat(result);
        });
        
        return results;
    }
    
    /**
     * Alias for validate
     */
    run(): Array<StatusWrapper> {
        return this.validate();
    }
    
    // --- Validation functions ---
    /**
     * Get 360 no scope
     */
    noScopeErrorMessage() {
        return "You must create a scope prior to validate the data.";
    }
    
    /**
     * If the data given is not falsy it passes the check
     * 
     * @returns {Validator}
     */
    isNotFalsy() {
        if(this.config.debug) console.log(`Add operation isNotFalsy`);
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        // Append operation
        this.scope.appendOperation(Operation.IsNotFalsy);
        return this;
    }
    
    /**
     * Max length
     * 
     * @param {Number}
     * @returns {Validator}
     */
    maxLength(length: number) {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        // Append operation
        this.scope.appendOperation(Operation.MaxLength, {
            length
        });
        return this;
    }
    
    /**
     * Minimum length
     * 
     * @param {number} length 
     * @returns {Validator}
     */
    minLength(length: number) {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        // Append operation
        this.scope.appendOperation(Operation.MinLength, {
            length
        });
        return this;
    }
    
    /**
     * Length range
     * 
     * @param {number} min Minimum length
     * @param {number} max Maximum length 
     * @returns {Validator}
     */
    lengthRange(min: number, max: number) {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        // Append operation
        this.scope.appendOperation(Operation.LengthRange, {
            min,
            max
        });
        return this;
    }
    
    /**
     * Check if it's an email
     * 
     * @returns {Validator}
     */
    isEmail() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsEmail);
        return this;
    }
    
    // - Data types -
    /**
     * Check if the data given is a number
     * 
     * @returns {Validator}
     */
    isNum() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsNum);
        return this;
    }
    
    /**
     * Check if the data given is an integer
     * 
     * @returns {Validator}
     */
    isInt() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsInt);
        return this;
    }
    
    /**
     * Check if the data given is a float
     * 
     * @returns {Validator}
     */
    isFloat() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsFloat);
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
    numRange(min: number, max: number) {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.NumRange, {min, max});
        return this;
    }
    
    /**
     * 
     * Check if the data given is a number
     * 
     * @returns {Validator}
     */
    isStr() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsStr);
        return this;
    }
    
    /**
     * 
     * Check if the data given is a boolean
     * 
     * @returns {Validator}
     */
    isBool() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsBool);
        return this;
    }
    
    /**
     * 
     * Check if the data given is an array
     * 
     * @returns {Validator}
     */
    isArray() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsArray);
        return this;
    }
    
    /**
     * 
     * Check if the data given is an object
     * 
     * @returns {Validator}
     */
    isObject() {
        if(!this.scope) {
            throw Error(this.noScopeErrorMessage());
        }
        
        this.scope.appendOperation(Operation.IsObject);
        return this;
    }
}
