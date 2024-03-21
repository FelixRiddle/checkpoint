// Operations library
// 
// Here is the functionality of a given operation
/**
 * If the data given is not falsy it passes the check
 * 
 * @returns {boolean}
 */
function isNotFalsy(data: any) {
    return data && true || false;
}

/**
 * Max length
 * 
 * @param {string} data Some text
 * @param {number} length Maximum length
 * @returns {boolean}
 */
function maxLength(data: string, length: number) {
    return data.length <= length;
}

/**
 * Minimum length
 * 
 * @param {string} data Some text
 * @param {number} length Minimum length
 * @returns {boolean}
 */
function minLength(data: string, length: number) {
    return data.length >= length;
}

/**
 * Length range of some text
 * 
 * @param {string} data Some text
 * @param {number} minLen Minimum length
 * @param {number} maxLen Maximum length
 * @returns {boolean} True if it's in the range
 */
function lengthRange(data: string, minLen: number, maxLen: number) {
    return data.length >= minLen && data.length <= maxLen;
}

/**
 * Check if it's an email
 * 
 * @param {string} data Some text
 * @returns {boolean}
 */
function isEmail(data: string) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data));
}

// - Data types -
/**
 * 
 * Check if the data given is a number
 * 
 * Regardless of whether it's int or float
 * 
 * @param {*} data Any kind of data type
 * @returns {boolean}
 */
function isNum(data: any) {
    return (typeof(data) === typeof(0)) || (typeof(data) === typeof(0.0));
}

/**
 * Check if the given type is integer
 * 
 * @param {*} data Data object
 * @returns {boolean}
 */
function isInt(data: any) {
    return typeof(data) === typeof(0);
}

/**
 * Check if the given type is float
 * 
 * @param {*} data Data object
 * @returns {boolean}
 */
function isFloat(data: any) {
    return !(data % 1 === 0);
}

/**
 * 
 * Number range
 * 
 * Doesn't check whether the field is a number, this should be done before
 * 
 * @param {number} data A given number
 * @param {number} min Range start
 * @param {number} max Range end
 * @returns {boolean}
 */
function numRange(data: number, min: number, max: number) {
    return (data >= min && data <= max);
}

/**
 * 
 * Check if the data given is a number
 * 
 * @param {*} data Any kind of data type
 * @returns {boolean}
 */
function isStr(data: any) {
    return (typeof(data) === typeof(""));
}

/**
 * 
 * Check if the data given is a boolean
 * 
 * @param {*} data Any kind of data type
 * @returns {boolean}
 */
function isBool(data: any) {
    return (typeof(data) === typeof(true));
}

/**
 * 
 * Check if the data given is an array
 * 
 * @param {*} data Any kind of data type
 * @returns {boolean}
 */
function isArray(data: any) {
    return (typeof(data) === typeof([]));
}

/**
 * 
 * Check if the data given is an object
 * 
 * @param {*} data Any kind of data type
 * @returns {boolean}
 */
function isObject(data: any) {
    return (typeof(data) === typeof({}));
}

const FUNCTIONS = {
    isNotFalsy,
    maxLength,
    minLength,
    lengthRange,
    isEmail,
    isNum,
    isInt,
    isFloat,
    numRange,
    isStr,
    isBool,
    isArray,
    isObject,
}

export default FUNCTIONS;
