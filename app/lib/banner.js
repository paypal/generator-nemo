'use strict';


var chalk = require('chalk');


module.exports = function banner() {
console.log(chalk.yellow("_______________________"));
console.log(chalk.yellow.bgCyan("  __           ") + chalk.green.bold.bgCyan("N E M O") + chalk.yellow.bgCyan(" "));
console.log(chalk.yellow.bgCyan(" /o \\/  ><>      __    "));
console.log(chalk.yellow.bgCyan(" \\__/\\ __      \\/ o\\   "));
console.log(chalk.yellow.bgCyan("      /o \\/    /\\__/   "), chalk.white.bold("    Because you"), chalk.cyan.bold.underline('NE') + chalk.white.bold('ed '), chalk.cyan.bold.underline('MO') + chalk.white.bold('re automation!!'));
console.log(chalk.yellow.bgCyan("   __ \\__/\\  __        "));
console.log(chalk.yellow.bgCyan("  /o \\/     /o \\/  <>< "));
console.log(chalk.yellow.bgCyan("  \\__/\\ ><> \\__/\\      "));
console.log(chalk.yellow.bgCyan("_______________________"));
};
