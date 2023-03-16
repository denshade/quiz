import React, { useState } from "react";

const Quiz = ({data}) => {

    const [answerMap, setAnswerMap]=useState({});


    const handleChangeData = (event) => {
        if (event.target.value = event.target.getAttribute("answer")) {
            setAnswerMap(answerMap[0]);
        }
    };

    return <> {data.map(e => <><p> {e.question}</p> <input type="text" answer={e.answer} onChange={handleChangeData} value={e.answer}/></>)}
    <button>Submit answers</button>
    </>;
}

const convertData = (data, sep) => {
    var list = [];
    var obj = {};
    for (var line of data.split("\n")) {
        var lineArr =line.split(sep);
        obj.question = lineArr[0];
        obj.answer = lineArr[1];
        list.push(obj);
    }
    return list;
}

const QuizStart = ()  => {
    const [quizing, setQuizing]=useState(false);
    const [isCaseSensitive, setCaseSensitive]=useState();
    const [randomizeOrder, setRandomizeOrder]=useState(true);
    const [questionOnLeft, setQuestionOnLeft]=useState(true);
    const [uriQuestion, setUriQuestion]=useState(true);
    const [separator, setSeparator]=useState(",");
    const [data, setData]=useState("");

    const questionsAndStuff = convertData(data, separator);

    const handleChangeData = (event) => {
        setData(event.target.value);
    };

    const handleChangeSeparator = (event) => {
        setSeparator(event.target.value);
    };
    return <>
        {!quizing && (<><textarea rows={10} cols={100} onChange={handleChangeData}>{data}</textarea>
        <label><input type="checkbox" checked={isCaseSensitive} onChange={() => setCaseSensitive(!isCaseSensitive)}/>Case sensitive</label>
        <label><input type="checkbox" checked={randomizeOrder} onChange={() => setRandomizeOrder(!randomizeOrder)}/>Randomize order</label>
        <label><input type="checkbox" checked={questionOnLeft}  onChange={() => setQuestionOnLeft(!questionOnLeft)}/>Question on left</label>
        <label><input type="checkbox" checked={uriQuestion} onChange={() => setUriQuestion(!uriQuestion)}/>Load Question as image if URI</label>
        <label>Separated by <input type="text" value={separator} onChange={handleChangeSeparator}/></label>
        <button onClick={() => setQuizing(true)}>Start Quiz</button></>)}
        {quizing && <Quiz data={questionsAndStuff}>/</Quiz> }
    </>;
    
}
export default QuizStart;