import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { Redirect, withRouter} from 'react-router-dom'
import Nav from './Nav'


class New extends Component {
  
    state = {

    }
  render() {
      const {authedUser, users} =  this.props

      if(!(authedUser in users)){
        return (<Redirect to="/" />)
      }

    return (
      <div>
          <Nav />

         
        
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {authedUser, users}
}

export default withRouter(connect(mapStateToProps)(New))