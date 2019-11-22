import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import { Route, withRouter, Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'
import QuestionView from './QuestionView'
import New from './New'
import Leaderboard from './Leaderboard'

class App extends Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    if ((this.props.users === undefined) || (this.props.authedUser in this.props.users)){
      this.setState({
        isLoggedIn: true
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }  
    this.props.dispatch(handleInitialData())
  }

  render () {
    if(this.state.isLoggedIn===false){
      return <Redirect to="/" />
    }
    return (
      <div className="app">
      <Route exact path='/' render={() => (   
        <div> 
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <Login /> }
      
        </div>
      )}/>
      <Route exact path="/home" render={() => (
        <QuestionList /> 
      )} />
      <Route exact path="/add" render={() => (
        <New /> 
      )} />
      <Route exact path="/leaderboard" render={() => (
        <Leaderboard /> 
      )} />
      <Route path="/question/:id" render={({match}) => (
        <QuestionView /> 
      )} />

    </div>
    )
  }
}

  function mapStateToProps ({ users, authedUser }) {
    return {
      loading: users === null,
      authedUser
    }
  }

export default withRouter(connect(mapStateToProps)(App))