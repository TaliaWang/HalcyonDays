/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";

const LockButton = styled.button`
`
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

const Container = styled.div`
  background-color: #606060;
  width: 20%;
  margin: -5% 0 0 80%;
  height: 100vh;
  position: fixed;

  @media (max-width: 800px) {
    margin: -5% 0 0 70%;
    width: 30%;
  }
  @media (max-width: 600px) {
      margin: -5% 0 0 70%;
      width: 30%;
      font-size: 80%;
  }
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
  text-align: center;
  color: white;
  margin: 0 5% 5% 5%;
  border-bottom: 1px solid white;
  padding: 3%;

  @media (max-width: 600px) {
      font-size: 100%;
  }
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
`

const P = styled.p`
  font-size: 120%;
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  font-family: openSansRegular;
`

const TasksContainer = styled.div`
  overflow-y: scroll;
  height: 85vh;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
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

    var db = firebase.firestore();
    db.collection("users").doc(this.props.user.uid)
    .collection('dates').doc(`${this.props.todayDate.month} ${this.props.todayDate.date}, ${this.props.todayDate.year}`)
    .collection("tasks").doc(task).delete();
  }

  displayX(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';
  }

  hideX(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';
  }

  render(){
    return(
      <div onMouseLeave={this.props.toggleShowTasksMenu} style={{textAlign: 'left'}}>
        <Container>
          <br/><br/>
          <H3>{this.props.todayDate.day}, {this.props.todayDate.month} {this.props.todayDate.date}, {this.props.todayDate.year}
             &nbsp;-<br/>{this.props.tmrwDate.day}, {this.props.tmrwDate.month} {this.props.tmrwDate.date}, {this.props.tmrwDate.year}
          </H3>
          <TasksContainer>
            {this.state.tasks.map((task, index) =>
              <div style={{margin: '6% 5% 6% 5%'}}>
                <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                  {task.finished ? <Img src={checkmark}/> : null}
                </Checkbox>
                <div onMouseOver={this.displayX.bind(this)} onMouseLeave={this.hideX.bind(this)}>
                  <LabelBtn id={`${task}${index}_label`}>
                    <P className='taskText' onClick={this.props.changeSelectedTaskFromTaskMenu}>{task.name}</P>
                    <XBtn className="XBtn" onClick = {this.deleteTask.bind(this)}>✖</XBtn>
                  </LabelBtn>
                </div>
                <P>({task.hours}h {task.mins}m)</P>
              </div>
            )}
          </TasksContainer>
        </Container>
      </div>
    );
  }
}

export default TasksMenu;
