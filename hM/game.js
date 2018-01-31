var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");

	function Game() {
  var self = this;

  // Sets the guesses to 10 and gets nextword
  this.play = function() {
    this.guessesLeft = 10;
    this.nextWord();
  };

// new word object using random word from array
  this.nextWord = function() {
    var randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.log('\n' + this.currentWord + '\n');
    this.makeGuess();
  };

  // Uses inquirer to prompt the user for their guess
  this.makeGuess = function() {
    this.askForLetter().then(function() {
      // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
      if (self.guessesLeft < 1) {
        console.log(
          "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"
        );
        self.askToPlayAgain();

        // If all letters of the current word corrently, reset guessesLeft to 10 and get the next word
      }
      else if (self.currentWord.guessedCorrectly()) {
        console.log("You got it right! Next word!");
        self.guessesLeft = 10;
        self.nextWord();

        // guess another letter
      }
      else {
        self.makeGuess();
      }
    });
  };

  // Asks play again after running out of guessesLeft
  this.askToPlayAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        }
      ])
      .then(function(val) {
        // If the user says yes to another game, play again otherwise quit the game
        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };

  // Prompts the user for a letter
  this.askForLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            // The users guess must be a number or letter
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        // If the user's guess is in the current word, log that they chose correctly
        var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nCORRECT!!!\n"));

          // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left
        }
        else {
          self.guessesLeft--;
          console.log(chalk.red("\nINCORRECT!!!\n"));
          console.log(self.guessesLeft + " guesses remaining!!!\n");
        }
      });
  };

 
  this.quit = function() {
    console.log("\nGoodbye!");
    process.exit(0);
  };
}

module.exports = Game;
