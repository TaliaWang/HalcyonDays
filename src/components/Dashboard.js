/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import Footer from "./Footer.js"
import NewNote from "./NewNote.js"
import NewTask from "./NewTask.js"
import NotesMenu from "./NotesMenu.js"
import Statistics from "./Statistics.js"
import TaskBar from "./TaskBar.js"
import TasksMenu from "./TasksMenu.js"
import leftRightBtnImg from "../images/leftRightBtn.png"
import locked from "../images/locked.png"
import newNoteButton from "../images/newNoteButton.png"
import notesMenuImg from "../images/notesMenu.png"
import statisticsImg from "../images/statistics.png"
import tasksMenuImg from "../images/tasksMenu.png"
import unlocked from "../images/unlocked.png"

const CircleBtn = styled.button`
  background-color: ${(props) => props.state ? "black" : "white"};
  border-radius:50%;
  border: 1px solid;
  border-color: ${(props) => props.state ? "white" : "black"};
  color: ${(props) => props.state ? "white" : "black"};
  font-size: 50px;
  padding: 0 15px 0 15px;
  margin: 3% 0 0 0;
  transform: translate(50%, 0);

  &:hover{
    background-color: black;
    color: white;
  }

  @media (max-width: 1200px) {
    font-size: 40px;
    padding: 0 12px 0 12px;
  }
  @media (max-width: 600px) {
    font-size: 35px;
    padding: 0 10px 0 10px;
  }
`

const CurrentDateTime = styled.div`
`

const DateCarousel = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  height: 50px;
  margin: 2% 25% 0 25%;
  text-align: left;

  @media (max-width: 1200px) {
    margin: 5% 20% 0 20%;
  }
  @media (max-width: 800px) {
    margin: 8% 10% 0 10%;
  }
  @media (max-width: 600px) {
    margin: 10% 5.9% 0 5.9%;
    height: 40px;
  }
  @media (max-width: 400px) {
    margin: 14% 5% 0 5%;
    height: 30px;
  }
`

const H1 = styled.h1`
  margin-top: 5%;
  font-family: ISOCT2;
  font-size: 80px;

  @media (max-width: 1200px) {
    font-size: 70px;
  }
  @media (max-width: 800px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 30px;
  }
  @media (max-width: 400px) {
    font-size: 20px;
  }
