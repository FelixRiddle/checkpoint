const op = require("../operation/operation");

// See example message
module.exports = function() {
    // Get failure message
    let msg = op.failureMessage(
        op.IsNotFalsy,
        "someRandomField",
        "",
    );
    
    console.log(`Failure message: ${msg}`);
}
