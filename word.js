var letter = require('./letter.js');
//import Letter above with requiring the letter.js file

var Word = function(wordForThisGamePassedIntoFunction){
	this.word = wordForThisGamePassedIntoFunction;

	//set a property
	//mlh make an empty array 
	this.letterObjectArray = [];

	//set a property called found to false
	this.found = false;

        //push letter objects into the letterObjectArray property.
	this.populateLetterObjectArray = function(){
		for (var i = 0; i <this.word.length; i++) {
			this.letterObjectArray.push(new letter.Letter(this.word[i].toUpperCase()));
		}
	}
	this.didWeFindTheWord = function() {
		var returnCounter = 0;
		for (var i = 0; i < this.letterObjectArray.length; i++) {
			if(this.letterObjectArray[i].appear !== true){
				return false
			}else if (this.letterObjectArray[i].appear === true){
				returnCounter ++; 
			}
		}
		if (returnCounter === this.letterObjectArray.length){
			return true;
		}else{
			return false;
		}
	}


	this.checkIfLetterFound = function(guessLetter) {
		console.log('checkIfLetterFound guessLetter = '+guessLetter);
		var numberofLettersMarchedToReturn = 0;

		//loop over
        for (var i = 0; i < this.letterObjectArray.length; i++) {
        	if (this.letterObjectArray[i].character.toUpperCase() === guessLetter) {
        		this.letterObjectArray[i].appear = true;
        		numberofLettersMarchedToReturn ++;
        	}
        }

		//return numberofLettersMarchedToReturn
		return numberofLettersMarchedToReturn;
	};

	this.wordRender = function() {
		var str = "";
			for (var i = 0; i < this.letterObjectArray.length; i++) {
				str += this.letterObjectArray[i].chooseCharacterToDisplay();
			}

		return str;
	};
};

exports.Word = Word;

