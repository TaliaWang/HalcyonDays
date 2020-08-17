/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";
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
  bottom: 0;
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
  max-height: calc(1.4vh + 1.05vw); /* one line only with a little spacing to prevent scroll with 1 line */
  padding-bottom: calc(0.4vh + 0.1vw);
  padding-top: calc(0.4vh + 0.1vw);
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;

  &:focus{
    outline: none;
  }
`


class TaskComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      // NOTE: selectedTask is an OBJECT
      newTaskObject: this.props.selectedTask, // set initial displayed task as selected task
      newComments: ""
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.selectedTask != this.state.newTaskObject){
      this.setState({
        newTaskObject: this.props.selectedTask
      });
    }
  }

  handleNewCommentsChange(e){
    this.setState({
      newComments: e.target.value
    });
  }

  handleNewTaskChange(e){
    var tempNewTask = this.state.newTaskObject;
    tempNewTask.name = e.target.value;
    this.setState({
      newTaskObject: tempNewTask
    });
  }

  render(){
    return(
      <Container>
        <CloseBtn><CloseImg src={xImg} onClick={this.props.hideTaskComments}/></CloseBtn>
        <Border>
          <TaskInput contentEditable={true} onChange={this.handleNewTaskChange.bind(this)}>{this.state.newTaskObject == null ? null : this.state.newTaskObject.name}</TaskInput>
          <TimeInputContainer>
            <HoursInput contentEditable={true}>{this.state.newTaskObject == null ? 0 : this.state.newTaskObject.hours}</HoursInput>h
            &nbsp;
            <MinsInput contentEditable={true}>{this.state.newTaskObject == null ? 0 : this.state.newTaskObject.mins}</MinsInput>m
          </TimeInputContainer>
          <CommentsInput contentEditable={true} onChange={this.handleNewCommentsChange.bind(this)}>{this.state.newTaskObject == null ? null : this.state.newTaskObject.comments}</CommentsInput>
        </Border>
      </Container>
    );
  }
}

export default TaskComments;
