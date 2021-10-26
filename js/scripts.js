// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

function noSwears(word) {
  if (word.toLowerCase() === "zoinks" || word.toLowerCase() === "muppeteer" || word.toLowerCase() === "biffaroni" || word.toLowerCase() === "loopdaloop") {
    return true;
  }
  return false;
}

function partialBold(element, word) {
  let elementArr = element.split("");
  let wordArr = word.split("");
  let outputArr = [];

  elementArr.forEach(function(letter) {
    wordArr.forEach(function(wordLetter, wordIndex) {
      if (wordLetter === elementArr[wordIndex]) {
        outputArr.push(elementArr.shift().toUpperCase());
        wordArr.shift();
      } else {
        outputArr.push(elementArr.shift());
      }
    });
    wordArr = word.split("");
  });
  return outputArr.join('');
}


// outputArr.push("<b>" + elementArr.shift() + "</b>")

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}


function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (noSwears(element)) {
      htmlString = htmlString.concat("[censored]");
    } else if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else if (element.includes(word)) {
      htmlString = htmlString.concat(partialBold(element, word));
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

//UI Logic

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
  });
});

