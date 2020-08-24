/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";
import editingImg from "../images/editingImg.svg";
import saveImg from "../images/saveImg.svg";
import xImg from "../images/xImg.svg";


const Border = styled.div`
  border: 1px solid white;
  position: fixed;
  margin: calc(2vh + 1.5vw) 2% calc(1.5vh + 1.125vw) 2%;
  height: calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50 - (3.2vh + 2.4vw)); /*height of container - some for xImg */
  width: 16%;

  @media (max-width: 800px) {
    width: 26%;
  }
`

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: calc((1.5vh + 1.125vw));
  right: 0;
  transform: translate(0, -75%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const CommentsInput = styled.div`
  background-color: transparent;
  border: none;
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  font-weight: normal;
  /*height of container - img height - max height of task input - height of time input - buffer*/
  height: calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50 - (3.2vh + 2.4vw) - ${props=>props.taskInputHeight}px - (0.8vh + 0.6vw) - (1.8vh + 1.35vw));
  position: relative;
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: pre-wrap; /*preserves white space*/

  &:focus{
    outline: none;
  }
`

const Container = styled.div`
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 20%;
  margin: 0 0 0 80%;
  bottom: 0;
  height: calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50); /* 50% of view height excluding header and pink header strip */
  position: fixed;
  float: right;
  text-align: left;
  padding-bottom: 0;
  z-index: 60;

  @media (max-width: 800px) {
    margin: 0 0 0 70%;
    width: 30%;
  }
`

const EditingSavedBtn = styled.button`
  position: absolute;
  border: 1px solid black;
  border: none;
  background-color: transparent;
  bottom: 0;
  right: 0;
`

const EditingSavedImg = styled.img`
  height: calc(1vh + 0.75vw);
  width: calc(1vh + 0.75vw);
`

const Form = styled.form`
`

const HoursInput = styled.div`
  border: none;
  min-width: 0.5em;
  height: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }
`

const MinsInput = styled.div`
  border: none;
  min-width: 0.5em;
  height: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }
`

const TimeInputContainer = styled.div`
  border: none;
  display: flex;
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  &:focus{
    outline: none;
  }
`

const TaskInput = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: white;
  font-size: calc(1vh + 0.75vw);
  font-weight: bold;
  max-height: calc(4vh + 3vw); /* a few lines only with a little spacing to prevent scroll with 1 line */
  padding-bottom: calc(0.4vh + 0.1vw);
  padding-top: calc(0.4vh + 0.1vw);
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;

  &:focus{
    outline: none;
  }
`


class TaskComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      editsMade: false,
    }
  }

  componentDidMount(){
    // constantly resize commentsInput to respond to taskInput height changes
    var taskInput = document.getElementsByClassName('taskComments_task')[0];
    this.getTaskInputHeight(taskInput)
      setInterval(()=>
      {
        this.getTaskInputHeight(taskInput);
      }, 100);
  }

  componentDidUpdate(prevProps){
    if(this.props.selectedTask != prevProps.selectedTask){
      this.setState({
        editsMade: false,
        taskInputHeight: 0
      });
    }
  }

  checkIfEditsMade(e){
    var taskInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_task')[0];
    var hoursInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_hours')[0];
    var minsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_mins')[0];
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];

    if (taskInput.innerText.trim() == this.props.selectedTask.name
      && hoursInput.innerText == this.props.selectedTask.hours
      && minsInput.innerText == this.props.selectedTask.mins
      && commentsInput.innerText == this.props.selectedTask.comments){
        this.setState({
          editsMade: false
        });
    }
    else{
      this.setState({
        editsMade: true
      });
    }
    this.getTaskInputHeight(taskInput);
  }

  discardChanges(e){
    if (this.state.editsMade){
        this.resetTask(e);
    }
    this.props.hideTaskComments();
  }

  getTaskInputHeight(taskInput){
    this.setState({
      taskInputHeight: taskInput.offsetHeight
    });
  }

  ensureValidTimeInput(e){
    var timeInput = e.target;
    timeInput.onkeypress = function(ev) {
      // either a number or period for decimal inputs
      var char = String.fromCharCode(ev.which)
      if ((char != "." && isNaN(char)) || char.charCodeAt(0) == 13 || char == " ") { // 13 is new line
        ev.preventDefault();
      }
    }
    // check that first character is not a period
    if (timeInput.innerText.substring(0, 1) == "."){
      timeInput.innerText = timeInput.innerText.substring(1, timeInput.innerText.length);
    }
    this.checkIfEditsMade(e);
  }

  resetTask(e){
    //reset this task to values before it was being edited
    var taskInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_task')[0];
    taskInput.innerText = this.props.selectedTask.name;

    var hoursInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_hours')[0];
    hoursInput.innerText = this.props.selectedTask.hours;

    var minsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_mins')[0];
    minsInput.innerText = this.props.selectedTask.mins;

    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];
    commentsInput.innerText = this.props.selectedTask.comments;
  }

  saveTask(e){
    var taskInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_task')[0];
    var hoursInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_hours')[0];
    var minsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_mins')[0];
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];

    // calculate hours and minutes from potentially decimal input
    var tempHours;
    var tempMins;

    tempHours = (isNaN(parseFloat(hoursInput.innerText)) ? 0 : parseFloat(hoursInput.innerText));
    tempMins = (isNaN(parseFloat(minsInput.innerText)) ? 0 : parseFloat(minsInput.innerText));
    var totalMins = tempHours*60 + tempMins;
    totalMins = Math.ceil(totalMins); // round total time up

    tempHours = Math.floor(totalMins / 60);
    tempMins = totalMins % 60;


    var db = firebase.firestore();
    var tasksRef = db.collection("users").doc(this.props.user.uid)
    .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
    .collection("tasks")

    if (this.props.selectedTask.name == ""){
      if (taskInput.textContent == ""){
        alert("Please enter a task name to save this task.");
      }
      else{
        // add a new task
        var date = new Date();
        tasksRef.doc(taskInput.textContent.trim())
        .set({
          name: taskInput.textContent.trim(),
          hours: tempHours,
          mins: tempMins,
          finished: false,
          comments: commentsInput.innerText,
          timestamp: firebase.firestore.Timestamp.fromDate(date)
        }).then(()=>{
          this.props.changeSelectedTaskFromTaskComments(taskInput);
        });
      }
    }
    // rest of these cases deal with editing an existing task
    else if (taskInput.textContent == ""){
      alert("Please enter a task name to save this task.");
    }
    else if (taskInput.innerText.trim() == this.props.selectedTask.name){
      // we can just update the fields of this task in the database
      var db = firebase.firestore();
      tasksRef.doc(taskInput.textContent.trim())
      .update({
        hours: tempHours,
        mins: tempMins,
        comments: commentsInput.innerText
      }).then(()=>{
        this.props.changeSelectedTaskFromTaskComments(taskInput);
      });
    }
    else if (taskInput.innerText.trim() != this.props.selectedTask.name){
      // we have to delete this task and create a new one
      var oldDate;
      var oldFinished;
      var db = firebase.firestore();

      // store the old timestamp and finished state
      tasksRef.doc(this.props.selectedTask.name).get()
      .then(doc=>{
        oldDate = doc.data().timestamp.toDate();
        oldFinished = doc.data().finished;
      }).then(()=>{
        // delete old task
        tasksRef.doc(this.props.selectedTask.name).delete();
        // create a new task with the edited information and old timestamp
        tasksRef.doc(taskInput.textContent.trim()).set({
          name: taskInput.textContent.trim(),
          hours: tempHours,
          mins: tempMins,
          finished: oldFinished,
          comments: commentsInput.innerText,
          timestamp: firebase.firestore.Timestamp.fromDate(oldDate)
        }).then(()=>{
          this.props.changeSelectedTaskFromTaskComments(taskInput);
        });
      });

    }
  }

  render(){
    return(
      <Container>
        <CloseBtn><CloseImg src={xImg} onClick={this.discardChanges.bind(this)}/></CloseBtn>
        <Border>
          <TaskInput className='taskComments_task' onInput={this.checkIfEditsMade.bind(this)} contentEditable={true}>{this.props.selectedTask.name}</TaskInput>
          <TimeInputContainer>
            <HoursInput className='taskComments_hours' onClick={this.ensureValidTimeInput.bind(this)} onInput={this.ensureValidTimeInput.bind(this)} contentEditable={true}>{this.props.selectedTask.hours}</HoursInput>h
            &nbsp;
            <MinsInput className = 'taskComments_mins' onClick={this.ensureValidTimeInput.bind(this)} onInput={this.ensureValidTimeInput.bind(this)} contentEditable={true}>{this.props.selectedTask.mins}</MinsInput>m
          </TimeInputContainer>
          <CommentsInput className='taskComments_comments' onInput={this.checkIfEditsMade.bind(this)} taskInputHeight={this.state.taskInputHeight} contentEditable={true}>{this.props.selectedTask.comments}</CommentsInput>
          {this.state.editsMade?<EditingSavedBtn onClick={this.saveTask.bind(this)}><EditingSavedImg src={saveImg}/></EditingSavedBtn> : null}
        </Border>
      </Container>
    );
  }
}

export default TaskComments;
