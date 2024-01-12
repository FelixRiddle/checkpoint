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
// Latitude
let latitude = new FieldData(
    "latitude",
    -50.324242
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

// --- Num range ---
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
    const result = opCtrl.execute();
    
    expect(result).toBe(true);
});

// I can't believe I used an '||' for a num range 😂😂😂
// This will test that if I use an or again it will fail
test("Num range 2(fail above maximum)", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        10,
        {
            min: 0,
            max: 9,
        }
    );
    const result = opCtrl.execute();
    
    expect(!result).toBe(true);
});

test("Num range 3(fail below minimum)", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        -1,
        {
            min: 0,
            max: 9,
        }
    );
    const result = opCtrl.execute();
    
    expect(!result).toBe(true);
});
// -----------------

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

test("Is int", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsInt,
        age,
    );
    
    expect(opCtrl.execute()).toBe(true);
});

test("Is float", () => {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsInt,
        latitude,
    );
    
    expect(opCtrl.execute()).toBe(true);
});
