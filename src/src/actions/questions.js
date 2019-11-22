import { showLoading, hideLoading } from 'react-redux-loading'
import {_saveQuestionAnswer, _saveQuestion } from '../_DATA'
export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function addQuestion (question) {
  console.log('the quesiton is: ', question)
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    // dispatch(showLoading())
    return _saveQuestion({
      'optionOneText': optionOneText,
      'optionTwoText': optionTwoText,
      'author': authedUser })
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion))
        // dispatch(hideLoading()
      })
  }
}

export function saveAnswertoState({ questionId, authedUser, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    questionId,
    answer
  }
}


export function handleSaveAnswer(answerInfo) {
  return (dispatch) => {
    return _saveQuestionAnswer(answerInfo)
      .catch((e) => {
        console.warn("Error in saving answer ", e)
      })
      .then(() => {
        dispatch(saveAnswertoState(answerInfo))
      })
  }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}
