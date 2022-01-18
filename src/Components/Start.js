import React from 'react'
import Footer from "./Footer"

export default function Start(props) {
    return (
      <div>
        <div className="start--div">
          <h1>lucasfras Quizzical</h1>
          <p>Try to figure out the answer of the 5 general knowledge questions</p>
          <button className="start--button" onClick={props.startGame}>Start Quizz</button>
        </div>
        <Footer />
      </div>
    )
}
