import React, { useState } from "react";

const Quiz = ({ data }) => {

    const calculate = () => {
        let score = 0;
        for (let dataElement of data) {
            const val = document.getElementById("quiz-" + dataElement.id).value;
            if (val === dataElement.answer) {
                score++;
            }
        }
        return score;
    }
    const calc = () => {
        setCorrectAnswers(calculate());
    }
    const [correctAnswers, setCorrectAnswers] = useState(0);

    return <>
        {data.map(e => <>
            <p> {e.question}</p>
            <input type="text" key={e.id} id={"quiz-" + e.id} question={e.question} answer={e.answer} />
        </>)}
        <p>Answers correct {correctAnswers} / {data.length}</p>
        <button onClick={calc}>Submit answers</button>
    </>;
}

const convertData = (data, sep) => {
    var list = [];
    const lines = data.split("\n");
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        var lineArr = line.split(sep);
        var obj = {};
        obj.id = lineIndex;
        obj.question = lineArr[0];
        obj.answer = lineArr[1];
        list.push(obj);
    }
    return list;
}

const QuizStart = () => {
    const [quizing, setQuizing] = useState(false);
    const [isCaseSensitive, setCaseSensitive] = useState();
    const [randomizeOrder, setRandomizeOrder] = useState(true);
    const [questionOnLeft, setQuestionOnLeft] = useState(true);
    const [uriQuestion, setUriQuestion] = useState(true);
    const [separator, setSeparator] = useState(",");
    const [data, setData] = useState("");

    const questionsAndStuff = convertData(data, separator);

    const handleChangeData = (event) => {
        setData(event.target.value);
    };

    const handleChangeSeparator = (event) => {
        setSeparator(event.target.value);
    };
    return <>
        {!quizing && (<><textarea rows={10} cols={100} onChange={handleChangeData}>{data}</textarea>
            <label><input type="checkbox" checked={isCaseSensitive} onChange={() => setCaseSensitive(!isCaseSensitive)} />Case sensitive</label>
            <label><input type="checkbox" checked={randomizeOrder} onChange={() => setRandomizeOrder(!randomizeOrder)} />Randomize order</label>
            <label><input type="checkbox" checked={questionOnLeft} onChange={() => setQuestionOnLeft(!questionOnLeft)} />Question on left</label>
            <label><input type="checkbox" checked={uriQuestion} onChange={() => setUriQuestion(!uriQuestion)} />Load Question as image if URI</label>
            <label>Separated by <input type="text" value={separator} onChange={handleChangeSeparator} /></label>
            <button onClick={() => setQuizing(true)}>Start Quiz</button></>)}
        {quizing && <Quiz data={questionsAndStuff}>/</Quiz>}
    </>;

}
export default QuizStart;