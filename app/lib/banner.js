'use strict';


var chalk = require('chalk');


module.exports = function banner() {

console.log(chalk.yellow("      .--..--..--..--..--..--."));
console.log(chalk.yellow("    .' \\  (`._   (_)     _   \\ "));
console.log(chalk.yellow("  .'    |  '._)         (_)  |"));
console.log(chalk.yellow("  \\ _.')\      .----..---.   /"));
console.log(chalk.yellow("  |(_.'  |    /    .-\\-.  \\  |"));
console.log(chalk.yellow("  \\     0|    |   ( O| O) | o|"));
console.log(chalk.yellow("   |  _  |  .--.____.'._.-.  |"));
console.log(chalk.yellow("   \\ (_) | o         -` .-`  |"), chalk.white.bold('      You'), 
                                                              chalk.green.bold.underline('NE') + chalk.white.bold('ed ') + chalk.green.bold.underline('MO') + chalk.white.bold('re automation!!'));
console.log(chalk.yellow("    |    \\   |`-._ _ _ _ _\\ /"));
console.log(chalk.yellow("    \\    |   |  `. |_||_|   |"));
console.log(chalk.yellow("    | o  |    \\_      \\     |     -.   .-."));
console.log(chalk.yellow("    |.-.  \\     `--..-'   O |     `.`-' .'"));
console.log(chalk.yellow("  _.'  .' |     `-.-'      /-.__   ' .-'"));
console.log(chalk.yellow(".' `-.` '.|='=.='=.='=.='=|._/_ `-'.'"));
console.log(chalk.yellow("`-._  `.  |________/\\_____|    `-.'"));
console.log(chalk.yellow("   .'   ).| '=' '='\\/ '=' |"));
console.log(chalk.yellow("   `._.`  '---------------'"));
console.log(chalk.yellow("           //___\\   //___\\ "));
console.log(chalk.yellow("             ||       ||"));
console.log(chalk.yellow("             ||_.-.   ||_.-."));
console.log(chalk.yellow("            (_.--__) (_.--__)"));
console.log("");
};