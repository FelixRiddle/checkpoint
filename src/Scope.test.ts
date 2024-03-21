import Scope from "./Scope";
import FieldData from "./model/FieldData";
import Operation from "./model/Operation";

import { testMessage } from "./test/testMessage";

/**
 * Test string validation
 */
export function testStringValidation() {
    const fieldName = "username";
    const fieldValue = "FelixRiddle23";
    
    // Create scope
    let sc = new Scope(
        "username",
        new FieldData(fieldName, fieldValue),
    );
    
    // Add operations
    sc.appendOperation(Operation.IsStr);
    sc.appendOperation(Operation.MinLength, { min: 3 });
    sc.appendOperation(Operation.MaxLength, { max: 64 });
    sc.appendOperation(
        Operation.LengthRange,
        {
            min: 3,
            max: 64,
        }
    );
    const opRes = sc.runOperations();
    
    testMessage(opRes.length === 0, "String validation");
}
