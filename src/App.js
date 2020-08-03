import React, {Component} from 'react';
import firebase from './firebase.js';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from "./components/Dashboard.js";
import EmailVerification from "./components/EmailVerification.js"
import Login from "./components/Login.js";
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

  render(){
    return (
      <div className="App" style={{textAlign: 'center', minHeight: '800px'}}>
        {this.state.isLoaded
          ?
          <Router>
            {this.state.user == null? <Redirect to="/login"/> :
              (this.state.user.emailVerified? <Redirect to="/dashboard"/> :
              <Redirect to="/emailVerification"/>)}
            <Switch>
              <Route exact path = "/login" component={Login}/>}/>
              <Route exact path = "/dashboard" render = {(props) => <Dashboard user = {this.state.user} />}/>
              <Route exact path = "/emailVerification" render = {(props) => <EmailVerification user = {this.state.user} />}/>
            </Switch>
          </Router>
          : <P>LOADING...</P>
        }
      </div>
    );
  }
}

export default App;
