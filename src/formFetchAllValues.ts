/**
 * Fetch all values from a form and return it as an object
 * 
 * @param inputElementsNames 
 * @returns 
 */
export default function formFetchAllValues(
    inputElementsNames: Array<string>,
) {
    // Get every element value
    let dataObject = {};
    for(let elName of inputElementsNames) {
        // Get input elment by name
        let inputElement = document.getElementById(elName) as HTMLInputElement;
        if(inputElement) {
            // Get its value
            let fieldValue = inputElement.value;
            
            // Insert data
            dataObject[elName] = fieldValue;
        } else {
            console.log(`Couldn't find: ${elName}`);
        }
    }
    
    return dataObject;
}
