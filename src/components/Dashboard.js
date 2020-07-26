/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import Footer from "./Footer.js"
import NewTask from "./NewTask.js"
import Statistics from "./Statistics.js"
import TaskBar from "./TaskBar.js"
import TasksMenu from "./TasksMenu.js"
import locked from "../images/locked.png"
import statisticsImg from "../images/statistics.png"
import tasksMenuImg from "../images/tasksMenu.png"
import unlocked from "../images/unlocked.png"

const CircleBtn = styled.button`
  background-color: ${(props) => props.state ? "black" : "white"};
  border-radius:50%;
  border: 1px solid;
  border-color: ${(props) => props.state ? "white" : "black"};
  color: ${(props) => props.state ? "white" : "black"};
  font-size: 23px;
  padding: 0 7px 0 7px;
  margin: 3% 0 0 0;
  transform: translate(50%, 0);

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

const Img = styled.img`
  margin-left: 54%;
  position: relative;
`

const P = styled.p`
  line-height: 30%;
  font-size: 15px;
  float: ${props=>props.float};
  transform: ${props=>props.float=='left'? 'translate(-50%, 0)' : 'translate(50%, 0)'};
`

const TasksMenuBtn = styled.button`
  background-color: transparent;
  border: none;
  margin: -19% 1% 0 0;
  float: right;
  z-index: 15;
  position: relative;

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
      showStatistics: false,
      showTasksMenu: false,
      tasksMenuLocked: false,
      tasks:[],
      timePassedInMins: 0,
      timePassedWidth: 0,
      task: "",
      hours: "", // for new task
      mins: "", // for new task
      unfinishedTasks: [],
      hoursLeft: 0,
      minsLeft: 0,
      hoursNeededForTasks: 0,
      minsNeededForTasks: 0,
      wakeupHour: 8,
      wakeupMin: '00',
      wakeupClockMode: 'AM',
      sleepHour: 11,
      sleepMin: '00',
      sleepClockMode: 'PM',
      relaxationHour: 6,
      relaxationMin: '00',
      relaxationClockMode: 'PM',
      relaxationTimeHours: 0,
      relaxationTimeMins: 0,
      sleepTimeHours: 0,
      sleepTimeMins: 0
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
              wakeupHour: this.state.wakeupHour,
              wakeupMin: this.state.wakeupMin,
              wakeupClockMode: this.state.wakeupClockMode,
              relaxationHour: this.state.relaxationHour,
              relaxationMin: this.state.relaxationMin,
              relaxationClockMode: this.state.relaxationClockMode,
              sleepHour: this.state.sleepHour,
              sleepMin: this.state.sleepMin,
              sleepClockMode: this.state.sleepClockMode,
          })
          .then(function(docRef) {
              alert("Sign up successful!");
          })
          .catch(function(error) {
              alert("Error adding new user to database.");
          });
        }
        // get initial user data once
        userRef.get().then(userDoc=>{
          this.setState({
            wakeupHour: userDoc.data().wakeupHour,
            wakeupMin: userDoc.data().wakeupMin,
            wakeupClockMode: userDoc.data().wakeupClockMode,
            relaxationHour: userDoc.data().relaxationHour,
            relaxationMin: userDoc.data().relaxationMin,
            relaxationClockMode: userDoc.data().relaxationClockMode,
            sleepHour: userDoc.data().sleepHour,
            sleepMin: userDoc.data().sleepMin,
            sleepClockMode: userDoc.data().sleepClockMode,
          });
        }).then(result=>{
            this.calculateTimePassedWidth();

            // update time left every minute
            setInterval(result=>{
              this.calculateTimePassedWidth();
            }, 60000)
        });
      });

      // listen for changes in this user (ie. if they add subcollection tasks)
      userRef.onSnapshot(userDoc=> {
          // change wakeup time
          this.setState({
            wakeupHour: userDoc.data().wakeupHour,
            wakeupMin: userDoc.data().wakeupMin,
            wakeupClockMode: userDoc.data().wakeupClockMode,
            relaxationHour: userDoc.data().relaxationHour,
            relaxationMin: userDoc.data().relaxationMin,
            relaxationClockMode: userDoc.data().relaxationClockMode,
            sleepHour: userDoc.data().sleepHour,
            sleepMin: userDoc.data().sleepMin,
            sleepClockMode: userDoc.data().sleepClockMode,
          });

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
    }
  }

  calculateTimePassedWidth(){
    // update current time passed and left
    var d = new Date();
    var timePassed = d.getHours()*60 + d.getMinutes();
    var timePassedWidth = ((timePassed) / this.minsInDay) * 100;
    var timeLeft = this.minsInDay - timePassed;
    var hoursLeft = parseInt(timeLeft / 60);
    var minsLeft = timeLeft % 60;

    // adjust timePassedWidth depending on when user starts the day
    var adjustmentHour = this.state.wakeupHour;

    // adjust for 12 am which is really 0 o'Clock
    if (this.state.wakeupHour == 12 && this.state.wakeupClockMode == 'AM'){
      adjustmentHour = 0;
    }

    var adjustmentMin = parseInt(this.state.wakeupMin);

    // adjust for PM unless the time is 12 pm
    if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
      adjustmentHour = adjustmentHour + 12;
    }

    var totalAdjustmentMins = adjustmentHour*60 + adjustmentMin;

    var adjustmentWidth = (totalAdjustmentMins / this.minsInDay) * 100;

    // shift marker
    var adjustedTimePassedWidth = timePassedWidth - adjustmentWidth;

    // wrap around task bar if needed
    if (adjustedTimePassedWidth < 0){
      adjustedTimePassedWidth = 100 + adjustedTimePassedWidth;
    }

    this.setState({
      timePassedWidth: adjustedTimePassedWidth,
      hoursLeft: hoursLeft,
      minsLeft: minsLeft
    });
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

  hideStatistics(){
    this.setState({
      showStatistics: false
    });
  }

  setSleepTime(timeInMins){
    var sleepHours = parseInt(timeInMins / 60);
    var sleepMins = timeInMins % 60;
    this.setState({
      sleepTimeHours: sleepHours,
      sleepTimeMins: sleepMins
    })
  }

  setRelaxationTime(timeInMins){
    var sleepHours = parseInt(timeInMins / 60);
    var sleepMins = timeInMins % 60;
    this.setState({
      relaxationTimeHours: sleepHours,
      relaxationTimeMins: sleepMins
    })
  }

  showStatistics(){
    this.setState({
      showStatistics: true
    });
  }

  submitTask(e){
    e.preventDefault();
    // prevent empty task
    if (this.state.task == ""){
       alert("Please enter a task.");
    }
    // ensure hours/mins are integers
    else if (!Number.isInteger(parseFloat(this.state.hours)) || !Number.isInteger(parseFloat(this.state.mins))){
       alert("Please enter positive integers (or zero) for the hours and minutes needed to complete this task.");
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

  toggleShowTasksMenu(){
    if (!this.state.tasksMenuLocked && this.state.showTasksMenu){
      this.setState({
        showTasksMenu: false
      })
    }
  }

  toggleTaskChecked(e){
    var db = firebase.firestore();
    const userRef = db.collection('users').doc(this.props.user.email);

    // get the task name
    // the task name location is different depending on whether the button is checked or unchecked because of the image
    var curTask = (e.target.nodeName == 'BUTTON' ? e.target.parentElement.textContent : e.target.parentElement.parentElement.textContent)

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

  toggleTasksMenuLocked(){
    var newLocked = !this.state.tasksMenuLocked;
    this.setState({
      tasksMenuLocked: newLocked
    })
  }

  render(){
    return(
      <div>
        {/* tasks menu side bar*/}
        {
          this.state.showTasksMenu
          ?
            (
              this.state.tasksMenuLocked
              ?
                <TasksMenuBtn onClick={this.toggleTasksMenuLocked.bind(this)}>
                  <TasksMenuImg width='80%' height= '80%' src={locked}/>
                </TasksMenuBtn>
              :
                <TasksMenuBtn onClick={this.toggleTasksMenuLocked.bind(this)}>
                  <TasksMenuImg width='80%' height= '80%' src={unlocked}/>
                </TasksMenuBtn>
            )
          :
            <TasksMenuBtn onMouseOver={this.handleMouseOver.bind(this)}>
              <TasksMenuImg width='80%' height= '80%' src={tasksMenuImg}/>
            </TasksMenuBtn>
        }
        <div style={{float: 'right', zIndex: '10', position: 'fixed', opacity: this.state.showTasksMenu?1:0, transition: 'opacity 0.3s'}}>
          {this.state.showTasksMenu? <TasksMenu user={this.props.user} tasks={this.state.tasks} toggleShowTasksMenu={this.toggleShowTasksMenu.bind(this)} toggleTaskChecked={this.toggleTaskChecked.bind(this)}></TasksMenu> : null}
        </div>

        {/* main center components */}
        <div style={{textAlign: 'center'}}>
          {/*<H3>Dashboard</H3>
          {this.props.user ? <P>{this.props.user.email}</P> : null}*/}
          <div>
            <TaskBar
              setSleepTime={this.setSleepTime.bind(this)}
              setRelaxationTime={this.setRelaxationTime.bind(this)}
              user={this.props.user}
              tasks={this.state.tasks}
              type='mainBar'
              timePassedWidth={this.state.timePassedWidth}
              sleepHour={this.state.sleepHour}
              sleepMin={this.state.sleepMin}
              sleepClockMode={this.state.sleepClockMode}
              relaxationHour={this.state.relaxationHour}
              relaxationMin={this.state.relaxationMin}
              relaxationClockMode={this.state.relaxationClockMode}
              wakeupHour={this.state.wakeupHour}
              wakeupMin={this.state.wakeupMin}
              wakeupClockMode={this.state.wakeupClockMode}
            ></TaskBar>
            {/* start and end times of the day */}
            <div style={{margin: '2% 25% 0 25%'}}>
               <P float='left'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode} today</P>
               <P float='right'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode} tomorrow</P>
            </div>
            <div style={{marginTop: '-65px'}}>
              <Img onMouseOver={this.showStatistics.bind(this)} onMouseLeave={this.hideStatistics.bind(this)} src={statisticsImg}/>
              {this.state.showStatistics
                ?
                <Statistics
                  numTasks={this.state.tasks.length}
                  numFinishedTasks={this.state.tasks.length - this.state.unfinishedTasks.length}
                  relaxationTimeHours={this.state.relaxationTimeHours}
                  relaxationTimeMins={this.state.relaxationTimeMins}
                  sleepTimeHours={this.state.sleepTimeHours}
                  sleepTimeMins={this.state.sleepTimeMins}
                  hoursNeededForTasks={this.state.hoursNeededForTasks}
                  minsNeededForTasks={this.state.minsNeededForTasks}
                ></Statistics>
                : null
              }
            </div>
          </div>
          <br/><br/>
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
        {/*<div style={{display: 'block', margin: '0 10% 0 10%'}}>
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
        </div>*/}
        <br/>
        {/* footer with options */}
        <Footer
          setRelaxationTime={this.setRelaxationTime.bind(this)}
          user={this.props.user}
          sleepHour={this.state.sleepHour}
          sleepMin={this.state.sleepMin}
          sleepClockMode={this.state.sleepClockMode}
          relaxationHour={this.state.relaxationHour}
          relaxationMin={this.state.relaxationMin}
          relaxationClockMode={this.state.relaxationClockMode}
          wakeupHour={this.state.wakeupHour}
          wakeupMin={this.state.wakeupMin}
          wakeupClockMode={this.state.wakeupClockMode}
          calculateTimePassedWidth={this.calculateTimePassedWidth.bind(this)}
        ></Footer>
      </div>
    );
  }
}

export default Dashboard;
