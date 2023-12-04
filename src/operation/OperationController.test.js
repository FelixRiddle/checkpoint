const Operation = require("./Operation");
const OperationController = require("./OperationController");

test("Data is not falsy", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        "name",
        "Felix",
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Data is falsy", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        "name",
        "",
    );
    
    expect(opCtrl.execute()).toBe(false);
});

test("Max length", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MaxLength,
        "name",
        "Felix",
        {
            max: 5,
        }
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Min length", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MinLength,
        "name",
        "Felix",
        {
            min: 5,
        }
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is email", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsEmail,
        "name",
        "felix@email.com",
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Num range", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        "number",
        5,
        {
            min: 1,
            max: 10,
        }
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is num", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNum,
        "number",
        5,
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is Str", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsStr,
        "name",
        "Felix"
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is bool", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsBool,
        "fieldName",
        true
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is array", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsArray,
        "fieldName",
        []
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is object", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsObject,
        "fieldName",
        {}
    );
    
    expect(opCtrl.execute()).toBe(true);
});
