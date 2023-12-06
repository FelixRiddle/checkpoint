# Checkpoint

Data validation package and other miscellaneous things.

# Introduction

Last update: 2.0.0
This is an introduction to checkpoint

Create a validator

```javascript
import Validator from "validator";

// Create a validator and multiple scopes
let val = new Validator()
    .createScope("email", "email", "felix@email.com")
    .isNotFalsy()
    .isEmail()
    .lengthRange(5, 64)
    .isStr()
    // Use scope
    .useScope("email", "friend_email", "joe@email.com")
    // Create new scope
    // These ones pass
    .createScope("username", "username", "my_cool_username_65")
    .isNotFalsy()
    .lengthRange(5, 64)
    .isStr()
    // Phone scope
    .createScope("phone", "phone_number", 6756829123)
    .isNotFalsy()
    .isNum()
    // Use phone scope again
    // And fail both tests
    .useScope("phone", "alt_phone", "");

```

Perform validation and check if passed

```javascript
// Perform validations
let result = val.validate();

// The result should have an array of 'ValidationResult' objects
if(result.length > 0) {
    console.log(`Not all validations passed`);
}
```

Print every result message

```javascript
// Perform validations
let result = val.validate();

// Print result messages
for(let res in result) {
    console.log(`Field: ${}`, res.field);
    console.log(`Message: ${}\n`, res.message);
}
```

# Todo

- [x] Data validation
- [ ] Object validation
- [x] Scopes
