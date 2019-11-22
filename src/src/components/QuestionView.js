import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Nav from './Nav'
import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { handleSaveAnswer } from '../actions/questions'
import {_saveQuestionAnswer} from '../_DATA'

function updateVote(){
    let au = this.props.authedUser
    let option = this.state.voteOption
    let id = this.props.match.params.id
    const {dispatch} = this.props
    dispatch(handleSaveAnswer({
        'authedUser': au, 
        'questionId': id, 
        'answer': option,
    }))
    console.log('answering question', au)
}


class QuestionView extends Component {
    state = {
        voteOption: 'optionOne'
    }

    componentDidUpdate(){
        if(this.props.authedUser === undefined){
            return (<Redirect to="/" />)
        }
    }

    render () {
        const {questions, users, authedUser} =  this.props

        if(authedUser === undefined){
            return (<Redirect to="/" />)
        }


        let id = this.props.match.params.id
        let optionOneText = questions[id].optionOne.text
        let optionTwoText = questions[id].optionTwo.text
        let author =  questions[id].author
        let optionOneVotes = questions[id].optionOne.votes.length
        let optionTwoVotes = questions[id].optionTwo.votes.length
        let totalVotes = optionTwoVotes + optionOneVotes
        let uopt = users[authedUser].answers[id]
        console.log('uopt is: ', uopt) 

        const handleChange = event => {
            console.log('value: ', event.target.value)
            this.setState({
                voteOption: event.target.value
              });
          };

        
        return (
            
            <div>
            <Nav />
            <div className="question-card-view">
             <Card className='card-view'>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className='avatar-con'>
                         {author.charAt(0)}  
                        </Avatar>
                        }
                        title={`${author} asks`}
                    />
                
                {uopt!==undefined? 
                <CardContent>
                    <div>
                        <Typography className='title' color="textSecondary" gutterBottom>
                        Would you rather...
                        <br />
                        </Typography>
                        <div className = {(uopt === 'optionOne' ? 'selected' : 'not-selected')} >
                            <h4 className="center">{optionOneText}</h4>
                            <p className="center results">{` 
                                ${ Math.round(((optionOneVotes/ totalVotes) * 100 ))}% of people voted for the option, with 
                                ${optionOneVotes} out of 
                                ${totalVotes} votes`}
                            </p>
                        </div>

                        <div className = {(uopt === 'optionTwo' ? 'selected' : 'not-selected')} >
                            <h4 className="center">{optionTwoText}</h4>
                            <p className="center results">{` 
                                ${ Math.round(((optionTwoVotes/ totalVotes) * 100 ))}% of people voted for the option, with 
                                ${optionTwoVotes} out of 
                                ${totalVotes} votes`}
                            </p>
                        </div>
                    </div>
                    </CardContent>
                :
                <CardContent>
                    <div>
                    <Typography className='title' color="textSecondary" gutterBottom>
                    Would you rather...
                    <br />
                    </Typography>
                    <div>
                    <RadioGroup  name="wur" value={this.state.voteOption} onChange={handleChange}>
                        <FormControlLabel value="optionOne" control={<Radio />} label={optionOneText} />
                        <p className="center">or</p>
                        <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwoText} />
                        <Button onClick={updateVote.bind(this)}>Vote</Button>
                    </RadioGroup>
                    </div>
                    </div>
                    </CardContent>
                } 
                </Card>
            </div>
            </div>
        )
    }
 }

 function mapStateToProps ({ questions, users, authedUser }) {
    return {questions, users, authedUser}
  }
  
  export default withRouter(connect(mapStateToProps)(QuestionView))