import {
    testEmailScope,
    testWrongEmailReturnsErrorMessages,
    testScopes,
    testSameScopeDifferentField,
    testScopeAssertErrors,
    testMultipleScopes,
    testFullFledgedFrontendValidation,
} from "../Validator.test";

/**
 * Run all tests
 */
export default function runAllTests() {
    testEmailScope();
    testWrongEmailReturnsErrorMessages();
    testScopes();
    testSameScopeDifferentField();
    testScopeAssertErrors();
    testMultipleScopes();
    testFullFledgedFrontendValidation();
}
