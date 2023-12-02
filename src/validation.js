import ValidationResult from "./validationResult.js";

/** Validate E-Mail
 * 
 * Validates length
 * Correctness
 * 
 * @param {string} email The email given
 * @param {string} fieldName Field name defaults to 'email' 
 * @returns {Circle} The new Circle object.
 */
let validateEmail = (email, fieldName = "email") => {
    
    // Check email length
    if(email.length >= 64) {
        return new ValidationResult()
            .setAsError(fieldName, "Email length can't exceed 64 characters");
    }
    if(email.length <= 5) {
        return new ValidationResult()
            .setAsError(fieldName, "Email length can't be less than 5 characters, shortest example a@b.c");
    }
    
    // Validate email with regex
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))) {
        return new ValidationResult()
            .setAsError(fieldName, "The email is invalid.");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Email is Ok");
}

// --- For property ---
/**
 * Validates property title
 * 
 * @param {string} title 
 * @param {string} fieldName 
 * @returns {ValidationResult}
 */
function validateTitle(title, fieldName = "title") {
    if(title.length >= 128) {
        return new ValidationResult()
            .setAsError(fieldName, "Title length can't exceed 128 characters");
    }
    if(title.length <= 4) {
        return new ValidationResult()
            .setAsError(fieldName, "Title length can't be less than 4 characters");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Title is Ok");
}

/**
 * Validates property description
 * 
 * @param {string} description 
 * @param {string} fieldName 
 * @returns {ValidationResult}
 */
function validateDescription(description, fieldName = "description") {
    if(email.length >= 128) {
        return new ValidationResult()
            .setAsError(fieldName, "Description length can't exceed 128 characters");
    }
    if(email.length <= 5) {
        return new ValidationResult()
            .setAsError(fieldName, "Description length can't be less than 5 characters");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Description is Ok");
}

/**
 * Validates property rooms
 * 
 * @param {string} rooms 
 * @param {string} fieldName 
 * @returns {ValidationResult}
 */
function validateRooms(rooms, fieldName = "rooms") {
    if(!rooms) {
        return new ValidationResult()
            .setAsError(fieldName, "Please select at least one room");
    }
    
    if(rooms <= 0 || rooms >= 10) {
        return new ValidationResult()
            .setAsError(fieldName, "Are you messing with the frontend?");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Rooms is Ok");
}

/**
 * Validator because doing this function by function is tiring
 * 
 */
class Validator {
    // If it has passed every test
    passed = true;
    // Gather messages here
    messages = [];
    
    /**
     * Create object with the given data.
     *
     * @author: Felix
     */
    constructor(data, fieldName) {
        this.data = data;
        this.fieldName = fieldName;
    }
    
    /**
     * If the data given is not falsy it passes the check
     */
    isNotFalsy() {
        if(!this.data) {
            this.passed = false;
        }
    }
    
    /**
     * Max length
     * 
     * @param {Number}
     */
    maxLength(length) {
        if(this.data.length > length) {
            this.passed = false;
        }
    }
    
    /**
     * Give a message if it fails
     * 
     * @param {string} msg
     * @returns {ValidationResult}
     */
    msg(msg) {
        if(!this.passed) {
            return new ValidationResult()
                .setAsError(this.fieldName, msg);
        }
    }
    
    /**
     * Get errors
     * 
     * @returns {Array}
     */
    getErrors() {
        // Gather errors
        let errors = this.messages.map((valRes, index, _a) => {
            // Check if it's an error
            if(valRes.error) {
                return valRes;
            }
        });
        
        return errors;
    }
    //     .notEmpty().withMessage("Description is required")
}

/**
 * Validates property parking
 * 
 * @param {string} parking 
 * @param {string} fieldName 
 * @returns {ValidationResult}
 */
function validateParking(parking, fieldName = "rooms") {
    if(!parking) {
        return new ValidationResult()
            .setAsError(fieldName, "Please select at least one parking");
    }
    
    if(parking <= 0 || parking >= 5) {
        return new ValidationResult()
            .setAsError(fieldName, "Are you messing with the frontend?");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Parking is Ok");
}

//             parking,
//             bathrooms,
//             street,
//             latitude,
//             longitude,
//             image: "",
//             published: false,
//             userId,
//             priceId,
//             categoryId,

export {
    validateEmail,
    validateTitle,
    validateDescription,
    validateRooms,
}
