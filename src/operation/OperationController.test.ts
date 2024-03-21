import FieldData from "../model/FieldData";
import Operation from "../model/Operation";
import OperationController from "./OperationController";

import { testMessage } from "../test/testMessage";

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
// [Anchor]
// Anchor property, indicates that multiple sources depend on this value
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
const latitude = new FieldData(
    "latitude",
    -50.324242
);

/**
 * Is not falsy test
 */
export function testIsNotFalsy() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        username,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Data is not falsy")
}

/**
 * Data is falsy
 */
export function testDataIsFalsy() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNotFalsy,
        badUsername,
    );
    
    const result = opCtrl.execute();
    testMessage(!result, "Data is falsy");
}

/**
 * Max length
 */
export function testMaxLength() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MaxLength,
        username,
        {
            max: 64,
        }
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Max length");
}

/**
 * Min length
 */
export function testMinLength() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.MinLength,
        username,
        {
            min: 5,
        }
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Min length");
}

/**
 * Is email
 */
export function testIsEmail() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsEmail,
        email,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is email");
}

// --- Num range ---
/**
 * Num range
 */
export function testNumRange() {
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
    testMessage(result, "Num range");
}

/**
 * Test num range fail above maximum
 * 
 * I can't believe I used an '||' for a num range 😂😂😂
 * This will test that if I use an or again it will fail
 */
export function testNumFailAboveMaximum() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        age,
        {
            min: 0,
            max: 9,
        }
    );
    
    const result = opCtrl.execute();
    testMessage(!result, "Num range fail above maximum");
}

/**
 * Test num range fail below minimum
 */
export function testNumFailBelowMinimum() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.NumRange,
        age,
        {
            min: 30,
            max: 100,
        }
    );
    
    const result = opCtrl.execute();
    testMessage(!result, "Num range fail below minimum");
}

// Assert types
/**
 * Is num
 */
export function testIsNum() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsNum,
        age
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is num");
}

/**
 * Test is string
 */
export function testIsStr() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsStr,
        username,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is string");
}

/**
 * Test is string
 */
export function testIsBool() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsBool,
        allowNotifications
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is bool");
}

/**
 * Is array
 */
export function testIsArray() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsArray,
        favoriteColors
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is array");
}

/**
 * Is object
 */
export function testIsObject() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsObject,
        resources,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is object");
}

/**
 * Is int
 */
export function testIsInt() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsInt,
        age,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is integer");
}

// --- Float tests ---
/**
 * Is float
 */
export function testIsFloat() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsFloat,
        latitude,
    );
    
    const result = opCtrl.execute();
    testMessage(result, "Is float");
}

const notAFloatLongitude = new FieldData(
    "longitude",
    23
);
/**
 * Not a float
 */
export function testNotFloat() {
    // Operation controller
    let opCtrl = new OperationController(
        Operation.IsFloat,
        notAFloatLongitude,
    );
    
    const result = opCtrl.execute();
    testMessage(!result, "Not a float");
}
// -------------------

/**
 * Run all tests
 * 
 * It would be unconvenient to import them all wouldn't it?
 */
export default function runAllOperationControllerTests() {
    testIsNotFalsy();
    testDataIsFalsy();
    testMaxLength();
    testMinLength();
    testIsEmail();
    testNumRange();
    testNumFailAboveMaximum();
    testNumFailBelowMinimum();
    
    // Type assertion
    testIsNum();
    testIsStr();
    testIsBool();
    testIsArray();
    testIsObject();
    testIsInt();
    testIsFloat();
    testNotFloat();
}
