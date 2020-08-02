/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import checkmark from "../images/checkmark.jpg";

const LockButton = styled.button`
`
const Checkbox = styled.button`
  margin-right: 2%;
  border: 1px solid white;
  border-radius: 3px;
  background-color: transparent;
  height: 22px;
  width: 22px;
  padding: 2px;
`

const Container = styled.div`
  background-color: #606060;
  width: 20%;
  margin: -5% 0 0 80%;
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
  -webkit-transition: 0.3s ease-out;
  -webkit-transition: 0.3s ease-in;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
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
`

const Img = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const Label = styled.label`
  color: white;
  font-size: 120%;
`

const P = styled.p`
  font-size: 120%;
  color: white;
  margin-top: 0;
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: 120%;
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
    var task = e.target.parentElement.getElementsByClassName('taskText')[0].innerHTML;

    var db = firebase.firestore();
    db.collection("users").doc(this.props.user.uid)
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
          {this.state.tasks.map((task, index) =>
            <div style={{marginLeft: '5%', marginTop: '2%', marginRight: '5%'}}>
              <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                {task.finished ? <Img src={checkmark}/> : null}
              </Checkbox>
              <div style={{display: 'inline-block'}} onMouseOver={this.displayX.bind(this)} onMouseLeave={this.hideX.bind(this)}>
                <Label className='taskText' id={`${task}${index}_label`}>{task.name}</Label>
                <XBtn className="XBtn" onClick = {this.deleteTask.bind(this)}>✖</XBtn>
              </div>
              <P>({task.hours}h {task.mins}m)</P>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default TasksMenu;
