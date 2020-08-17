/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";
import xImg from "../images/xImg.svg";
import newItemImg from "../images/newItemImg.svg";

const Checkbox = styled.button`
  margin-right: 2%;
  transform: translate(0, 20%);
  border: 1px solid white;
  border-radius: 3px;
  background-color: transparent;
  height: 22px;
  width: 22px;
  padding: 2px;
  float: left;

  @media (max-width: 600px) {
    transform: translate(0, 5%);
  }
`

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
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
  height: calc(100vh - (2vh + 1.5vw) - (0.6vh + 0.45vw));
  top: 0;
  padding-top: calc(3vh + 2.25vw);
  position: fixed;
  float: right;
  z-index: 50;

  @media (max-width: 800px) {
    margin: 0 0 0 70%;
    width: 30%;
  }
`

const DateText = styled.p`
  text-align: left;
  font-size: calc(0.6vh + 0.45vw);
  color: white;
  margin: 5% 5% 0 5%;
`

const EditBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
  color: white;
  display: none;

  &:hover{
    font-size: 140%;
  }
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const Img = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const LabelBtn = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  display: flex;
  font-size: 100%;
  font-family: openSansRegular;
  text-align: left;
  padding: 0;
  max-width: 100%;
`

const NewTaskBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  bottom: ${props=>props.showTaskComments
        // calculate button height above task comments box with some buffer
    ?  'calc((((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 50) + (0.4vh + 0.1vw))'
    : 'calc(0.4vh + 0.1vw)'
  };
  transition: bottom 0.3s;
  right: 0;
`

const NewTaskImg = styled.img`
  border: none;
  outline: none;
  background-color: transparent;
  height: calc(2vh + 1.5vw);
  width: calc(2vh + 1.5vw);
  position: relative;
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

const TasksContainer = styled.div`
  overflow-y: scroll;
  overflow-x: scroll;
  height: 80vh;
  z-index: 50;
  font-size: calc(0.8vh + 0.6vw);

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`

const TextareaTask = styled.div`
  cursor: pointer;
  font-size: 120%;
  width: 100%;
  min-height: 1em;
  min-width: 50px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  position: relative;
  color: white;
  background-color: transparent;
  margin-top: 0;
  margin-bottom: 0;
  font-family: openSansRegular;
  resize: none;
  border: none;
  border-radius: 5px;

  &:focus{
    outline: none;
  }

  @media (max-width: 600px) {
      font-size: 100%;
  }
`

const TextareaTime = styled.div`
  cursor: default;
  min-height: 1em;
  overflow: scroll;
  min-width: 10px;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  position: relative;
  color: white;
  background-color: transparent;
  margin-bottom: 0;
  font-family: openSansRegular;
  resize: none;
  border: none;
  border-radius: 5px;

  &:focus{
    outline: none;
  }
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-bottom: 5px;
  width: 15vw;
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 800px) {
    width: 22vw;
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


class TasksMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks,
      noteSwitchesAllowed: true
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.tasks != this.state.tasks){
      this.setState({
        tasks: [],
      }, ()=>{
        this.setState({
          tasks: this.props.tasks
        })
      })
    }
  }

  decideWhetherToChangeSelectedTaskFromTaskMenu(e){
    if (this.state.noteSwitchesAllowed){
        this.props.changeSelectedTaskFromTaskMenu(e);
    }
  }

  deleteTask(e){
    // parse the task name
    var task = e.target.parentElement.getElementsByClassName('taskText')[0].textContent;

    var confirmDelete = window.confirm(`Are you sure you want to delete "${task}?"`);

    if (confirmDelete){
      var db = firebase.firestore();
      // delete all notes for task
      this.deleteNotesForSelectedTask(task);

      // delete task itself
      db.collection("users").doc(this.props.user.uid)
      .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
      .collection("tasks").doc(task).delete();
    }
  }

  displayBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';
  }

  hideBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';
  }

  render(){
    return(
      <div style={{textAlign: 'left'}}>
        <Container>
          <div style={{position: 'absolute', width: '100%'}}>
            <Title>My Tasks</Title>
            <CloseBtn><CloseImg src={xImg} onClick={this.props.hideTasksMenu}/></CloseBtn>
          </div>
          <br/>
          <DateText>{this.props.todayDate.day}, {this.props.todayDate.month} {this.props.todayDate.date}, {this.props.todayDate.year}
             &nbsp;-<br/>{this.props.tmrwDate.day}, {this.props.tmrwDate.month} {this.props.tmrwDate.date}, {this.props.tmrwDate.year}
          </DateText>
          <br/>
          {this.props.tasksLoaded
            ?
            <TasksContainer>
              {this.state.tasks.map((task, index) =>
                <div style={{margin: '5% 5% 1% 5%', zIndex: 50}}>
                  <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                    {task.finished ? <Img src={checkmark}/> : null}
                  </Checkbox>
                  <div onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)}>
                    <LabelBtn id={`${task}${index}_label`}>
                      <TextareaTask className='taskText' onClick={this.decideWhetherToChangeSelectedTaskFromTaskMenu.bind(this)} contentEditable={false}>{task.name}</TextareaTask>
                      <XBtn className="XBtn" onClick = {this.deleteTask.bind(this)}>✖</XBtn>
                    </LabelBtn>
                    <P>(<TextareaTime className='taskHours' contentEditable={false}>{task.hours}</TextareaTime>h&nbsp;<TextareaTime className='taskMins' contentEditable={false}>{task.mins}</TextareaTime>m)</P>
                  </div>
                </div>
              )}
            </TasksContainer>
            :
            <div style={{textAlign: 'center', marginTop: '5%'}}>
              <BeatLoader color='white' size='10'/>
            </div>
          }
          <NewTaskBtn onClick={this.props.addNewTask} showTaskComments={this.props.showTaskComments}><NewTaskImg src={newItemImg}/></NewTaskBtn>
        </Container>
      </div>
    );
  }
}

export default TasksMenu;
