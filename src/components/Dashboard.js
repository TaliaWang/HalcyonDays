/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const H3 = styled.h3`
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
`

const LogoutBtn = styled.button`
  margin: 1% 0 1% 0;
`

const P = styled.p`
  font-family: nirmala;
  line-height: 30%;
  font-size: 15px;
`

const TaskBar = styled.div`
  border: 1px solid rgba(112,112,112,1);
  margin: 0 15% 10% 15%;
`

const TaskInput = styled.input`
  border: 1px solid rgba(112,112,112,1);
  text-align: center;
  font-size: 130%;
  width: 100%;
  font-family: ISOCT2;
  font-weight: bold;
  padding: 1% 0 0 0;
`

const TimeInput = styled.input`
  border: 1px solid rgba(112,112,112,1);
  text-align: center;
  font-size: 130%;
  width: 100%;
  font-family: ISOCT2;
  font-weight: bold;
  padding: 1% 0 0 0;
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      task: "",
      hours: "",
      mins: "",
      totalTasks: 0,
      finishedTasks: 0,
      unfinishedTasks: 0,
      hoursLeft: 0,
      minsLeft: 0,
      hoursNeededForTasks: 0,
      minsNeededForTasks: 0
    }
  }

  componentDidMount(){
    // Add new user to database if they are verified
    if (this.props.user != null && this.props.user.emailVerified){
      var db = firebase.firestore();
      const userRef = db.collection('users').doc(this.props.user.email);

      userRef.get()
      .then((docSnapshot) => {
        // add new user if they don't already exist
        if (!docSnapshot.exists) {
          userRef.set({
              email: this.props.user.email,
          })
          .then(function(docRef) {
              alert("Sign up successful!");
          })
          .catch(function(error) {
              alert("Error adding new user to database.");
          });
        }
        // else just log in and do nothing
      });
    }
  }

  handleChange(e){
    if (e.target.id == 'task'){
      this.setState({
        task: e.target.value
      });
    }
    else if (e.target.id == 'hours'){
      this.setState({
        hours: e.target.value
      });
    }
    else if (e.target.id == 'mins'){
      this.setState({
        mins: e.target.value
      });
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  submitTask(e){
    e.preventDefault();
    if (this.state.task == ""){
       alert("Please enter a task.");
    }
    else if (!Number.isInteger(parseFloat(this.state.hours)) || !Number.isInteger(parseFloat(this.state.mins))
      || parseFloat(this.state.hours) < 0 || parseFloat(this.state.mins) < 0){
       alert("Please enter positive integers (or zero) for the hours and minutes needed to complete this task.");
    }
    else{
      // convert minutes to hours if needed
      var tempHours = this.state.hours;
      var tempMins = this.state.mins;
      while (tempMins >= 60){
        tempHours++;
        tempMins = tempMins - 60;
      }
      this.setState({
        hours: tempHours,
        mins: tempMins
      }, () =>{
        // add task to database
        alert(this.state.task + this.state.hours + this.state.mins);
        this.setState({
          task: "",
          hours: "",
          mins: ""
        });
      });
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <H3>Dashboard</H3>
        {this.props.user ? <P>{this.props.user.email}</P> : null}
        <LogoutBtn onClick={this.logout.bind(this)}>Log Out</LogoutBtn>
        <TaskBar>
          <br/> <br/>
        </TaskBar>
        <Form>
            <div style={{display: 'block', float: 'left', width: '48%'}}>
              <TaskInput id='task' value={this.state.task} onChange={this.handleChange.bind(this)} placeholder="ENTER TASK"/>
              <div style={{textAlign: 'left'}}>
                <P>Total tasks: {this.state.totalTasks}</P>
                <P>Finished tasks: {this.state.finishedTasks}</P>
                <P>Unfinished tasks: {this.state.unfinishedTasks}</P>
              </div>
            </div>
            <div style={{display: 'block', float: 'right', width: '48%'}}>
              <div style={{display: 'flex'}}>
                <TimeInput id='hours' value={this.state.hours} onChange={this.handleChange.bind(this)} placeholder="HOURS"/>
                <TimeInput id='mins' value={this.state.mins} onChange={this.handleChange.bind(this)} placeholder="MINUTES"/>
              </div>
              <div style={{textAlign: 'left'}}>
                <P>Time needed for tasks: {this.state.hoursNeededForTasks}h {this.state.minsNeededForTasks}m</P>
                <P>Time left: {this.state.hoursLeft}h {this.state.minsLeft}m</P>
              </div>
            </div>
            <button onClick={this.submitTask.bind(this)} style={{display:'none'}}/>
        </Form>
      </div>
    );
  }
}

export default Dashboard;
