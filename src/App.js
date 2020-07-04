import React, {Component} from 'react';
import firebase from './firebase.js';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      user: {},
    }
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({user: user});
    })
  }

  componentDidMount(){
    this.authListener();
  }

  render(){
    return (
      <div className="App">
        <Router>
          {this.state.user == null ? <Redirect to="/login"/> : <Redirect to="/dashboard"/>}
          <Switch>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/dashboard" render = {(props) => <Dashboard user = {this.state.user} />}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
