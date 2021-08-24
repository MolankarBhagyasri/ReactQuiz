import React, { Component } from "react";
import Question from "./question/Question";
import Answer from "./answers/Answer";
import './QuizMain.css';



export default class Quiz extends Component{

 //initiating the state
    state = {
        questions: {
            1: 'What US  city is known as the "birthplace of jazz"?',
            2: 'What is the capital of greece"?',
            3: 'what planet gave birth to superman"?',
        },
        answers: {
            1: {
                1: 'Chicago',
                2: 'New Orleans',
                3: ' New York'
            },
            2: {
                1: 'Athens',
                2: 'Patras',
                3: 'Kalamata'
            },
            3: {
                1: 'krypton',
                2: 'Mars',
                3: 'Satrun'
            }
        },
        correctAnswers: {
            1: '2',
            2: '1',
            3: '1',
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }
    checkAnswer = answer => {
        const { correctAnswers, step,  score } = this.state;
        if (answer === correctAnswers[step]) {
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer:answer
            });
        } else {
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }
    render() {
        let { questions, answers, correctAnswer, clickedAnswer, step ,score } = this.state;
        return (
            <div className="Content">
                {step <= Object.keys(questions).length?
                (<>
                <Question
                    Question={questions[step]} />
                <Answer
                    answer={answers[step]}
                    step={step}
                    checkAnswer={this.checkAnswer}
                    correctAnswer={correctAnswer}
                    clickedAnswer={clickedAnswer} />
                <button className="NextStep"
                    disabled={
                        clickedAnswer && Object.keys(questions).length >= step
                            ? false : true
                    }
                    onClick={() => this.nextStep(step)}
                >
                    Next
                    </button>
                </>) : (
                <div className="finalPage">
                    <h1>You Have completed the quiz!</h1>
                    <p>Your score is :{score} of {Object.keys(questions).length}</p>
                    <p>Thankyou!</p>
                </div>
                ) 
                }
            </div>
        );
    }
}