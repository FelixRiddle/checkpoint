// Commands
// 
// Reason, some things can't be seen in tests, like messages.
import { ArgumentParser } from "argparse";

import message from "./message";
import Scope from "../Scope";

import test from "./cmd_test";

const parser = new ArgumentParser({
    description: "Some commands"
});

// Create arguments
parser.add_argument("--viewExampleMessage", {
    help: "View a message as example, mostly to test if it works",
    action: "store_true"
});

parser.add_argument("--test", {
    help: "Run tests",
    action: "store_true"
});

// Parse arguments
let args = parser.parse_args();

// Execute everything asynchronously
(async () => {
    
    if(args.viewExampleMessage) {
        message();
    }
    
    if(args.test) {
        test(args);
    }
    
    process.exit(0);
})();
