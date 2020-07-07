/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
`
const Container = styled.div`
  margin: 0% 25% 1% 25%;
  background-color: black;
  border-radius: 10px;
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
`

const P = styled.p`
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

const Triangle = styled.div`
  margin: 1% 48% 0 49%;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid black;
`

class NewTask extends Component{
  constructor(props){
    super(props);
    this.state = {
      task: "",
      hours: "",
      mins: "",

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
        //alert(this.state.task + this.state.hours + this.state.mins);
        var db = firebase.firestore();
        db.collection("users").doc(this.props.user.email)
        .collection("tasks").doc(this.state.task)
        .set({
          name: this.state.task,
          hours: parseInt(this.state.hours),
          mins: parseInt(this.state.mins),
          finished: false
        }).then(result =>{
          alert("Task added!");
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
          <Form>
              <div style={{display: 'block', backgroundColor: 'black', padding: '1%', margin: '0 0 5% 0'}}>
                <TaskInput id='task' value={this.state.task} onChange={this.handleChange.bind(this)} placeholder="ENTER TASK"/>
              </div>
              <div style={{display: 'block', padding: '1%'}}>
                <div style={{display: 'flex'}}>
                  <TimeInput id='hours' value={this.state.hours} onChange={this.handleChange.bind(this)} placeholder="HOURS"/>
                  <TimeInput id='mins' value={this.state.mins} onChange={this.handleChange.bind(this)} placeholder="MINUTES"/>
                </div>
              </div>
              <button onClick={this.submitTask.bind(this)} style={{display:'none'}}/>
          </Form>
        </Container>
      </div>
    );
  }
}

export default NewTask;
