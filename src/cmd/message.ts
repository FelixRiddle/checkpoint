import op from "../model/Operation";

// See example message
export default function() {
    // Get failure message
    let msg = op.failureMessage(
        op.IsNotFalsy,
        "someRandomField",
        "",
    );
    
    console.log(`Failure message: ${msg}`);
}
