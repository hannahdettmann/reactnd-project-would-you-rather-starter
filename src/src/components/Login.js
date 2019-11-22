import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter, Redirect } from 'react-router-dom'

function handleClick(e) {
  //console.log(e.target.value)
  if (e.target.value in this.props.users) { 
      this.props.dispatch(setAuthedUser(e.target.value));
      this.setState({
        toHome: true
      });
  } 
}

class Login extends Component {
  state = {
    toHome: false,
  }
  render() {
      const {users} =  this.props
      if(this.state.toHome === true){
        return <Redirect to='/home' />
      }
    return (
      <div>
        <h1 className='center'>Welcome to 'Would You Rather?'</h1>
        <p className='center'>select a user to continue</p>
        <div className='user-list'>
        {Object.keys(users).map((u) => (
            <div key={u} value={u}>
                <button value={u} className='btn center'  onClick={handleClick.bind(this)}>
                    <img className="avatar" src={users[u].avatarURL} alt="avatar"/>
                    <p value={u}>{users[u].name}</p>
                </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {users}
}

export default withRouter(connect(mapStateToProps)(Login))