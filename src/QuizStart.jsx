import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import styled from 'styled-components';

const Options = styled(Card)`
background-color: black;
padding: 20px;
margin: 10px;
text-align: left;
`;

const Score = styled(Card)`
background-color: black;
padding: 20px;
margin: 10px;
text-align: left;
`;

const MyButton = styled(Button)`
margin: 5px;
`;

const Quiz = ({ data, setQuizing, isCaseSensitive }) => {

    const calculate = () => {
        let score = 0;
        for (let dataElement of data) {
            let val = document.getElementById("quiz-" + dataElement.id).value;
            let ans = dataElement.answer;
            if (isCaseSensitive) {
                val = val.toLowerCase();
                ans = ans.toLowerCase();
            }
            if (val === ans) {
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
            <p key={"p"+e.id}> {e.question}</p>
            <input type="text" key={e.id} id={"quiz-" + e.id} question={e.question} answer={e.answer} />
        </>)}
        <Score>
            <p>Answers correct {correctAnswers} / {data.length}</p>
            <MyButton onClick={calc}>Check answers</MyButton>
        </Score>
        <MyButton onClick={()=>setQuizing(false)}>Back to settings</MyButton>
    </>;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const convertData = (data, sep, randomizeOrder, swapQuestion) => {
    var list = [];
    let lines = data.split("\n");
    if (randomizeOrder) {
        shuffleArray(lines);
    }
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        var lineArr = line.split(sep);
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

const QuizStart = () => {
    const [quizing, setQuizing] = useState(false);
    const [isCaseSensitive, setCaseSensitive] = useState(true);
    const [randomizeOrder, setRandomizeOrder] = useState(true);
    const [swapQuestion, setQuestionOnLeft] = useState(false);
    const [uriQuestion, setUriQuestion] = useState(true);
    const [separator, setSeparator] = useState(",");
    const [data, setData] = useState("");

    const questionsAndStuff = convertData(data, separator, randomizeOrder, swapQuestion);

    const handleChangeData = (event) => {
        setData(event.target.value);
    };

    const handleChangeSeparator = (event) => {
        setSeparator(event.target.value);
    };
    return <>
        {!quizing && (<>
        
        <label>Add your quiz data here. Separate questions by ','</label><textarea rows={10} cols={100} onChange={handleChangeData} value={data}></textarea>

            <Options>
                <label><FormCheckInput checked={isCaseSensitive} onChange={() => setCaseSensitive(!isCaseSensitive)} /> Case sensitive</label>
                <label><FormCheckInput checked={randomizeOrder} onChange={() => setRandomizeOrder(!randomizeOrder)} /> Randomize order</label>
                <label><FormCheckInput checked={swapQuestion} onChange={() => setQuestionOnLeft(!swapQuestion)} /> Swap question and answer</label>
                <label><FormCheckInput checked={uriQuestion} onChange={() => setUriQuestion(!uriQuestion)} /> Load Question as image if URI</label>
                <label>Separated by <input type="text" value={separator} onChange={handleChangeSeparator} /></label>
            </Options>
            <MyButton onClick={() => setQuizing(true)}>Start Quiz</MyButton></>)}
        {quizing && <Quiz setQuizing={setQuizing} isCaseSensitive={isCaseSensitive} separator={separator} data={questionsAndStuff}>/</Quiz>}
    </>;

}
export default QuizStart;