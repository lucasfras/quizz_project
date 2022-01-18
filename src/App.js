import './App.css';
import React, {useState, useEffect} from "react"
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'


import Start from "./Components/Start"
import Questions from './Components/Questions';

function App() {

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(-1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
      fetchData();
  }, [])

  function fetchData() {
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
    .then(data => data.json())
    .then(resp => resp.results)
    .then(final => generateQuestions(final))
  }

  function startGame() {
    setStarted(true);
  }


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }



  function generateRandomArray(orderedArray) {
    return shuffle(orderedArray)
  }

  function generateQuestions(final) {
    const finalArray = []
    final.map(question => {

      const randomArraybefore = generateRandomArray([question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2], question.correct_answer])

      const questionObj = {
        question: question.question,
        correctAnswer: question.correct_answer,
        selected: randomArraybefore[0],
        randomArray: randomArraybefore
      }
      return finalArray.push(questionObj);
    })
  setQuestions(finalArray)
  console.log(finalArray)
  }


  function changeAnswer(value, whichquestion) {
    if(!finished){
      setQuestions(prevQuestions => prevQuestions.map((question) => {
        if(question.question === whichquestion){
          return {
            ...question,
            selected: value
          }
        } else {
          return {
            ...question
          }
        }
      }))
    }
    console.log(whichquestion)
    console.log(value)
}

  function checkAnswers() {
    let correctCounter = 0;
    for(let i = 0; i < questions.length; i++){
      if(questions[i].selected === questions[i].correctAnswer){
        correctCounter = correctCounter + 1;
      }
    }
    console.log("checked answers")
    setFinished(true)
    return setCorrect(correctCounter)
  }

  function restartGame(){
    fetchData();
    setFinished(false)
    setCorrect(-1)
  }


  return (
    <div className="App">
      {(!started && !finished) && 
        <Start 
          startGame={startGame} 
        />
      }

      {(started) &&       
        <Questions
          key={nanoid()}
          questions={questions}
          changeAnswer={changeAnswer}
          checkAnswers={checkAnswers} 
          finished={finished} 
          restartGame={restartGame}
        />}
      {(correct >= 0 && correct < 5) && 
        <h1 className="score--counter">You scored {correct}/5 questions</h1>}
      {correct === 5 && 
        <h1 className="score--counter">Congratulations you owned the quizz!!!</h1>
      }
      {correct === 5 && 
        <Confetti />
      }
      
      </div>
  );
}

export default App;
