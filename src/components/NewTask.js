/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const Container = styled.div`
  margin: 0% 35% 10% 35%;
  background-color: black;
  border-radius: 10px;
  z-index: 40;
  position: relative;

  @media (max-width: 1200px) {
      margin: 0% 25% 10% 25%;
  }
  @media (max-width: 800px) {
      margin: 0% 20% 10% 20%;
  }
  @media (max-width: 400px) {
      margin: 0% 10% 10% 10%;
  }
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding-top: 5%;
`

const H3 = styled.h3`
`

const P = styled.p`
`

const TaskInput = styled.input`
  border-radius: 2px;
  border: none;
  text-align: left;
  width: 100%;
  padding: 1%;
  z-index: 20;
  font-size: 120%;
`

const TimeInput = styled.input`
  border-radius: 2px;
  border: none;
  text-align: left;
  width: 100%;
  padding: 1%;
  z-index: 20;
  font-size: 120%;
`

const Triangle = styled.div`
  margin-left: 50%;
  margin-top: 0.5%;
  transform: translate(140%, 10%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;

  @media (max-width: 1200px) {
    transform: translate(120%, 10%);
  }
  @media (max-width: 800px) {
    transform: translate(115%, 10%);
  }
  @media (max-width: 600px) {
    transform: translate(105%, 10%);
  }
  @media (max-width: 400px) {
    transform: translate(100%, 10%);
  }
`

class NewTask extends Component{
  constructor(props){
    super(props);
    this.state = {
      task: "",
      hours: "",
      mins: ""
    }
  }

  handleNewTaskChange(e){
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

  submitTask(e){
    e.preventDefault();
    // prevent empty task
    if (this.state.task == ""){
       alert("Please enter a task.");
    }
    // ensure hours/mins are integers
    else if (!parseFloat(this.state.hours) && !parseFloat(this.state.mins)
              || (parseFloat(this.state.hours) < 0 || parseFloat(this.state.mins) < 0)){
       alert("Please enter positive numbers (or zero) for the hours and/or minutes needed to complete this task.");
    }
    else{
      // convert minutes to hours if needed
      var tempHours = (this.state.hours == "" ? 0 : parseFloat(this.state.hours));
      var tempMins = (this.state.mins == "" ? 0 : parseFloat(this.state.mins));

      // round floats to integers
      tempMins = Math.floor(tempMins + tempHours * 60);
      tempHours = 0;

      while (tempMins >= 60){
        tempHours++;
        tempMins = tempMins - 60;
      }
      this.setState({
        hours: tempHours,
        mins: tempMins
      }, () =>{
        // add task to today's dates collection in database
        var db = firebase.firestore();
        db.collection("users").doc(this.props.user.uid)
        .collection("dates").doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
        .collection('tasks').doc(this.state.task)
        .set({
          name: this.state.task,
          hours: this.state.hours,
          mins: this.state.mins,
          finished: false,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(result =>{
          //alert("Task added!");
          this.setState({
            task: "",
            hours: "",
            mins: ""
          });
        })
      });
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Triangle/>
        <Container>
          <Form onSubmit={this.submitTask.bind(this)}>
              <div style={{display: 'block', backgroundColor: 'black', margin: '0 0 5% 0'}}>
                <TaskInput id='task' value={this.state.task} onChange={this.handleNewTaskChange.bind(this)} placeholder="New Task"/>
              </div>
              <div style={{paddingBottom: '15%'}}>
                <div style={{float: 'left', width: '45%'}}>
                  <TimeInput id='hours' type='number' min="0" value={this.state.hours} onChange={this.handleNewTaskChange.bind(this)} placeholder="Hour(s)"/>
                </div>
                <div style={{float: 'right', width: '45%', marginRight: '-1%'}}>
                  <TimeInput id='mins' type='number' min="0" value={this.state.mins} onChange={this.handleNewTaskChange.bind(this)} placeholder="Minute(s)"/>
                </div>
              </div>
              <button type='submit' onClick={this.submitTask.bind(this)} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewTask;
