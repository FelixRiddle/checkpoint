// Checkpoint package
const ValidationResult = require("./src/validationResult.js");
const formFetchAllValues = require("./src/formFetchAllValues.js");
const Validator = require("./src/validator.js");

// Operation
const FailureMessage = require("./src/operation/FailureMessage.js");
const Operation = require("./src/operation/Operation.js");
const OperationController = require("./src/operation/OperationController.js");
const operationLib = require("./src/operation/operationLib.js");

// Re-Exports
module.exports = {
    formFetchAllValues,
    ValidationResult,
    Validator,
    operation: {
        FailureMessage,
        Operation,
        OperationController,
        operationLib,
    }
};
