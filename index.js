const { type } = require("./lib");
var shell = require("shelljs")
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

shell.exec("NC='\033[0m' # No Color")
shell.exec("RED='\033[0;31m'")
shell.exec("GREEN='\033[0;32m'")
shell.exec("BLUE='\033[0;34m'")
shell.exec("YELLOW='\033[1;33m'")
if(!shell.which("fallocate")) {
    type.errorMessage("Sorry, but this script requires fallocate")
    shell.exit(1)
} else {
    type.infoMessage("You have the proper tools to run this...")
    main()
}

function main() {
    type.taskMessage("Creating intial drive file...")
    if (shell.exec('fallocate -l 1000M MyDrive.img').code !== 0) {
        type.errorMessage("Inital drive file failed...");
        shell.exit(1);
      } else {
          type.infoMessage("Initial drive file created...")
          type.taskMessage("Adding space to drive file...")
          if(shell.exec("dd if=/dev/zero of=MyDrive.img bs=1M count=1000").code !==0) {
              type.errorMessage("Adding space to drive file failed...")
              shell.exit(1)
          } else {
              type.infoMessage("Adding space to drive file completed...")
          }
      }
}