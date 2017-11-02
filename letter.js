 function Letter(letterPassedIntoFunction) {
    //make a character property 
    this.character = letterPassedIntoFunction;

    //make an appear 
    this.appear = false;

    //chooseCharacterToDisplay 
    this.chooseCharacterToDisplay = function(){
        if (this.appear === true){
            return this.character;
        }else{
            return " _ "
        }
    }
};


//export the letter
exports.Letter = Letter;
