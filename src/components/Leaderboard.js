import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'



class Leaderboard extends Component {
  render() {
      const { users } = this.props
    return (
      <div>
        
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return { users }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))