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