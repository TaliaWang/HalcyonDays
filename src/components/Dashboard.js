/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import NewTask from "./NewTask.js"
import TasksMenu from "./TasksMenu.js"
import tasksMenuImg from "../images/tasksMenu.png"

const CircleBtn = styled.button`
  background-color: ${(props) => props.state ? "black" : "white"};
  border-radius:50%;
  border: 1px solid;
  border-color: ${(props) => props.state ? "white" : "black"};
  color: ${(props) => props.state ? "white" : "black"};
  font-size: 23px;
  padding: 0 7px 0 7px;
  margin: 5% 0 0 0;

  &:hover{
    background-color: black;
    color: white;
  }

  &:focus{
    outline: none;
  }
`

const H3 = styled.h3`
`

const LogoutBtn = styled.button`
  margin: 1% 0 1% 0;
`

const P = styled.p`
  font-family: nirmala;
  line-height: 30%;
  font-size: 15px;
`

const TaskBar = styled.div`
  border: 1px solid rgba(112,112,112,1);
  margin: 20% 25% 0 25%;
`

const TasksMenuBtn = styled.button`
  background-color: white;
  border: none;
  margin: -19% 1% 0 0;
  float: right;

  &:focus{
    outline: none;
  }
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      showNewTask: false,
      showTasksMenu: false,
      tasks:[],
      task: "",
      hours: "",
      mins: "",
      totalTasks: 0,
      finishedTasks: 0,
      unfinishedTasks: 0,
      hoursLeft: 0,
      minsLeft: 0,
      hoursNeededForTasks: 0,
      minsNeededForTasks: 0
    }
  }

  componentDidMount(){
    // Add new user to database if they are verified
    if (this.props.user != null && this.props.user.emailVerified){
      var db = firebase.firestore();
      const userRef = db.collection('users').doc(this.props.user.email);

      userRef.get()
      .then((docSnapshot) => {
        // add new user if they don't already exist
        if (!docSnapshot.exists) {
          userRef.set({
              email: this.props.user.email,
          })
          .then(function(docRef) {
              alert("Sign up successful!");
          })
          .catch(function(error) {
              alert("Error adding new user to database.");
          });
        }
        // else just log in and do nothing
      });

      // load in tasks from firestore
      var db = firebase.firestore();
      db.collection("users")
      .doc(this.props.user.email)
      .collection("tasks")
      .get()
      .then(querySnapshot=> {
          querySnapshot.forEach(doc=>{
            this.setState({
              tasks: this.state.tasks.concat(doc.data())
            })
          });
      });
    }
  }

  handleMouseOver(){
    this.setState({
      showTasksMenu: true
    })
  }

  logout(){
    firebase.auth().signOut();
  }

  toggleShowNewTask(e){
    this.setState(prevState => ({
      showNewTask: !prevState.showNewTask
    }));
  }

  render(){
    return(
      <div>
        {/* tasks menu side bar*/}
        {this.state.showTasksMenu ? null :
          <TasksMenuBtn onMouseOver={this.handleMouseOver.bind(this)}>
            <img width='80%' height= '80%' src={tasksMenuImg}/>
          </TasksMenuBtn>}
        <div style={{float: 'right', zIndex: '10', position: 'fixed', opacity: this.state.showTasksMenu?1:0, transition: 'opacity 0.3s'}}>
          {this.state.showTasksMenu? <TasksMenu user={this.props.user} tasks={this.state.tasks}></TasksMenu> : null}
        </div>

        {/* main center components */}
        <div style={{textAlign: 'center'}}>
          {/*}<H3>Dashboard</H3>
          {this.props.user ? <P>{this.props.user.email}</P> : null}
          <LogoutBtn onClick={this.logout.bind(this)}>Log Out</LogoutBtn>*/}
          <TaskBar>
            <br/> <br/>
          </TaskBar>
          {/*<div style={{display: 'block'}}>
            <div style={{float: 'left', textAlign: 'left', marginLeft: '15%'}}>
              <P>Total tasks: {this.state.totalTasks}</P>
              <P>Finished tasks: {this.state.finishedTasks}</P>
              <P>Unfinished tasks: {this.state.unfinishedTasks}</P>
            </div>
            <div style={{float: 'right', textAlign: 'right', marginRight: '15%'}}>
              <P>Time needed for tasks: {this.state.hoursNeededForTasks}h {this.state.minsNeededForTasks}m</P>
              <P>Time left: {this.state.hoursLeft}h {this.state.minsLeft}m</P>
            </div>
          </div>*/}
          <CircleBtn state={this.state.showNewTask} onClick={this.toggleShowNewTask.bind(this)}>+</CircleBtn>
          {this.state.showNewTask? <NewTask user={this.props.user}/> : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
