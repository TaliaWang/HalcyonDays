/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import NewTask from "./NewTask.js"
import TaskBar from "./TaskBar.js"
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

const TasksMenuBtn = styled.button`
  background-color: white;
  border: none;
  margin: -19% 1% 0 0;
  float: right;

  &:focus{
    outline: none;
  }
`

const TasksMenuImg = styled.img`
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.minsInDay = 60*24;
    this.state = {
      showNewTask: false,
      showTasksMenu: false,
      tasks:[],
      timePassedInMins: 0,
      task: "",
      hours: "",
      mins: "",
      unfinishedTasks: [],
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

      // listen for changes in this user (ie. if they add subcollection tasks)
      userRef.onSnapshot(userDoc=> {
          // listen for changes in this user's tasks
          userRef
          .collection('tasks')
          .onSnapshot(querySnapshot=>{
            var tempTasks = [];
            var tempUnfinishedTasks = [];
            var tempMinsNeeded = 0;
            var tempHoursNeeded = 0;
            querySnapshot.forEach(doc=> {
              tempTasks.push(doc.data());
              if (!doc.data().finished){
                tempUnfinishedTasks.push(doc.data());
                tempMinsNeeded = tempMinsNeeded + doc.data().hours*60 + doc.data().mins;
              }
            });
            // calculate hours and mins needed to finish remaining tasks
            tempHoursNeeded = parseInt(tempMinsNeeded / 60);
            tempMinsNeeded = tempMinsNeeded % 60;
            this.setState({
              tasks: tempTasks,
              unfinishedTasks: tempUnfinishedTasks,
              hoursNeededForTasks: tempHoursNeeded,
              minsNeededForTasks: tempMinsNeeded
            })
          });
      });

      // update current time passed and left
      var d = new Date();
      var timePassed = d.getHours()*60 + d.getMinutes();
      var timePassedWidth = ((timePassed) / this.minsInDay) * 100;
      var timeLeft = this.minsInDay - timePassed;
      var hoursLeft = parseInt(timeLeft / 60);
      var minsLeft = timeLeft % 60;
      this.setState({
        timePassedWidth: timePassedWidth,
        hoursLeft: hoursLeft,
        minsLeft: minsLeft
      });

      // update time left every minute
      setInterval(result=>{
        // calculate time passed in day in minutes
        var d = new Date();
        var timePassed = d.getHours()*60 + d.getMinutes();
        var timePassedWidth = ((timePassed) / this.minsInDay) * 100;
        var timeLeft = this.minsInDay - timePassed;
        var hoursLeft = parseInt(timeLeft / 60);
        var minsLeft = timeLeft % 60;

        this.setState({
          timePassedWidth: timePassedWidth,
          hoursLeft: hoursLeft,
          minsLeft: minsLeft
        })
      }, 60000)
    }
  }

  handleMouseOver(){
    this.setState({
      showTasksMenu: true
    })
  }

  handleNewTaskChange(e){
    if (e.target.id == 'task'){
      this.setState({
        task: e.target.value
      });
    }
    else if (e.target.id == 'hours'){
      this.setState({
        hours: e.target.value
      });
    }
    else if (e.target.id == 'mins'){
      this.setState({
        mins: e.target.value
      });
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  submitTask(e){
    e.preventDefault();
    // prevent empty task
    if (this.state.task == ""){
       alert("Please enter a task.");
    }
    // ensure hours/mins are integers
    else if (!Number.isInteger(parseFloat(this.state.hours)) || !Number.isInteger(parseFloat(this.state.mins))
      || parseFloat(this.state.hours) < 0 || parseFloat(this.state.mins) < 0){
       alert("Please enter positive integers (or zero) for the hours and minutes needed to complete this task.");
    }
    // ensure task time doesn't exceed free time left
    else if (parseInt(this.state.hours)*60 + parseInt(this.state.mins)
      > this.state.hoursLeft*60 + this.state.minsLeft - this.state.hoursNeededForTasks*60 - this.state.minsNeededForTasks){
        alert("There's not enough time left for this task!")
    }
    else{
      // convert minutes to hours if needed
      var tempHours = this.state.hours;
      var tempMins = this.state.mins;
      while (tempMins >= 60){
        tempHours++;
        tempMins = tempMins - 60;
      }
      this.setState({
        hours: tempHours,
        mins: tempMins
      }, () =>{
        // add task to database
        //alert(this.state.task + this.state.hours + this.state.mins);
        var db = firebase.firestore();
        db.collection("users").doc(this.props.user.email)
        .collection("tasks").doc(this.state.task)
        .set({
          name: this.state.task,
          hours: parseInt(this.state.hours),
          mins: parseInt(this.state.mins),
          finished: false
        }).then(result =>{
          //alert("Task added!");
          this.setState({
            task: "",
            hours: "",
            mins: ""
          });
        })
      });
    }
  }

  toggleShowNewTask(e){
    this.setState(prevState => ({
      showNewTask: !prevState.showNewTask
    }));
  }

  toggleTaskChecked(e){
    var db = firebase.firestore();
    const userRef = db.collection('users').doc(this.props.user.email);

    var curTask = e.target.parentElement.textContent;
    //get current task finished state of this task in firestore
    var newFinished;
    userRef.collection('tasks').doc(curTask.substring(0, curTask.indexOf(' (')))
    .get().then(doc=>{
      if (doc.exists){
        newFinished = !doc.data().finished;
      }
    })
    .then(result=>{
      // toggle whether task is finished in database
      userRef.collection('tasks').doc(curTask.substring(0, curTask.indexOf(' (')))
      .update({
        finished: newFinished
      });
    });
  }

  render(){
    return(
      <div>
        {/* tasks menu side bar*/}
        {this.state.showTasksMenu ? null :
          <TasksMenuBtn onMouseOver={this.handleMouseOver.bind(this)}>
            <TasksMenuImg width='80%' height= '80%' src={tasksMenuImg}/>
          </TasksMenuBtn>}
        <div style={{float: 'right', zIndex: '10', position: 'fixed', opacity: this.state.showTasksMenu?1:0, transition: 'opacity 0.3s'}}>
          {this.state.showTasksMenu? <TasksMenu user={this.props.user} tasks={this.state.tasks} toggleTaskChecked={this.toggleTaskChecked.bind(this)}></TasksMenu> : null}
        </div>

        {/* main center components */}
        <div style={{textAlign: 'center'}}>
          {/*<H3>Dashboard</H3>
          {this.props.user ? <P>{this.props.user.email}</P> : null}*/}
          <TaskBar
            unfinishedTasks={this.state.unfinishedTasks}
            type='mainBar'
            timePassedWidth={this.state.timePassedWidth}
          ></TaskBar>
          <CircleBtn state={this.state.showNewTask} onClick={this.toggleShowNewTask.bind(this)}>+</CircleBtn>
          {this.state.showNewTask?
            <NewTask
              user={this.props.user}
              submitTask={this.submitTask.bind(this)}
              handleNewTaskChange={this.handleNewTaskChange.bind(this)}
              task={this.state.task}
              hours={this.state.hours}
              mins={this.state.mins}
            ></NewTask> : null}
        </div>
        <LogoutBtn onClick={this.logout.bind(this)}>Log Out</LogoutBtn>
        <div style={{display: 'block', margin: '0 10% 0 10%'}}>
          <div style={{float: 'left', textAlign: 'left', marginLeft: '15%'}}>
            <P>Total tasks: {this.state.tasks.length}</P>
            <P>Finished tasks: {this.state.tasks.length - this.state.unfinishedTasks.length}</P>
            <P>Unfinished tasks: {this.state.unfinishedTasks.length}</P>
          </div>
          <div style={{float: 'right', textAlign: 'right', marginRight: '15%'}}>
            <P>Time left in the day: {this.state.hoursLeft}h {this.state.minsLeft}m</P>
            <P>Time needed for tasks: {this.state.hoursNeededForTasks}h {this.state.minsNeededForTasks}m</P>
            <P>Free time left:&nbsp;
              {parseInt(((this.state.hoursLeft*60 + this.state.minsLeft)-(this.state.hoursNeededForTasks*60 + this.state.minsNeededForTasks))/60)}h&nbsp;
              {((this.state.hoursLeft*60 + this.state.minsLeft)-(this.state.hoursNeededForTasks*60 + this.state.minsNeededForTasks)) % 60}m
            </P>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
