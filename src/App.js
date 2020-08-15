import React, {Component} from 'react';
import firebase from './firebase.js';
import {PuffLoader} from "react-spinners";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from "./components/Dashboard.js";
import EmailVerification from "./components/EmailVerification.js"
import Login from "./components/Login.js";
import PasswordReset from "./components/PasswordReset.js"
import styled from 'styled-components'
import "./App.css"

const P = styled.p`
  margin-top: 25%;
`

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      showLogin: true,
      user: {},
      showPasswordReset: false
    }
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({
        user: user,
        isLoaded: true
      });
    });
  }

  componentDidMount(){
    this.authListener();
  }

  hidePasswordResetScreen(){
    this.setState({
      showPasswordReset: false
    });
  }

  showPasswordResetScreen(){
    this.setState({
      showPasswordReset: true
    });
  }

  render(){
    return (
      <div className="App" style={{textAlign: 'center', minHeight: '100vh'}}>
        {this.state.isLoaded
          ?
          <Router>
            {this.state.user == null? (this.state.showPasswordReset ? <Redirect to="/passwordReset"/> : <Redirect to="/login"/>)
              : (this.state.user.emailVerified? <Redirect to="/dashboard"/> : <Redirect to="/emailVerification"/>)
            }
            <Switch>
              <Route exact path = "/login" render = {(props) => <Login showPasswordResetScreen={this.showPasswordResetScreen.bind(this)}/>}/>
              <Route exact path = "/dashboard" render = {(props) => <Dashboard user = {this.state.user} />}/>
              <Route exact path = "/emailVerification" render = {(props) => <EmailVerification user = {this.state.user} />}/>
              <Route exact path = "/passwordReset" render = {(props) => <PasswordReset user = {this.state.user} hidePasswordResetScreen={this.hidePasswordResetScreen.bind(this)}/>}/>
            </Switch>
          </Router>
          :   <div style={{left: '50%', top: '50%', transform: 'translate(-50%, -75%)', position: 'fixed'}}>
                <PuffLoader size='120'/>
              </div>

        }
      </div>
    );
  }
}

export default App;
