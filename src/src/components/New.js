import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Redirect, withRouter, Link } from 'react-router-dom'
import Nav from './Nav'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { handleAddQuestion } from '../actions/questions'


class New extends Component {

  state = {
    opt1: '',
    opt2: '',
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    const {dispatch} = this.props
    let op1 = this.state.opt1
    let op2 = this.state.opt2
      dispatch(handleAddQuestion(
        op1,
        op2
      ))
  }

  render() {
    const { authedUser, users } = this.props

    if (!(authedUser in users)) {
      return (<Redirect to="/" />)
    }

    return (
      <div>
        <Nav />
        <Grid container align-items="center" spacing={0}>
          <Grid item xs={12}>
            <h3 className="center"> Would You Rather... </h3>
          </Grid>
          <Grid item xs={12}>
            <div className="center">
              <TextField
                id="outlined-basic"
                className="text-input"
                label="Ouption 1"
                name="opt1"
                margin="normal"
                variant="outlined"
                value={this.state.opt1}
                onChange={this.handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <h3 className="center">Or</h3>
          </Grid>
          <Grid item xs={12}>
            <div className="center">
              <TextField
                id="outlined-basic"
                name="opt2"
                className="text-input"
                label="Option 2"
                margin="normal"
                variant="outlined"
                value={this.state.opt2}
                onChange={this.handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="center">
              <Link to="/home">
              <Button
                disabled={this.state.opt1 === '' || this.state.opt2 === ''}
                variant="contained"
                onClick={this.handleSubmit }
              >Submit Question</Button>
              </Link>
            </div>
          </Grid>
        </Grid>



      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return { authedUser, users }
}

export default withRouter(connect(mapStateToProps)(New))