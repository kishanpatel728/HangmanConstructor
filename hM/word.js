var Letter = require("./Letter");

function Word(word) {
  // word split
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  });
}

Word.prototype.getSolution = function() {
  return this.letters.map(function(letter) { 
    return letter.getSolution(); 
  }).join(''); 
}

//setting word to string
Word.prototype.toString = function() {
  return this.letters.join(' '); 
};

Word.prototype.guessLetter = function(char) {

  // Checking to see if letter is a match in the array
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });

  
  console.log("\n" + this + "\n");
  return foundLetter;
};

// Returns true when all letters are guessed
Word.prototype.guessedCorrectly = function() {
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;
