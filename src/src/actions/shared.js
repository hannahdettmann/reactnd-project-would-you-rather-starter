import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { hideLoading, showLoading } from 'react-redux-loading'
import {_getUsers, _getQuestions } from '../_DATA'
import { setAuthedUser } from './authedUser'

async function getInitialData(){
  let questions = await _getQuestions()
  let users = await _getUsers()
  

  return({
    users, questions
  })

}

export function handleInitialData () {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
          dispatch(setAuthedUser(null))
          dispatch(hideLoading())
        })
    }
  } 