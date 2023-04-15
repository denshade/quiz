import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import {calculateScore} from './convertData';

const Score = styled(Card)`
background-color: black;
padding: 20px;
margin: 10px;
text-align: left;
`;

const Question = styled(Card)`
background-color: black;
margin: 10px;
`;

const MyButton = styled(Button)`
margin: 5px;
`;


const isImageQuestion = (e) => e.question.startsWith("http"); 
const Quiz = ({ data, setQuizing, isCaseSensitive,matchAnyOrder }) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const calculate = () => {
        let score = 0;
        for (let dataElement of data) {
            let val = document.getElementById("quiz-" + dataElement.id).value;
            let ans = dataElement.answer;
            score = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
        }
        return score;
    }
    const reset = () => {
        for (let dataElement of data) {
            document.getElementById("quiz-" + dataElement.id).value = "";
        }
    }
    const fillCorrectAnswers = () =>
    {
        for (let dataElement of data) {
            let ans = dataElement.answer;
            document.getElementById("quiz-" + dataElement.id).value = ans;
        }
    }
    const calc = () => {
        setCorrectAnswers(calculate());
    }
    const fill = () => {
        fillCorrectAnswers();
    }
    return <>
        {data.map(e => <Question>
            {isImageQuestion(e) && <img src={e.question} key={"p"+e.id}/>}
            {!isImageQuestion(e) && <p key={"p"+e.id}> {e.question}</p>}
            <input type="text" key={e.id} id={"quiz-" + e.id} question={e.question} answer={e.answer} />
        </Question>)}
        <Score>
            <p>Answers correct {correctAnswers} / {data.length}</p>
            <MyButton onClick={calc}>Check answers</MyButton>
            <MyButton onClick={reset}>Reset answers</MyButton>
            <MyButton onClick={fill}>Fill in answers</MyButton>
        </Score>
        <MyButton onClick={()=>setQuizing(false)}>Back to settings</MyButton>
    </>;
}
export default Quiz;