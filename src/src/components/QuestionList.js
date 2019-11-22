import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import { Redirect, withRouter} from 'react-router-dom'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Nav from './Nav'

class QuestionList extends Component {
  
  state = {
    hasAnswered: 'u',
    isLoggedIn: true,
  }

  filterQuestions(){
    let au = this.props.authedUser
    let qList = this.props.users[au].answers
    let allQuestions = Object.keys(this.props.questions).sort((a,b) => 
    this.props.questions[b].timestamp - this.props.questions[b].timestamp)

    let answeredQuestions = Object.keys(qList)
    let unansweredQuestions = allQuestions.filter((q) => {return answeredQuestions.indexOf(q) === -1})

    if(this.state.hasAnswered === 'u'){
      return(unansweredQuestions)
    }
    else {
      return(answeredQuestions)
    }
   
  }

  componentDidUpdate(){
    if(!(this.props.authedUser in this.props.users)){
      return (<Redirect to="/" />)
    }
  }

  render() {
      const {questions, users, authedUser} =  this.props
      
      const handleFormat = (event, newFormats) => {
        if(newFormats === null){ return }
        this.setState({
          hasAnswered: newFormats
        });
      };
    

    return (
      <div>
        <Nav />
        <h1 className='center'>Questions</h1>
        <div className="center">
          <ToggleButtonGroup
              variant="contained"
              size="large"
              exclusive
              value={this.state.hasAnswered}
              onChange={handleFormat}>
              <ToggleButton value={'u'}>Unanswered</ToggleButton>
              <ToggleButton value={'a'}>Answered</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='question-list'>
        {this.filterQuestions().map((q) => ( <QuestionCard id={q} key={q} hasAnswered={this.state.hasAnswered === 'a' ? true : false} /> ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {questions, users, authedUser}
}

export default withRouter(connect(mapStateToProps)(QuestionList))