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
  margin: calc(3.2vh + 2.4vw) 2% 0 2%;
  height: calc(((100vh - 55px) / 100) * 50 - 3.2vh - 2.4vw);
  bottom: 2vh;
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
  top: calc(1.5vh + 1.125vw);
  right: 0;
  transform: translate(0, -75%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const Container = styled.div`
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 20%;
  margin: 0 0 0 80%;
  bottom: 0;
  height: calc(((100vh - 55px) / 100) * 50); /* 50% of view height excluding header which is 55 px high*/
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

const TaskInput = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: white;
  font-size: calc(1vh + 0.75vw);
  font-weight: bold;
  padding-bottom: 5px;
  padding-top: 5px;
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;

  &:focus{
    outline: none;
  }
`

const CommentsInput = styled.div`
  background-color: transparent;
  border: none;
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  font-weight: normal;
  bottom: 1vh;
  top: calc(2vh + 1.5vw);
  position: absolute;
  padding-bottom: 5px;
  padding-top: 5px;
  width: 85%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-wrap: break-word;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: calc(0.6vh + 0.45vw);
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #FF68B8;
  }

  &:focus{
    outline: none;
  }
`

const Img = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const P = styled.p`
  font-size: 120%;
  color: white;
  margin-top: 1%;
  margin-bottom: 0;
  font-family: openSansRegular;
  display: flex;

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;

  &:hover{
    font-size: 140%;
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
          <CommentsInput contentEditable={true} onChange={this.handleNewCommentsChange.bind(this)}>{this.state.newTaskObject == null ? null : this.state.newTaskObject.comments}</CommentsInput>
        </Border>
      </Container>
    );
  }
}

export default TaskComments;
