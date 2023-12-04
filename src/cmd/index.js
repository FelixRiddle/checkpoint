// Commands
// 
// Reason, some things can't be seen in tests, like messages.
const { ArgumentParser } = require("argparse");

const message = require("./message");
const Scope = require("../Scope");

const parser = new ArgumentParser({
    description: "Some commands"
});

// Create arguments
parser.add_argument("--viewExampleMessage", {
    help: "View a message as example, mostly to test if it works",
    action: "store_true"
});

// Parse arguments
let args = parser.parse_args();

// Execute everything asynchronously
(async () => {
    
    if(args.viewExampleMessage) {
        message();
    }
    
    process.exit(0);
})();
