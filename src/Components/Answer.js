import React from 'react'


export default function Answer(props) {


    const styles = {
        backgroundColor: !props.finished ? (props.selected ? "#38daae": "white") : (props.correct === props.value ? "#38daae" : (props.selected ? "red" : "white" ))
    }



    return (
        <div>
            <div className="answer--face" onClick={() => props.changeAnswer(props.value, props.whichquestion)} style={styles}>
                <h2 className="answer--text">{props.value}</h2>
            </div>
        </div>
    )
}
