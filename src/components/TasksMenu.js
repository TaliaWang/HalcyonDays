/*global chrome*/
import React, { Component } from 'react';
import {BeatLoader} from 'react-spinners';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";
import checkedImg from "../images/checkedImg.svg";
import uncheckedImg from "../images/uncheckedImg.svg";
import xImg from "../images/xImg.svg";
import newItemImg from "../images/newItemImg.svg";

const Checkbox = styled.button`
  margin-right: calc(0.1vh + 0.075vw);
  transform: translate(0, 20%);
  border: none;
  outline: none;
  background-color: transparent;
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
  margin: 0 5% 0 5%;
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
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  transform: translate(0, 5%);
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
  font-size: ${props=>props.fontSize};
  color: white;
  margin-top: 1%;
  margin-bottom: 0;
  margin-left: ${props=>props.marginLeft};
  font-family: openSansRegular;
  display: flex;
`

const TasksContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding: 0;
  left: 0;
  right: calc(2.4vh + 1.8vw);
  top: calc(7vh + 5.75vw);
  bottom: ${props=>props.showTaskComments
    ? 'calc(((100vh - (0.6vh + 0.45vw) - (2vh + 1.5vw)) / 100) * 52)' // account for task comments height
    : 'calc(2vh + 1.5vw)'
  };
  position: absolute;
  z-index: 50;
  font-size: calc(0.8vh + 0.6vw);
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-bottom: calc(0.4vh + 0.1vw);
  width: 15vw;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: calc(0.6vh + 0.45vw);

  @media (max-width: 800px) {
    width: 22vw;
  }
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  display: none;
`


class TasksMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks,
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

  deleteTask(e){
    // parse the task name
    var task = e.target.parentElement.getElementsByClassName('taskText')[0].textContent;

    var confirmDelete = window.confirm(`Are you sure you want to delete "${task}?"`);

    if (confirmDelete){
      var db = firebase.firestore();

      db.collection("users").doc(this.props.user.uid)
      .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
      .collection("tasks").doc(task).delete();

      // close the task if it's currently open
      if (this.props.selectedTask.name == task){
         this.props.hideTaskComments();
      }
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
          <div style={{marginTop: 'calc(2vh + 1.5vw)'}}>
            <DateText>
              {this.props.todayDate.day}, {this.props.todayDate.month} {this.props.todayDate.date}, {this.props.todayDate.year}&nbsp;-
            </DateText>
            <DateText>
              {this.props.tmrwDate.day}, {this.props.tmrwDate.month} {this.props.tmrwDate.date}, {this.props.tmrwDate.year}
            </DateText>
          </div>
          {this.props.tasksLoaded
            ?
            <TasksContainer showTaskComments={this.props.showTaskComments}>
              {this.state.tasks.map((task, index) =>
                <div style={{margin: '0 5% calc(0.5vh + 0.375vw) 5%', zIndex: 50}}>
                  <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                    {task.finished ? <Img src={checkedImg}/> : <Img src={uncheckedImg}/>}
                  </Checkbox>
                  <div onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)}>
                    <LabelBtn id={`${task}${index}_label`}>
                      <P fontSize='calc(0.8vh + 0.6vw)' className='taskText' onClick={this.props.changeSelectedTaskFromTaskMenu.bind(this)}>{task.name}</P>
                      <XBtn className="XBtn" onClick = {this.deleteTask.bind(this)}>✖</XBtn>
                    </LabelBtn>
                    <P fontSize='calc(0.6vh + 0.45vw)' marginLeft='calc(1.5vh + 1.125vw)'>({task.hours}h&nbsp;{task.mins}m)</P>
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
