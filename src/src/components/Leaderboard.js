import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Leaderboard extends Component {
  render() {
    const { userSorted, users } = this.props
    return (
      <div>
        <Nav />
        <h1 className="center"> Leaderboard </h1>
        <Grid container alignContent="center">
          {userSorted.map((person) => (
            <Grid item xs={12}>
              <Card key={person} className="person-card">
                <CardHeader
                  avatar={
                    <img src={users[person].avatarURL} className="avatar" />
                  }
                  title={users[person].name}
                />
                <CardMedia
                  image={users[person].avatarURL}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`has asked ${users[person].questions.length} questions
              and answered ${Object.keys(users[person].answers).length} questions`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
          }

        </Grid>

      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    userSorted: Object.keys(users)
      .sort((a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) -
        (Object.keys(users[a].answers).length + users[a].questions.length)),
    users
  }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))