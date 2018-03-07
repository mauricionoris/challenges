 var tokens = null;

 function cleanDataInput(rawtext) {
      //ref: https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex

      //remove puntuation
      var cleanedInput = rawtext.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"");

      // remove newlines
      cleanedInput = cleanedInput.replace(/(\r\n|\n|\r)/gm," ");

      //remove double spaces between words and at each side of the string
      cleanedInput = cleanedInput.replace(/ {1,}/g," ").trim();

      return cleanedInput;
 }

module.exports = {

    checkcontent: function(text) {
      if (!cleanDataInput(text).length > 0)  {
        return false;
      }
      return true;
    },

    countwords: function(text) {
          tokens = cleanDataInput(text).split(' ');
          return tokens.length;
    },

    gettokens: function() {
      return tokens;
    }
};
