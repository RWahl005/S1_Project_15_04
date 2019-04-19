"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 4


   Filename: ws_cloud.js

   Author:  Ryan Wahl
   Date:    4.19.19
   
   Function List
   =============
   
   findUnique(arr)
      Returns the unique values in the "arr" array in the form of
      a two-dimension array
      array[i][j]
      where i is the ith unique entry, array[i][0] provides the
      value of the entry and array[i][1] provides the number 
      of repetitons of that value
   
   sortByCount(a,b)
      Compare function used in a two-dimensional arrays to be sorted
      in descending order of the values in the array's 2nd column
      
   sortByWord(a, b)
      Compare function used in a two-dimensional array to be sorted
      in ascending alphabetical order of the vlaues in the array's
      first column
   
   randomValue(minVal, maxVal)
      Returns a randome integer between minVal and maxVal

*/

/**
 * The function is called when the page is loaded.
 */
window.addEventListener("load", function () {
    // Gets the text content of the speech.
    var wordContent = document.getElementById("speech").textContent;
    // Sets all of the words to lowercase.
    wordContent = wordContent.toLowerCase();
    // Removes all of the quotes, and punctuation. 
    wordContent = wordContent.replace(/[!\.,:;\?\'"\(\)\{\}\d\-]/g, "");

    // Loops through all of the stop words in the stopWords array defined in the stopWords.js file.
    for (var i = 0; i < stopWords.length; i++) {
        // The regex for removing the stopWords.
        var stopWordsRE = new RegExp("\\b" + stopWords[i] + "\\b", "g");
        // Removing the stop words.
        wordContent = wordContent.replace(stopWordsRE, "");
    }

    // Removes the white spaces
    wordContent = wordContent.trim();
    // Splits between any amount of white space
    var wordArray = wordContent.split(/\s/);
    // Gets a 2d array using the premade findUnique function.
    var uniqueWords = findUnique(wordArray);
    // Sorts the uniqueWords list by the premade sortByCount function
    uniqueWords.sort(sortByCount);
    // Gets the first 100 words of the uniqueWords list.
    uniqueWords = uniqueWords.splice(0, 100);
    // Gets the count of the last of the 100 words.
    var minimumCount = uniqueWords[99][1];
    // Gets the third word count.
    var top3Count = uniqueWords[2][1];
    // Sorts the word count by the premade sortByWord function.
    uniqueWords.sort(sortByWord);

    // Loops through all of the unique words.
    for (var i = 0; i < uniqueWords.length; i++) {
        // Create a span element.
        var cloudWord = document.createElement("span");
        // Sets the text content to the current word in the uniqueWords array.
        cloudWord.textContent = uniqueWords[i][0];
        // Calculate the size of the word.
        var wordSize = 0.45 * (uniqueWords[i][1] / minimumCount);
        // Set the size of the word that was calculated.
        cloudWord.style.fontSize = wordSize + "em";
        // Randomly rotatesthe words.
        cloudWord.style.transform = `rotate(${randomValue(-30, 30)}deg)`;
        // If the current uniqueWords count is greator than or equal to the top3Count variable.
        if (uniqueWords[i][1] >= top3Count) {
            // Set it's color to pink.
            cloudWord.style.color = "rgb(251, 191, 191)";
            // Give it a text shadow.
            cloudWord.style.textShadow = "2px 2px 5px rgb(51, 51, 51)";
        }
        // Add the span to the aside#cloud element.
        document.getElementById("cloud").appendChild(cloudWord);
    }
});



/*

    Premade Functions

*/



function findUnique(arr) {
    var prevWord;
    var unique = [];
    var listNum = -1;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prevWord) {
            listNum++;
            unique[listNum] = [];
            unique[listNum][0] = arr[i];
            unique[listNum][1] = 1;
        } else {
            unique[listNum][1] = unique[listNum][1] + 1;
        }
        prevWord = arr[i];
    }

    return unique;
}

function sortByCount(a, b) {
    return b[1] - a[1];
}

function sortByWord(a, b) {
    if (a[0] < b[0]) {
        return -1;
    } else if (a[0] > b[0]) {
        return 1;
    } else {
        return 0;
    }
}

function randomValue(minVal, maxVal) {
    var interval = maxVal - minVal;
    return Math.floor(minVal + interval * Math.random());
}