import React from 'react'
import Answer from './Answer'
import { nanoid } from 'nanoid'
import Footer from "./Footer"



export default function Questions(props) {



    function changeAnswer(value, whichquestion) {
        props.changeAnswer(value, whichquestion)
    }

     

    function renderAnswers(){
        const elements = props.questions.map(question => {

            

            return (
                
            <div className="questions--second">
                <hr />
                <h2>Question: {question.question}</h2>
                <div className="questions--third">
                
                <Answer
                    key={nanoid()}
                    value={question.randomArray[0]}
                    whichquestion={question.question}
                    changeAnswer={changeAnswer}
                    selected={question.selected === question.randomArray[0] ? true : false}
                    correct={question.correctAnswer}
                    finished={props.finished}
                />
                <Answer
                    key={nanoid()}
                    value={question.randomArray[1]}
                    whichquestion={question.question}
                    changeAnswer={changeAnswer}
                    selected={question.selected === question.randomArray[1] ? true : false}
                    correct={question.correctAnswer}
                    finished={props.finished}
                />
                <Answer
                    key={nanoid()}
                    value={question.randomArray[2]}
                    whichquestion={question.question}
                    changeAnswer={changeAnswer}
                    selected={question.selected === question.randomArray[2] ? true : false}
                    correct={question.correctAnswer}
                    finished={props.finished}
                />
                <Answer
                    key={nanoid()}
                    value={question.randomArray[3]}
                    whichquestion={question.question}
                    changeAnswer={changeAnswer}
                    selected={question.selected === question.randomArray[3] ? true : false}
                    correct={question.correctAnswer}
                    finished={props.finished}
                />
                </div>

            </div>
        
        )})

        return elements
    }

    return (
        <div>
            <div className="questions--main">
                <h1>Questionary</h1>
                {renderAnswers()}
                <hr />
                {props.finished ? <button className="check--button" onClick={props.restartGame}>Restart</button>: <button className="check--button" onClick={props.checkAnswers}>Check Answers</button>}
            </div>
            <br />
            <Footer />
        </div>
    )
}

