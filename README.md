# Checkpoint

Data validation package and other miscellaneous things.

## Introduction

This is an introduction to checkpoint version 1.0.1

Create a validator

```javascript
import Validator from "validator";

// Create validator
let val = new Validator(
    "some_email@gugl",
    "email",
);
```

Validate an E-Mail

```javascript
// Validate that it's an email
let emailVal = new Validator(
        "some_email@gugl",
        "email",
    )
    .isNotFalsy() // The data is not a falsy value
    .isEmail() // Check if email is correct
    .maxLength(64) // Check its length doesn't exceed 64 characters
    .minLength(5); // Length can't be less than 5 characters
```

Check if tests passed

```javascript
if(emailVal.passed) {
    console.log(`Yay! Tests passed!`);
} else {
    console.log(`Please try again!`);
}
```

# Todo

- [x] Data validation
- [ ] Object validation
- [ ] Scopes
