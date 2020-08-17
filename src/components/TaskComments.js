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
  bottom: calc(1.2vh + 0.8vw); /*spacing above editing/saved button*/
  top: calc(3vh + 2.25vw); /*spacing accounts for task and time inputs */
  position: absolute;
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;

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
  height: calc(0.6vh + 0.45vw);

  &:focus{
    outline: none;
  }
`

const MinsInput = styled.div`
  border: none;
  min-width: 0.5em;
  height: calc(0.6vh + 0.45vw);

  &:focus{
    outline: none;
  }
`

const TimeInputContainer = styled.div`
  border: none;
  display: flex;
  color: white;
  font-size: calc(0.6vh + 0.45vw);
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
  max-height: calc(1.4vh + 1.05vw); /* one line only with a little spacing to prevent scroll with 1 line */
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

  }

  checkIfEditsMade(e){
    var taskInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_task')[0];
    var hoursInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_hours')[0];
    var minsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_mins')[0];
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];

    if (taskInput.textContent == this.props.selectedTask.name
      && hoursInput.textContent == this.props.selectedTask.hours
      && minsInput.textContent == this.props.selectedTask.mins
      && commentsInput.textContent == this.props.selectedTask.comments){
        this.setState({
          editsMade: false
        });
    }
    else{
      this.setState({
        editsMade: true
      });
    }
  }

  discardChanges(e){
    //reset this task to values before it was being edited
    var taskInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_task')[0];
    taskInput.textContent = this.props.selectedTask.name;

    var hoursInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_hours')[0];
    hoursInput.textContent = this.props.selectedTask.hours;

    var minsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_mins')[0];
    minsInput.textContent = this.props.selectedTask.mins;

    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];
    commentsInput.textContent = this.props.selectedTask.comments;

    this.setState({
      editsMade: false
    });

    this.props.hideTaskComments();
  }

  ensureValidTimeInput(e){
    var timeInput = e.target;
    timeInput.onkeypress = function(ev) {
      // either a number or period for decimal inputs
      if (String.fromCharCode(ev.which) != "." && isNaN(String.fromCharCode(ev.which))) {
        ev.preventDefault();
      }
    }
    // check that first character is not a period
    if (timeInput.textContent.substring(0, 1) == "."){
      timeInput.textContent = timeInput.textContent.substring(1, timeInput.textContent.length);
    }
    this.checkIfEditsMade(e);
  }

  saveTask(e){
    var commentsInput = e.target.parentElement.parentElement.getElementsByClassName('taskComments_comments')[0];
    alert(this.props.selectedTask.comments);
    alert(commentsInput.textContent);
  }

  render(){
    return(
      <Container>
        <CloseBtn><CloseImg src={xImg} onClick={this.discardChanges.bind(this)}/></CloseBtn>
        <Border>
          <TaskInput className='taskComments_task' onInput={this.checkIfEditsMade.bind(this)} contentEditable={true}>{this.props.selectedTask == null ? null : this.props.selectedTask.name}</TaskInput>
          <TimeInputContainer>
            <HoursInput className='taskComments_hours' onClick={this.ensureValidTimeInput.bind(this)} onInput={this.ensureValidTimeInput.bind(this)} contentEditable={true}>{this.props.selectedTask == null ? null : this.props.selectedTask.hours}</HoursInput>h
            &nbsp;
            <MinsInput className = 'taskComments_mins' onClick={this.ensureValidTimeInput.bind(this)} onInput={this.ensureValidTimeInput.bind(this)} contentEditable={true}>{this.props.selectedTask == null ? 0 : this.props.selectedTask.mins}</MinsInput>m
          </TimeInputContainer>
          <CommentsInput className='taskComments_comments' onInput={this.checkIfEditsMade.bind(this)} contentEditable={true}>{this.props.selectedTask == null ? null : this.props.selectedTask.comments}</CommentsInput>
          {this.state.editsMade?<EditingSavedBtn onClick={this.saveTask.bind(this)}><EditingSavedImg src={saveImg}/></EditingSavedBtn> : null}
        </Border>
      </Container>
    );
  }
}

export default TaskComments;
