import React from 'react'
import './ActiveQuiz.scss'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className={'ActiveQuiz'}>
        <p className={'Question'}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small className={'NumberOf'}>{props.answerNumber} из {props.quizLength}</small>
        </p>
           <AnswersList
               state={props.state}
               answers={props.answers}
               onAnswerClick={props.onAnswerClick}
           />
    </div>
);

export default ActiveQuiz