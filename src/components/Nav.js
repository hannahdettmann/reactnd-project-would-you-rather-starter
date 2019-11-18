import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter, Link} from 'react-router-dom'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { setAuthedUser } from '../actions/authedUser'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


class Nav extends Component {
  
  state = {
    selectedTab: 'h',
    logedIn: 't',
  }
  
  render() {
      const {authedUser, users} =  this.props

      if(!(authedUser in users)){
        return (<Redirect to="/" />)
      }


      const handleFormat = (event, newFormats) => {
        if(newFormats === null){ return }
        if(newFormats === 'h'){
            this.setState({
                selectedTab: 'h'
              });
        }
        if(newFormats === 'n'){
            this.setState({
                selectedTab: 'n'
              });
        }
        if(newFormats === 'l'){
            this.setState({
                selectedTab: 'l'
              });
        }
        
      };

      const handleLogout = () => {
        this.props.dispatch(setAuthedUser(null));
        this.setState({
            loggedIn: 'f'
          });

        return (<Redirect to="/" />)
    }

    return (
      <div>
         <AppBar position="static">
            <Toolbar>
                <ToggleButtonGroup
                    variant="contained"
                    size="large"
                    exclusive
                    value={this.state.selectedTab}
                    onChange={handleFormat}>
                    <Link to="/home">
                        <ToggleButton className="nav-button" value={'h'}>Home</ToggleButton>
                    </Link>
                    <Link to ="/new">
                        <ToggleButton className="nav-button" value={'n'}>New</ToggleButton>
                    </Link>
                    <Link to="/leaderboard">
                        <ToggleButton className="nav-button" value={'l'}>Leaderboard</ToggleButton>
                    </Link>
                    
                </ToggleButtonGroup>
            <Typography variant="h6" className="nav-text">
                {`Hello, ${authedUser}`}
            </Typography>
            <Button className="logout-button" color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
        
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {authedUser, users}
}

export default withRouter(connect(mapStateToProps)(Nav))