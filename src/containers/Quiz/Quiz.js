import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {}, // {id: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [
            {
                question: 'В каком году была известная Октя́брьская революция?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'В 1923 г.', id: 1},
                    {text: 'В 1915 г.', id: 2},
                    {text: 'В 1917 г.', id: 3},
                    {text: 'В 1884 г.', id: 4}
                ]
            },
            {
                question: 'Как гости ресторанов в «Славянском базаре» называли официантов в конце ХIХ, начала ХХ века?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'Метрдотель', id: 1},
                    {text: 'Человек', id: 2},
                    {text: 'Кельнер', id: 3},
                    {text: 'Половые', id: 4}
                ]
            }
        ]
    };

    onAnswerClickHandler = answerId => {
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        console.log('Answer Id: ', answerId);

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
               answerState: {[answerId]: 'success'},
               results
            });

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeout)
            }, 800);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }


    };

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    render() {
        return (
            <div className={'Quiz'}>

                <div className={'QuizWrapper'}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                           />
                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz