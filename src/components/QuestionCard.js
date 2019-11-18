import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


class QuestionCard extends Component {
    render () {
        const {questionData} =  this.props
        //console.log(this.props)
        return (
            <div className="question-card">
             <Card className='card'>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className='avatar-con'>
                          {questionData.author.charAt(0)}  
                        </Avatar>
                        }
                        title={`${questionData.author} asks`}
                    />
                <CardContent>
                    <Typography className='title' color="textSecondary" gutterBottom>
                    Would you rather...
                    <br />
                    </Typography>
                   <br />
                    <Typography variant="body2" component="p">
                    {questionData.optionOne.text}
                    <br />
                    or
                    </Typography>
                    <Typography variant="body2" component="p">
                    {questionData.optionTwo.text}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/question/${this.props.id}`} >
                    {this.props.hasAnswered ? <Button size="small">View Poll</Button> : <Button size="small">Answer Question</Button> }    
                    </Link>
                </CardActions>
                </Card>
            </div>
        )
    }
 }

 function mapStateToProps ({ questions }, { id, hasAnswered }) {
    return {questionData: questions[id] }
  }

  export default withRouter(connect(mapStateToProps)(QuestionCard))