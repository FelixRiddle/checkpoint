const Scope = require("./Scope.js");
const FieldData = require("./model/FieldData.js");
const Operation = require("./model/Operation");

let fieldName = "username";
let fieldValue = "FelixRiddle23";

test("String validation", () => {
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
    let opRes = sc.runOperations();
    
    expect(opRes.length)
        .toBe(0);
});
