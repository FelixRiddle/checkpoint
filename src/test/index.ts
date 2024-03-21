import runAllValidationTests from "../Validator.test";
import runAllOperationControllerTests from "../operation/OperationController.test";

/**
 * Run all tests
 */
export default function runAllTests() {
    runAllValidationTests();
    runAllOperationControllerTests();
}
