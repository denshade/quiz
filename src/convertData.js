export const convertData = (data, sep, randomizeOrder, swapQuestion, nrQuestions) => {
    var list = [];
    let lines = data.split("\n");
    if (randomizeOrder) {
        shuffleArray(lines);
    }
    const nrQuestionsInt = parseInt(nrQuestions)
    if(!isNaN(nrQuestionsInt)) {
        lines=lines.slice(0, nrQuestionsInt);
    }
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        var lineArr = line.split(sep);
        if (lineArr.length !== 2) continue;
        var obj = {};
        obj.id = lineIndex;
        if (swapQuestion) {
            obj.question = lineArr[1];
            obj.answer = lineArr[0];    
        } else {
            obj.question = lineArr[0];
            obj.answer = lineArr[1];    
        }
        list.push(obj);
    }
    return list;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export const calculateScore = (isCaseSensitive, val, ans, matchAnyOrder, score) => {
    const valToCompare = isCaseSensitive ? val.toLowerCase() : val;
    const ansToCompare = isCaseSensitive ? ans.toLowerCase() : ans;
    const sameWordsFound = sameWords(ansToCompare, valToCompare);
    if (matchAnyOrder && sameWordsFound || valToCompare === ansToCompare) {
        score++;
    } else {
        console.log(`${valToCompare} vs. ${ansToCompare}`);
    }
    return score;
}

function sameWords(str1, str2) {
    // Remove all non-alphanumeric characters from both strings
    const cleanStr1 = str1.replace(/[^\w\s]/g, "");
    const cleanStr2 = str2.replace(/[^\w\s]/g, "");
  
    // Convert both strings to arrays of words
    const arr1 = cleanStr1.split(" ");
    const arr2 = cleanStr2.split(" ");
  
    // Sort the arrays of words
    arr1.sort();
    arr2.sort();
  
    // Join the arrays back into strings and compare them
    return arr1.join(" ") === arr2.join(" ");
  }