import { calculateScore, convertData } from './convertData';


describe('convertData', () => {
  test('returns an array of objects with the expected properties when given valid input data', () => {
    const testData = "question1,answer1\nquestion2,answer2\nquestion3,answer3";
    const expectedOutput = [
        { id: 0, question: "question1", answer: "answer1" },
        { id: 1, question: "question2", answer: "answer2" },
        { id: 2, question: "question3", answer: "answer3" }
    ];
    const actualOutput = convertData(testData, ",", false, false, "");
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('correctly randomizes the order of the input data when the `randomizeOrder` parameter is `true`', () => {
    const testData = "question1,answer1\nquestion2,answer2\nquestion3,answer3";
    const actualOutput = convertData(testData, ",", true, false, "");
    const expectedOrder = ["question1", "question2", "question3"];
    expect(actualOutput.map(obj => obj.question)).not.toEqual(expectedOrder);
  });

  test('correctly limits the number of output objects when the `nrQuestions` parameter is a number', () => {
    const testData = "question1,answer1\nquestion2,answer2\nquestion3,answer3";
    const actualOutput = convertData(testData, ",", false, false, "2");
    const expectedOutput = [
        { id: 0, question: "question1", answer: "answer1" },
        { id: 1, question: "question2", answer: "answer2" }
    ];
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('correctly swaps the order of the question and answer when the `swapQuestion` parameter is `true`', () => {
    const testData = "question1,answer1\nquestion2,answer2\nquestion3,answer3";
    const actualOutput = convertData(testData, ",", false, true, "");
    const expectedOutput = [
        { id: 0, question: "answer1", answer: "question1" },
        { id: 1, question: "answer2", answer: "question2" },
        { id: 2, question: "answer3", answer: "question3" }
    ];
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('correctly handles input data with missing or extra fields', () => {
    const testData = "question1,answer1\nquestion2\nquestion3,answer3\nquestion4,answer4,extraField";
    const actualOutput = convertData(testData, ",", false, false, "");
    const expectedOutput = [
        { id: 0, question: "question1", answer: "answer1" },
        { id: 2, question: "question3", answer: "answer3" }
    ];
    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('calculateScore function', () => {
  test('isCaseSensitive=true, val matches ans', () => {
    const isCaseSensitive = true;
    const val = 'hello';
    const ans = 'hello';
    const matchAnyOrder = true;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(1);
  });

  test('isCaseSensitive=false, val matches ans', () => {
    const isCaseSensitive = false;
    const val = 'HeLLo';
    const ans = 'hElLo';
    const matchAnyOrder = false;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(0);
  });

  test('isCaseSensitive=false, val does not match ans', () => {
    const isCaseSensitive = false;
    const val = 'heLLo';
    const ans = 'bye';
    const matchAnyOrder = false;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(0);
  });

  test('isCaseSensitive=true, val does not match ans', () => {
    const isCaseSensitive = true;
    const val = 'HeLLo';
    const ans = 'bye';
    const matchAnyOrder = false;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(0);
  });

  test('matchAnyOrder=true, isCaseSensitive=true, val matches ans', () => {
    const isCaseSensitive = true;
    const val = 'hello world';
    const ans = 'world hello';
    const matchAnyOrder = true;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(1);
  });

  test('matchAnyOrder=true, isCaseSensitive=false, val matches ans', () => {
    const isCaseSensitive = false;
    const val = 'heLLo WOrld';
    const ans = 'wOrLd hello';
    const matchAnyOrder = true;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(0);
  });

  test('matchAnyOrder=true, isCaseSensitive=false, val does not match ans', () => {
    const isCaseSensitive = false;
    const val = 'heLLo WOrld';
    const ans = 'bye world';
    const matchAnyOrder = true;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(0);
  });

  test('matchAnyOrder=false, isCaseSensitive=true, val partially matches ans', () => {
    const isCaseSensitive = true;
    const val = 'heLLo WOrld';
    const ans = 'hello world';
    const matchAnyOrder = false;
    let score = 0;
    const result = calculateScore(isCaseSensitive, val, ans, matchAnyOrder, score);
    expect(result).toBe(1);
  });

});