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
  margin: -20% 0 0 80%;
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
  -webkit-transition: 0.3s ease-out;
  -webkit-transition: 0.3s ease-in;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`

const Form = styled.form`
  margin: 0 15% 0 15%;
  text-align: center;
  padding: 5% 0% 5% 0%;
`

const H3 = styled.h3`
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
    var text = e.target.textContent;
    var task = text.substring(0, text.indexOf(' ('));

    var db = firebase.firestore();
    db.collection("users").doc(this.props.user.email)
    .collection("tasks").doc(task).delete();
  }

  displayX(e){
    e.target.innerHTML = e.target.innerHTML + ' ✖';
  }

  hideX(e){
    e.target.innerHTML = e.target.innerHTML.substring(0, e.target.innerHTML.indexOf(' ✖'));
  }

  render(){
    return(
      <div onMouseLeave={this.props.toggleShowTasksMenu} style={{textAlign: 'left'}}>
        <Container>
          <br/><br/>
          {this.state.tasks.map((task, index) =>
            <div style={{marginLeft: '5%', marginTop: '2%', marginRight: '5%'}}>
              <Checkbox id={`${task}${index}`} onClick={this.props.toggleTaskChecked.bind(this)}>
                {task.finished ? <Img src={checkmark}/> : null}
              </Checkbox>
              <Label onClick = {this.deleteTask.bind(this)} onMouseOver={this.displayX.bind(this)} onMouseLeave={this.hideX.bind(this)} id={`${task}${index}_label`}>{task.name} ({task.hours}h {task.mins}m)</Label>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default TasksMenu;
