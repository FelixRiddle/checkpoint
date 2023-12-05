/**
 * Field data class
 * 
 * It stores the field data, like the field name, its data, and stuff.
 */
module.exports = class FieldData {
    /**
     * Create field data
     * 
     * @param {string} fieldName Field name
     * @param {*} data Data
     */
    constructor(fieldName, data) {
        this.fieldName = fieldName;
        this.data = data;
    }
    
    /**
     * Perform a deep clone of this object
     * 
     * @returns {FieldData} This object
     */
    clone() {
        let data = JSON.parse(JSON.stringify(this));
        return new FieldData(data.fieldName, data.data);
    }
};
