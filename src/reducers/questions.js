import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function tweets (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
            case ADD_QUESTION :
                const { question } = action
                return {
                    ...state.concat(question),
                    ...action.question
                }
            case SAVE_ANSWER:
                const { questionId, authedUser, answer } = action
                return {
                    ...state,
                    [questionId]: {
                    ...state[questionId],
                    [answer]: {
                        ...state[questionId][answer],
                        votes: state[questionId][answer].votes.concat([authedUser])
                    }
                    }
                }
            default:
                return state
       
    }
}