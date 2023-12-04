const FieldData = require("../model/FieldData");
const Operation = require("../model/Operation");
const OperationController = require("./OperationController");

// Username
let username = new FieldData(
    "username",
    "FelixRiddle23"
);
let badUsername = new FieldData(
    "username",
    ""
);
// E-Mail
let email = new FieldData(
    "email",
    "felix_riddle23@email.com"
);
// Age
let age = new FieldData(
    "age",
    23
);
// Allow notifications
let allowNotifications = new FieldData(
    "allowNotifications",
    false,
);
// Favorite colors
let favoriteColors = new FieldData(
    "favoriteColors",
    ["Cyan", "Green"]
);
// Resources
let resources = new FieldData(
    "resources",
    {
        gold: 24214,
        elixir: 456324,
        wood: 4324,
    }
);

test("Data is not falsy", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        username,
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Data is falsy", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        badUsername,
    );
    
    expect(opCtrl.execute()).toBe(false);
});

test("Max length", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MaxLength,
        username,
        {
            max: 64,
        }
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Min length", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MinLength,
        username,
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
        email,
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Num range", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        age,
        {
            min: 10,
            max: 120,
        }
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is num", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNum,
        age
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is Str", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsStr,
        username,
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is bool", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsBool,
        allowNotifications
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is array", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsArray,
        favoriteColors
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is object", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsObject,
        resources,
    );
    
    expect(opCtrl.execute()).toBe(true);
});