`
const H3 = styled.h3`
  font-family: ISOCT2;
  font-size: 30px;

  @media (max-width: 1200px) {
    font-size: 25px;
  }
  @media (max-width: 800px) {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const LeftRightBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 0;
`

const LeftRightBtnImg = styled.img`
  transform: rotate(${props=>props.rotation});
  height: 40px;
  width: 50px;

  @media (max-width: 800px) {
    height: 30px;
    width: 40px;
  }
  @media (max-width: 600px) {
    height: 24px;
    width: 30px;
  }
`

const NewNoteAndTaskContainer = styled.div`
  margin-top: 1%;

  @media (max-width: 800px) {
    margin-top: 3%;
  }
  @media (max-width: 600px) {
    margin-top: 10%;
  }
  @media (max-width: 400px) {
    margin-top: 29%;
  }
`

const NewNoteButton = styled.button`
  transform: translate(-20%, 15%);
  background: none;
  border: none;
  margin: 0 1% 0 0;
  padding: 0;
`

const NewNoteButtonImg = styled.img`
  width: 90%;
  height: 90%;

  @media (max-width: 1200px) {
    width: 75%;
    height: 75%;
  }
  @media (max-width: 600px) {
    width: 60%;
    height: 60%;
  }
`

const NotesMenuBtn = styled.button`
  background-color: transparent;
  border: none;
  float: left;
  top: 1vh;
  left: 0;
  z-index: 15;
  position: fixed;
  margin: 0;
`

const P = styled.p`
  width: 70px;
  font-size: 15px;
  float: ${props=>props.float};
  transform: ${props=>props.float=='left'? 'translate(-50%, 0)' : 'translate(50%, 0)'};
`

const P_carousel = styled.p`
  font-size: 15px;
  float: ${props=>props.float};

  @media (max-width: 600px) {
     font-size: 12.25px;
  }
  @media (max-width: 400px) {
     font-size: 9px;
  }
`

const StatsContainer = styled.div`
  margin-top: -66px;

  @media (max-width: 1200px) {
    margin-top: -55px;
  }
  @media (max-width: 1000px) {
    margin-top: -50px;
  }
  @media (max-width: 600px) {
    margin-top: -45px;
  }
`

const StatsImg = styled.img`
  margin-left: 54%;
  position: relative;

  @media (max-width: 1200px) {
      margin-left: 65%;
  }

  @media (max-width: 1000px) {
    margin-left: 68%;
  }
  @media (max-width: 800px) {
    margin-left: 78%;
  }
  @media (max-width: 600px) {
    margin-left: 79%;
  }
  @media (max-width: 400px) {
    margin-left: 82%;
  }
`

const TasksMenuBtn = styled.button`
  background-color: transparent;
  border: none;
  margin: 0;
  top: 1vh;
  right: 0;
  float: right;
  z-index: 15;
  position: fixed;
`

const TasksMenuImg = styled.img`
`

const TodayTomorrow =styled.div`
  margin: 2% 25% 0 25%;

  @media (max-width: 1200px) {
    margin: 2% 20% 0 20%;
  }
  @media (max-width: 800px) {
    margin: 2% 15% 0 15%;
  }
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.minsInDay = 60*24;
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    this.leftClickedAlready = true; // starts as true because first click shifts dates as expected
    this.rightClickedAlready = true; // starts as true because first click shifts dates as expected
    this.state = {
      currentDateTime: {
        day: "",
        date: 0,
        month: "",
        year: 0,
        hour: 0,
        min: "00",
        am_pm: "AM"
      },
      todayDate:{
        todayObject: null,
        day: "",
        date: 0,
        month: "",
        year: 0
      },
      tmrwDate: {
        tmrwObject: null,
        day: "",
        date: 0,
        month: "",
        year: 0
      },
      showNewNote: false,
      showNotesMenu: false,
      notesMenuLocked: false,
      showNewTask: false,
      showStatistics: false,
      showTasksMenu: false,
      tasksMenuLocked: false,
      notes: [],
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
      sleepTimeMins: 0,
      footerPopupsAllowed: true,
      selectedTask: "",
      notesLoaded: false,
      tasksLoaded: false
    }
  }

  allowFooterPopup(){
    this.setState({
      footerPopupsAllowed: true
    })
  }

  backToGeneralNotes(){
    this.setState({
      selectedTask: ""
    }, ()=>{
      // display general notes
      this.switchNotes();
    })
  }

  changeSelectedTaskFromTaskBar(e){
    var taskId = e.target.id;
    var taskName = taskId.substring(taskId.indexOf('taskChunk_')+10, taskId.length);
    this.setState({
      selectedTask: taskName,
      showNotesMenu: true,
      notesMenuLocked: true
    }, () =>{
       this.switchNotes(); // change notes displayed in notes menu
    });
  }

  changeSelectedTaskFromTaskMenu(e){
    var textarea = e.target.parentElement.getElementsByClassName('taskText')[0];
    textarea = (textarea == undefined? e.target.parentElement.parentElement.getElementsByClassName('taskText')[0] : textarea);

    var taskName = textarea.textContent;
    this.setState({
      selectedTask: taskName,
      showNotesMenu: true,
      notesMenuLocked: true
    }, ()=>{
        this.switchNotes(); // change notes displayed in notes menu
    });
  }

  changeTodayTmrw(e){
    if (e.target.id == 'backward' || e.target.id == 'backwardImg'){
      // set tmrw as current today
      var tmrw = this.state.todayDate.todayObject;
      if (!this.leftClickedAlready){
        // account for strange bug that only shifts dates back after 2 clicks (exluding first click)
        tmrw.setDate(tmrw.getDate() - 1);
      }
      var tmrwDay = this.days[tmrw.getDay()];
      var tmrwDate = tmrw.getDate();
      var tmrwMonth = this.months[tmrw.getMonth()];
      var tmrwYear = tmrw.getFullYear();

      // set today as one day back from current today
      var today = this.state.todayDate.todayObject;
      today.setDate(today.getDate() - 1);
      var todayDay = this.days[today.getDay()];
      var todayDate = today.getDate();
      var todayMonth = this.months[today.getMonth()];
      var todayYear = today.getFullYear();

      this.rightClickedAlready = false;
      this.leftClickedAlready = true;

      this.setState({
        todayDate: {
          todayObject: today,
          day: todayDay,
          date: todayDate,
          month: todayMonth,
          year: todayYear
        },
        tmrwDate: {
          tmrwObject: tmrw,
          day: tmrwDay,
          date: tmrwDate,
          month: tmrwMonth,
          year: tmrwYear
        }
      }, ()=>{
        this.switchDate();
      });
    }
    else if (e.target.id == 'forward' || e.target.id == 'forwardImg'){
      // set today as current tmrw
      var today = this.state.tmrwDate.tmrwObject;
      if (!this.rightClickedAlready){
        // account for strange bug that only shifts dates forward after 2 clicks (excluding first click)
        today.setDate(today.getDate() + 1);
      }
      var todayDay = this.days[today.getDay()];
      var todayDate = today.getDate();
      var todayMonth = this.months[today.getMonth()];
      var todayYear = today.getFullYear();

      // set tmrw as one day forward from current tmrw
      var tmrw = this.state.tmrwDate.tmrwObject;
      tmrw.setDate(tmrw.getDate() + 1);
      var tmrwDay = this.days[tmrw.getDay()];
      var tmrwDate = tmrw.getDate();
      var tmrwMonth = this.months[tmrw.getMonth()];
      var tmrwYear = tmrw.getFullYear();

      this.leftClickedAlready = false;
      this.rightClickedAlready = true;

      this.setState({
        todayDate: {
          todayObject: today,
          day: todayDay,
          date: todayDate,
          month: todayMonth,
          year: todayYear
        },
        tmrwDate: {
          tmrwObject: tmrw,
          day: tmrwDay,
          date: tmrwDate,
          month: tmrwMonth,
          year: tmrwYear
        }
      }, () =>{
        this.switchDate();
      })
    }
  }

  componentDidMount(){
    // Add new user to database if they are verified
    if (this.props.user != null && this.props.user.emailVerified){
      // set the dates for today/tomorrow early here so that today/tomorrow can be created in the database
      this.setTodayTomorrowDates();
      this.calculateCurrentDateTime();

      var db = firebase.firestore();
      const userRef = db.collection('users').doc(this.props.user.uid);

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
          .then(docRef=> {
              alert("Sign up successful!");
              this.switchDate();
          })
          .catch(error=> {
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

            // update current time and time passed every minute
            setInterval(result=>{
              this.calculateTimePassedWidth();
              this.calculateCurrentDateTime();
            }, 60000);

            // check whether today/tomorrow should up dated every 15 seconds
            // note: checking every minute might not be frequent enough,
            // since case to reset today/tomorrow occurs when current time == wakeup time
            setInterval(result=>{
              this.updateTodayTomorrowDates();
            }, 15000);
        }).then(result=>{
            // listen for changes in this user (ie. if they add subcollection notes)
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

                //listen for changes in this user's general notes
                this.switchNotes();

                // listen for changes in this user's tasks for this date
                this.switchDate();

                // listen for changes in this user's tasks for this date
                /*userRef
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
                });
              });*/

            });
        });
      });
    }
  }

  calculateCurrentDateTime(){
    var d = new Date();
    // get current date and time
    var currentDay = this.days[d.getDay()];
    var currentDate = d.getDate();
    var currentMonth = this.months[d.getMonth()];
    var currentYear = d.getFullYear();
    var currentHour = d.getHours();
    var currentAm_pm = "AM";
    if (currentHour > 12){
      currentHour = currentHour % 12;
      currentAm_pm = "PM";
    }
    else if (currentHour == 12){
      currentAm_pm = "PM";
    }
    else if (currentHour == 0){
      currentHour = 12;
    }
    var currentMin = d.getMinutes();
    if (currentMin <= 9){
      currentMin = "0" + currentMin;
    }
    else{
      currentMin = currentMin + "";
    }

    this.setState({
      currentDateTime:{
        day: currentDay,
        date: currentDate,
        month: currentMonth,
        year: currentYear,
        hour: currentHour,
        min: currentMin,
        am_pm: currentAm_pm
      }
    });
  }

  // sets state for current time and width the current time takes up in tasks bar
  calculateTimePassedWidth(){
    var d = new Date();

    // update current time passed and left
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

  handleNotesMouseOver(){
    this.setState({
      showNotesMenu: true
    })
  }

  handleTasksMouseOver(){
    this.setState({
      showTasksMenu: true
    });
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

  hideNoteTaskPopups(){
    this.setState({
      showNewNote: false,
      showNewTask: false,
    });
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

  setTodayTomorrowDates(){
    // get today's date and time (today being the date for which user wants to edit/view tasks)
    var today = new Date();
    var todayDay = this.days[today.getDay()];
    var todayDate = today.getDate();
    var todayMonth = this.months[today.getMonth()];
    var todayYear = today.getFullYear();

    // get tomorrow's date and time
    var tmrw = new Date();
    tmrw = new Date(today);
    tmrw.setDate(tmrw.getDate() + 1);
    var tmrwDay = this.days[tmrw.getDay()];
    var tmrwDate = tmrw.getDate();
    var tmrwMonth = this.months[tmrw.getMonth()];
    var tmrwYear = tmrw.getFullYear();

    this.setState({
      todayDate: {
        todayObject: today,
        day: todayDay,
        date: todayDate,
        month: todayMonth,
        year: todayYear
      },
      tmrwDate: {
        tmrwObject: tmrw,
        day: tmrwDay,
        date: tmrwDate,
        month: tmrwMonth,
        year: tmrwYear
      }
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
        // add task to today's dates collection in database
        var db = firebase.firestore();
        db.collection("users").doc(this.props.user.uid)
        .collection("dates").doc(`${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`)
        .collection('tasks').doc(this.state.task)
        .set({
          name: this.state.task,
          hours: parseInt(this.state.hours),
          mins: parseInt(this.state.mins),
          finished: false,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date())
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

  switchDate(){
    var db = firebase.firestore();
    this.setState({
      tasksLoaded: false
    }, ()=>{
      const userRef = db.collection('users').doc(this.props.user.uid);
      // add this date as new collection if it doesn't exist
      var dateRef = userRef.collection('dates').doc(`${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`);
      dateRef.get().then(dateSnapshot=>{
        if (!dateSnapshot.exists){
          dateRef.set({
            date: `${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`
          });
        }
      }).then(result=>{
          // listen for changes in this user's tasks for this date
          dateRef
          .collection('tasks')
          .orderBy('timestamp', 'asc').onSnapshot(querySnapshot=>{
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
              minsNeededForTasks: tempMinsNeeded,
              tasksLoaded: true
            });
          });
      });
    });
  }

  switchNotes(){
    var db = firebase.firestore();
    this.setState({
      notesLoaded: false
    }, ()=>{
      if (this.state.selectedTask == ""){
        // show general notes
        const userRef = db.collection('users').doc(this.props.user.uid);
        userRef
        .collection('notes')
        .orderBy('timestamp', 'asc').onSnapshot(querySnapshot=>{
          var tempNotes = [];
          querySnapshot.forEach(doc=>{
            tempNotes.push(doc.data());
          });
          this.setState({
            notes: tempNotes,
            notesLoaded: true
          });
        });
      }
      else{
        // show notes specific to this task
        const taskRef = db.collection('users').doc(this.props.user.uid)
                        .collection("dates").doc(`${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`)
                        .collection('tasks').doc(this.state.selectedTask);

        // the selected task will always already exist in the database, so no need to check and create the task
        taskRef
        .collection('notes')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot=>{
          var tempNotes = [];
          querySnapshot.forEach(doc=>{
            tempNotes.push(doc.data());
          });
          this.setState({
            notes: tempNotes,
            notesLoaded: true
          });
        });
      }
    });
  }

  toggleNotesMenuLocked(){
    var newLocked = !this.state.notesMenuLocked;
    this.setState({
      notesMenuLocked: newLocked
    });
  }

  toggleShowNewNote(){
    this.setState(prevState => ({
      showNewNote: !prevState.showNewNote,
      showNewTask: false
    }), () =>{
      // disable footer popups
      if (this.state.showNewTask || this.state.showNewNote){
        this.setState({
          footerPopupsAllowed: false
        })
      }
      else{
        this.setState({
          footerPopupsAllowed: true
        })
      }
    });
  }

  toggleShowNewTask(){
    this.setState(prevState => ({
      showNewTask: !prevState.showNewTask,
      showNewNote: false
    }), () =>{
      // disable footer popups
      if (this.state.showNewTask || this.state.showNewNote){
        this.setState({
          footerPopupsAllowed: false
        })
      }
      else{
        this.setState({
          footerPopupsAllowed: true
        })
      }
    });
  }

  toggleShowNotesMenu(){
    if (!this.state.notesMenuLocked && this.state.showNotesMenu){
      this.setState({
        showNotesMenu: false
      })
    }
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
    const userRef = db.collection('users').doc(this.props.user.uid);

    // get the task name
    // the task name location is different depending on whether the button is checked or unchecked because of the image
    var task = e.target.parentElement.getElementsByClassName('taskText')[0];
    task = (task == undefined? e.target.parentElement.parentElement.getElementsByClassName('taskText')[0].innerHTML : task.innerHTML)

    //get current task finished state of this task in firestore
    var newFinished;
    userRef.collection('dates').doc(`${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`)
    .collection("tasks").doc(task)
    .get().then(doc=>{
      if (doc.exists){
        newFinished = !doc.data().finished;
      }
    })
    .then(result=>{
      // toggle whether task is finished in database
      userRef.collection('dates').doc(`${this.state.todayDate.month} ${this.state.todayDate.date}, ${this.state.todayDate.year}`)
      .collection("tasks").doc(task)
      .update({
        finished: newFinished
      });
    });
  }

  toggleTasksMenuLocked(){
    var newLocked = !this.state.tasksMenuLocked;
    this.setState({
      tasksMenuLocked: newLocked
    });
  }

  updateTodayTomorrowDates(){
    // compare current time with wake-up time, then change to next day if they match
    if (this.state.wakeupHour == this.state.currentDateTime.hour
        && this.state.wakeupMin == this.state.currentDateTime.min
        && this.state.wakeupClockMode== this.state.currentDateTime.am_pm){
        // reset today/tomorrow to the next day
        this.setTodayTomorrowDates();
    }
  }

  render(){
    return(
      <div>
        {/* notes menu side bar */}
        {
          this.state.showNotesMenu
          ?
            <NotesMenuBtn onClick={this.toggleNotesMenuLocked.bind(this)}>
              <img width='80%' height= '80%' src={this.state.notesMenuLocked? locked : unlocked}/>
            </NotesMenuBtn>
          :
            <NotesMenuBtn onMouseOver={this.handleNotesMouseOver.bind(this)}>
              <img width='80%' height= '80%' src={notesMenuImg}/>
            </NotesMenuBtn>
        }
        <div style={{float: 'left', zIndex: '13', position: 'fixed', opacity: this.state.showNotesMenu?1:0, transition: 'opacity 0.3s'}}>
          {this.state.showNotesMenu? <NotesMenu user={this.props.user} selectedTask={this.state.selectedTask} notes={this.state.notes}
                                      notesLoaded={this.state.notesLoaded} todayDate={this.state.todayDate}
                                      backToGeneralNotes={this.backToGeneralNotes.bind(this)} toggleShowNotesMenu={this.toggleShowNotesMenu.bind(this)}>
                                      </NotesMenu> : null}
        </div>

        {/* tasks menu side bar*/}
        {
          this.state.showTasksMenu
          ?
            (
              this.state.tasksMenuLocked
              ?
                <TasksMenuBtn onClick={this.toggleTasksMenuLocked.bind(this)}>
                  <img width='80%' height= '80%' src={locked}/>
                </TasksMenuBtn>
              :
                <TasksMenuBtn onClick={this.toggleTasksMenuLocked.bind(this)}>
                  <img width='80%' height= '80%' src={unlocked}/>
                </TasksMenuBtn>
            )
          :
            <TasksMenuBtn onMouseOver={this.handleTasksMouseOver.bind(this)}>
              <TasksMenuImg width='80%' height= '80%' src={tasksMenuImg}/>
            </TasksMenuBtn>
        }
        <div style={{float: 'right', zIndex: '13', position: 'fixed', opacity: this.state.showTasksMenu?1:0, transition: 'opacity 0.3s'}}>
          {this.state.showTasksMenu? <TasksMenu user={this.props.user} tasks={this.state.tasks} todayDate={this.state.todayDate} tmrwDate={this.state.tmrwDate} tasksLoaded={this.state.tasksLoaded}
                                      changeSelectedTaskFromTaskMenu={this.changeSelectedTaskFromTaskMenu.bind(this)} toggleShowTasksMenu={this.toggleShowTasksMenu.bind(this)}
                                      backToGeneralNotes={this.backToGeneralNotes.bind(this)} switchNotes={this.switchNotes.bind(this)}
                                      toggleTaskChecked={this.toggleTaskChecked.bind(this)}>
                                      </TasksMenu> : null}
        </div>

        {/* main center components */}
        <div style={{textAlign: 'center'}}>
          {/*<H3>Dashboard</H3>
          {this.props.user ? <P>{this.props.user.email}</P> : null}*/}
          <div>
              <H1>{this.state.currentDateTime.hour}:{this.state.currentDateTime.min} {this.state.currentDateTime.am_pm}</H1>
              <H3>{this.state.currentDateTime.day}, {this.state.currentDateTime.month} {this.state.currentDateTime.date}, {this.state.currentDateTime.year}</H3>
          </div>
          <DateCarousel>
            <div style={{float: 'left', display: 'flex', transform: 'translate(-20%, 0)', padding: '0', marginRight: '0'}}>
              <LeftRightBtn id='backward' onClick={this.changeTodayTmrw.bind(this)}><LeftRightBtnImg id='backwardImg' rotation='0deg' src={leftRightBtnImg}/></LeftRightBtn>
              <P_carousel>{this.state.todayDate.day}, {this.state.todayDate.month} {this.state.todayDate.date}, {this.state.todayDate.year}</P_carousel>
            </div>
            <div style={{float: 'right', display: 'flex', transform: 'translate(20%, 0)', padding: '0', marginLeft: '0'}}>
              <P_carousel>{this.state.tmrwDate.day}, {this.state.tmrwDate.month} {this.state.tmrwDate.date}, {this.state.tmrwDate.year}</P_carousel>
              <LeftRightBtn id='forward' onClick={this.changeTodayTmrw.bind(this)}><LeftRightBtnImg id='forwardImg' rotation='180deg' src={leftRightBtnImg}/></LeftRightBtn>
            </div>
          </DateCarousel>
          <div>
            <TaskBar
              changeSelectedTaskFromTaskBar={this.changeSelectedTaskFromTaskBar.bind(this)}
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
            <TodayTomorrow>
               <P float='left'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode}</P>
               <P float='right'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode}</P>
            </TodayTomorrow>
            <StatsContainer>
              <StatsImg onMouseOver={this.showStatistics.bind(this)} onMouseLeave={this.hideStatistics.bind(this)} src={statisticsImg}/>
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
            </StatsContainer>
          </div>
          <NewNoteAndTaskContainer>
            <NewNoteButton onClick={this.toggleShowNewNote.bind(this)}><NewNoteButtonImg src={newNoteButton}/></NewNoteButton>
            <CircleBtn state={this.state.showNewTask} onClick={this.toggleShowNewTask.bind(this)}>+</CircleBtn>
            {this.state.showNewNote?
              <NewNote
                todayDate={this.state.todayDate}
                user={this.props.user}
                selectedTask={this.state.selectedTask}
              ></NewNote>
              : null}
            {this.state.showNewTask?
              <NewTask
                user={this.props.user}
                submitTask={this.submitTask.bind(this)}
                handleNewTaskChange={this.handleNewTaskChange.bind(this)}
                task={this.state.task}
                hours={this.state.hours}
                mins={this.state.mins}
              ></NewTask> : null}
          </NewNoteAndTaskContainer>
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
          allowFooterPopup={this.allowFooterPopup.bind(this)}
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
          hideNoteTaskPopups={this.hideNoteTaskPopups.bind(this)}
          footerPopupsAllowed={this.state.footerPopupsAllowed}
        ></Footer>
      </div>
    );
  }
}

export default Dashboard;
