/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import Footer from "./Footer.js"
import Header from "./Header.js"
import NewNote from "./NewNote.js"
import NewTask from "./NewTask.js"
import NotesMenu from "./NotesMenu.js"
import Statistics from "./Statistics.js"
import TaskBar from "./TaskBar.js"
import TasksMenu from "./TasksMenu.js"
import leftRightBtnImg from "../images/leftRightBtn.png"
import locked from "../images/locked.png"
import newNoteButton from "../images/newNoteButton.png"
import notesMenuImg from "../images/notesMenuImg.svg"
import statisticsImg from "../images/statisticsImg.svg"
import tasksMenuImg from "../images/tasksMenuImg.svg"
import unlocked from "../images/unlocked.png"

const CurrentDateTime = styled.div`
`

const DateCarousel = styled.div`
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  border-radius: 3px;
  height: 35px;
  width: 450px;
  text-align: left;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;

  @media (max-width: 600px) {
    width: 375px;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (max-width: 400px) {
    width: 290px;
    height: 25px;
    padding-left: 7px;
    padding-right: 7px;
  }
`

const H1 = styled.h1`
  margin-top: calc(100px + 5%);
  font-weight: normal;
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
  font-size: 150%;
  color: black;
`

const LeftRightBtnImg = styled.img`
  transform: rotate(${props=>props.rotation});
  height: 20px;
  width: 20px;

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

const NewTaskBtn = styled.button`
  background-color: ${(props) => props.state ? "black" : "white"};
  border-radius:50%;
  border: 1px solid;
  border-color: ${(props) => props.state ? "white" : "black"};
  color: ${(props) => props.state ? "white" : "black"};
  font-size: 50px;
  padding: 0 15px 0 15px;
  margin: 3% 0 0 0;
  transform: translate(30%, 0);

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

const NotesMenuBtn = styled.button`
  background-color: ${props=>props.backgroundColor};
  color: #95ABFB;
  font-size: 100%;
  border: none;
  border-radius: 3px;
  float: left;
  top: 65px;
  left: 1vh;
  z-index: 10;
  padding: 5px 7px 5px 7px;
  position: fixed;
`

const P = styled.p`
  color: #95ABFB;
  width: 70px;
  font-size: 15px;
  float: ${props=>props.float};
  transform: ${props=>props.float=='left'? 'translate(-50%, 0)' : 'translate(50%, 0)'};
`

const P_carousel = styled.p`
  font-size: 15px;
  margin-top: 5px;
  color: ${props=>props.isToday ? 'black' : '#B7C6FB'};
  float: ${props=>props.float};

  @media (max-width: 600px) {
     font-size: 12.25px;
  }
  @media (max-width: 400px) {
     font-size: 9px;
  }
`

const StatsBtn = styled.button`
  background-color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 50%;
  transform: translate(-50%, 0);
  color: #95ABFB;
  font-size: 100%;
  padding: 5px 7px 5px 7px;
  z-index: 15;
`

const StatsContainer = styled.div`
  position: relative;
  margin-left: 50%;
  margin-top: calc(-2% - 40px);
  position: fixed;
  bottom: 3vh;
  height: 30vh;
  width: 30%;
  z-index: 100;

  @media (max-width: 800px) {
    width: 20%;
  }
`

const StatsImg = styled.img`
  position: relative;
`

const TasksMenuBtn = styled.button`
  background-color: ${props=>props.backgroundColor};
  color: #95ABFB;
  border: none;
  border-radius: 3px;
  font-size: 100%;
  margin: 0;
  top: 65px;
  right: 1vh;
  float: right;
  z-index: 10;
  padding: 5px 7px 5px 7px;
  position: fixed;
`

const TasksMenuImg = styled.img`
`

const WakeupTimes =styled.div`
  margin: 20px 25% 0 25%;

  @media (max-width: 1200px) {
    margin: 20px 20% 0 20%;
  }
  @media (max-width: 800px) {
    margin: 20px 15% 0 15%;
  }
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.minsInDay = 60*24;
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    this.state = {
      currentDateTime: {
        currentDayObject: new Date(),
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
        year: 0,
        isCurrent: false,
      },
      tmrwDate: {
        tmrwObject: null,
        day: "",
        date: 0,
        month: "",
        year: 0,
        isCurrent: false
      },
      showNewNote: false,
      showNotesMenu: false,
      showNewTask: false,
      showStatistics: false,
      showTasksMenu: false,
      tasksMenuLocked: false,
      notes: [],
      tasks:[],
      timePassedInMins: 0,
      timePassedWidth: 0,
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
      tasksLoaded: false,
      showTickerAndBuffer: true,
      countdownsLocked: false
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
      showNotesMenu: true
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
      showNotesMenu: true
    }, ()=>{
        this.switchNotes(); // change notes displayed in notes menu
    });
  }

  changeTodayTmrw(e){
    if (e.target.id == 'backward' || e.target.id == 'backwardImg'){
      // set tmrw as current today
      var tmrw = this.state.tmrwDate.tmrwObject;
      tmrw.setDate(tmrw.getDate() - 1);
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

      this.setState({
        todayDate: {
          todayObject: today,
          day: todayDay,
          date: todayDate,
          month: todayMonth,
          year: todayYear,
          isCurrent: false
        },
        tmrwDate: {
          tmrwObject: tmrw,
          day: tmrwDay,
          date: tmrwDate,
          month: tmrwMonth,
          year: tmrwYear,
          isCurrent: false
        }
      }, ()=>{
        this.compareTodayTomorrowWithCurrentDate();
        this.switchDate();
      });
    }
    else if (e.target.id == 'forward' || e.target.id == 'forwardImg'){
      // set today as current tmrw
      var today = this.state.todayDate.todayObject;
      today.setDate(today.getDate() + 1);
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

      this.setState({
        todayDate: {
          todayObject: today,
          day: todayDay,
          date: todayDate,
          month: todayMonth,
          year: todayYear,
          isCurrent: false,
        },
        tmrwDate: {
          tmrwObject: tmrw,
          day: tmrwDay,
          date: tmrwDate,
          month: tmrwMonth,
          year: tmrwYear,
          isCurrent: false,
        }
      }, () =>{
        this.compareTodayTomorrowWithCurrentDate();
        this.switchDate();
      });
    }
  }

  changeTodayTmrwFromCalendar(value, event){
    var today = new Date(value);

    var todayDay = this.days[today.getDay()];
    var todayDate = today.getDate();
    var todayMonth = this.months[today.getMonth()];
    var todayYear = today.getFullYear();

    var tmrw = new Date(today);
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
        year: todayYear,
        isCurrent: false,
      },
      tmrwDate: {
        tmrwObject: tmrw,
        day: tmrwDay,
        date: tmrwDate,
        month: tmrwMonth,
        year: tmrwYear,
        isCurrent: false,
      }
    }, () =>{
      this.compareTodayTomorrowWithCurrentDate();
      this.switchDate();
    });
  }

  compareTodayTomorrowWithCurrentDate(){
    var tempTodayDate = this.state.todayDate;
    var tempTmrwDate = this.state.tmrwDate;

    // determine whether to set today as current day
    if (this.state.todayDate.month == this.state.currentDateTime.month
        && this.state.todayDate.date == this.state.currentDateTime.date
        && this.state.todayDate.year == this.state.currentDateTime.year){
          tempTodayDate.isCurrent = true;
          tempTmrwDate.isCurrent = false;
    }
    // if today is not current day, then tomorrow MIGHT be current day
    else if (this.state.tmrwDate.month == this.state.currentDateTime.month
        && this.state.tmrwDate.date == this.state.currentDateTime.date
        && this.state.tmrwDate.year == this.state.currentDateTime.year){
          tempTodayDate.isCurrent = false;
          tempTmrwDate.isCurrent = true;
    }
    // else neither date is current date because the user is scrolling to future/past days
    else{
        tempTodayDate.isCurrent = false;
        tempTmrwDate.isCurrent = false;
    }
    this.setState({
      todayDate: tempTodayDate,
      tmrwDate: tempTmrwDate
    }, ()=>{
       // determine whether task bar should show ticker and buffer (should only show for current day's today/tomorrow)
       // if it's after 12 AM and before wake up time, and current date shows in place of tomorrow, show the ticker/buffer
       // if it's any other time, and the current date shows in place of today, show the ticker/buffer
       var tempCurrentDateTime = new Date();
       var currentTimeInMins = (tempCurrentDateTime.getHours() * 60 + tempCurrentDateTime.getMinutes());
       var wakeupTimeInMins = 0;

       if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
         wakeupTimeInMins = (this.state.wakeupHour + 12)*60 + parseInt(this.state.wakeupMin);
       }
       else if (this.state.wakeupClockMode == 'AM' && this.state.wakeupHour == 12){
         wakeupTimeInMins = 0 + parseInt(this.state.wakeupMin);
       }
       else{
         wakeupTimeInMins = this.state.wakeupHour*60 + parseInt(this.state.wakeupMin);
       }

       // it's after 12 AM and before wake up time
       if (currentTimeInMins < wakeupTimeInMins && this.state.tmrwDate.isCurrent){
         this.setState({
           showTickerAndBuffer: true
         });
       }
       else if (currentTimeInMins >= wakeupTimeInMins && this.state.todayDate.isCurrent){
         this.setState({
           showTickerAndBuffer: true
         });
       }
       else{
         this.setState({
           showTickerAndBuffer: false
         });
       }

    });

  }

  componentDidMount(){
    // Add new user to database if they are verified
    if (this.props.user != null && this.props.user.emailVerified){
      // set the dates for today/tomorrow early here so that today/tomorrow can be created in the database
      this.calculateCurrentDateTime();
      this.setTodayTomorrowDates();

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
          }, ()=>{
            this.calculateTimePassedWidth();
            this.setTodayTomorrowDates();

            // update current time and time passed every minute
            setInterval(result=>{
              this.calculateTimePassedWidth();
            }, 60000);

            // check whether today/tomorrow should up dated every 15 seconds
            // note: checking every minute might not be frequent enough,
            // since case to reset today/tomorrow occurs when current time == wakeup time
            setInterval(result=>{
              this.calculateCurrentDateTime();
              this.updateTodayTomorrowDates();
            }, 1000);
          });
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
                }, ()=>{
                  this.setTodayTomorrowDates();
                });

                //listen for changes in this user's general notes
                this.switchNotes();

                // listen for changes in this user's tasks for this date
                this.switchDate();
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
        currentDayObject: d,
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

  showNotesMenu(){
    this.setState({
      showNotesMenu: true
    })
  }

  showTasks(){
    this.setState({
      showTasksMenu: true
    });
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
    var todayDay;
    var todayDate;
    var todayMonth;
    var todayYear;

    // adjust the day that shows as "today"
    // if the current time is before 12 AM, then today matches current day
    // but if the current time is after 12 AM and before wake-up time, "tomorrow" should actually match the current day, so we set "today" 1 day back

    //here we get the current time again instead of using the state object, to guard against initially when state object is null
    var tempCurrentDateTime = new Date();
    var currentTimeInMins = (tempCurrentDateTime.getHours() * 60 + tempCurrentDateTime.getMinutes());
    var wakeupTimeInMins = 0;

    if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
      wakeupTimeInMins = (this.state.wakeupHour + 12)*60 + parseInt(this.state.wakeupMin);
    }
    else if (this.state.wakeupClockMode == 'AM' && this.state.wakeupHour == 12){
      wakeupTimeInMins = 0 + parseInt(this.state.wakeupMin);
    }
    else{
      wakeupTimeInMins = this.state.wakeupHour*60 + parseInt(this.state.wakeupMin);
    }

    if (currentTimeInMins < wakeupTimeInMins){
      // set today back 1 day
      today.setDate(today.getDate() - 1);
      todayDay = this.days[today.getDay()];
      todayDate = today.getDate();
      todayMonth = this.months[today.getMonth()];
      todayYear = today.getFullYear();
    }
    else{
      // keep today same as current day
      todayDay = this.days[today.getDay()];
      todayDate = today.getDate();
      todayMonth = this.months[today.getMonth()];
      todayYear = today.getFullYear();
    }

    // get tomorrow's date and time
    var tmrw = new Date(today);
    tmrw.setDate(tmrw.getDate() + 1);
    var tmrwDay = this.days[tmrw.getDay()];
    var tmrwDate = tmrw.getDate();
    var tmrwMonth = this.months[tmrw.getMonth()];
    var tmrwYear = tmrw.getFullYear();

    this.setState(prevState=>({
      todayDate: {
        todayObject: today,
        day: todayDay,
        date: todayDate,
        month: todayMonth,
        year: todayYear,
        isCurrent: prevState.todayDate.isCurrent
      },
      tmrwDate: {
        tmrwObject: tmrw,
        day: tmrwDay,
        date: tmrwDate,
        month: tmrwMonth,
        year: tmrwYear,
        isCurrent: prevState.tmrwDate.isCurrent
      }
    }), ()=>{
      this.compareTodayTomorrowWithCurrentDate();
    });
  }

  showStatistics(){
    this.setState({
      showStatistics: true
    });
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

  hideNotesMenu(){
    this.setState({
      showNotesMenu: false
    });
  }

  hideTasksMenu(){
    this.setState({
      showTasksMenu: false
    });
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
    if (this.state.todayDate.isCurrent){
        // only update today/tomorrow when current time is wake up time or when it's 12 AM
        if ((this.state.wakeupHour == this.state.currentDateTime.hour && this.state.wakeupMin == this.state.currentDateTime.min && this.state.wakeupClockMode == this.state.currentDateTime.am_pm)
           ||
            (this.state.currentDateTime.hour == 12 && this.state.currentDateTime.min == '00' && this.state.currentDateTime.am_pm == 'AM')){
           this.setTodayTomorrowDates();
        }
    }
    else if (this.state.tmrwDate.isCurrent){
        // here, we DON'T need to make sure if the user has just navigated to show tomorrow on the right, because even if this is the case, the dates still won't update
        // only update if current time is wake up time
        if (this.state.wakeupHour == this.state.currentDateTime.hour
           && this.state.wakeupMin == this.state.currentDateTime.min
           && this.state.wakeupClockMode == this.state.currentDateTime.am_pm){
           this.setTodayTomorrowDates();
        }
    }
    // else, don't update today/tomorrow because user is navigating
  }

  render(){
    return(
      <div>
        {/* top components in header */}
        <Header
          user={this.props.user}
          /* calendar props */
          changeTodayTmrwFromCalendar={this.changeTodayTmrwFromCalendar.bind(this)}
          /* settings props */
          setRelaxationTime={this.setRelaxationTime.bind(this)}
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
        ></Header>
        {/* notes menu side bar */}
        <div style={{opacity: this.state.showNotesMenu?0:1, transition: 'opacity 0.3s'}}>
          <NotesMenuBtn
            className="icon"
            backgroundColor={'white'}
            onClick={this.showNotesMenu.bind(this)}>
            <img style={{transform: 'translate(0, 10%)'}} height='20px' width='20px' src={notesMenuImg}/>
            &nbsp;My Notes
          </NotesMenuBtn>
        </div>
        <div style={{zIndex: 1, position: 'fixed', opacity: this.state.showNotesMenu?1:0, transition: 'opacity 0.3s'}}>
          <NotesMenu
          user={this.props.user}
          selectedTask={this.state.selectedTask}
          notes={this.state.notes}
          notesLoaded={this.state.notesLoaded}
          todayDate={this.state.todayDate}
          backToGeneralNotes={this.backToGeneralNotes.bind(this)}
          hideNotesMenu={this.hideNotesMenu.bind(this)}
          ></NotesMenu>
        </div>

        {/* tasks menu side bar*/}
        <div style={{opacity: this.state.showTasksMenu?0:1, transition: 'opacity 0.3s'}}>
          <TasksMenuBtn
            className="icon"
            backgroundColor={'white'}
            onClick={this.showTasks.bind(this)}>
            <img style={{transform: 'translate(0, 10%)'}} height='20px' width='22px' src={tasksMenuImg}/>
            &nbsp;My Tasks
          </TasksMenuBtn>
          </div>
        <div style={{zIndex: 1, position: 'fixed', opacity: this.state.showTasksMenu?1:0, transition: 'opacity 0.3s'}}>
          <TasksMenu user={this.props.user}
            tasks={this.state.tasks}
            todayDate={this.state.todayDate}
            tmrwDate={this.state.tmrwDate}
            tasksLoaded={this.state.tasksLoaded}
            changeSelectedTaskFromTaskMenu={this.changeSelectedTaskFromTaskMenu.bind(this)}
            hideTasksMenu={this.hideTasksMenu.bind(this)}
            backToGeneralNotes={this.backToGeneralNotes.bind(this)} switchNotes={this.switchNotes.bind(this)}
            toggleTaskChecked={this.toggleTaskChecked.bind(this)}>
          </TasksMenu>
        </div>

        {/* main center components */}
        <div style={{textAlign: 'center'}}>
          {/*<H3>Dashboard</H3>
          {this.props.user ? <P>{this.props.user.email}</P> : null}*/}
          <H1>{this.state.currentDateTime.hour}:{this.state.currentDateTime.min} {this.state.currentDateTime.am_pm}</H1>
          <DateCarousel>
            <div style={{float: 'left', display: 'flex', transform: 'translate(-20%, 0)', padding: '0', marginRight: '0'}}>
              <LeftRightBtn id='backward' onClick={this.changeTodayTmrw.bind(this)}>
                &lt;&nbsp;&nbsp;
              </LeftRightBtn>
              <P_carousel isToday={this.state.todayDate.isCurrent}>{this.state.todayDate.day}, {this.state.todayDate.month} {this.state.todayDate.date}, {this.state.todayDate.year}</P_carousel>
            </div>
            <div style={{float: 'right', display: 'flex', transform: 'translate(20%, 0)', padding: '0', marginLeft: '0'}}>
              <P_carousel isToday={this.state.tmrwDate.isCurrent}>{this.state.tmrwDate.day}, {this.state.tmrwDate.month} {this.state.tmrwDate.date}, {this.state.tmrwDate.year}</P_carousel>
              <LeftRightBtn id='forward' onClick={this.changeTodayTmrw.bind(this)}>
                &nbsp;&nbsp;&gt;
              </LeftRightBtn>
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
              showTickerAndBuffer={this.state.showTickerAndBuffer}
            ></TaskBar>
            {/* start and end times of the day */}
            <WakeupTimes>
               <P float='left'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode}</P>
               <P float='right'>{this.state.wakeupHour}:{this.state.wakeupMin} {this.state.wakeupClockMode}</P>
            </WakeupTimes>
            <StatsContainer>
              <div style={{opacity: this.state.showStatistics?0:1, transition: 'opacity 0.3s'}}>
              <StatsBtn onClick={this.showStatistics.bind(this)} className='icon'>
                <img src={statisticsImg}/>
                &nbsp;My Stats
              </StatsBtn>
              </div>
              <div style={{opacity: this.state.showStatistics?1:0, transition: 'opacity 0.3s'}}>
                <Statistics
                  numTasks={this.state.tasks.length}
                  numFinishedTasks={this.state.tasks.length - this.state.unfinishedTasks.length}
                  relaxationTimeHours={this.state.relaxationTimeHours}
                  relaxationTimeMins={this.state.relaxationTimeMins}
                  sleepTimeHours={this.state.sleepTimeHours}
                  sleepTimeMins={this.state.sleepTimeMins}
                  hoursNeededForTasks={this.state.hoursNeededForTasks}
                  minsNeededForTasks={this.state.minsNeededForTasks}
                  hideStatistics={this.hideStatistics.bind(this)}
                ></Statistics>
              </div>
            </StatsContainer>
          </div>
          <NewNoteAndTaskContainer>
            <NewNoteButton onClick={this.toggleShowNewNote.bind(this)}><NewNoteButtonImg src={newNoteButton}/></NewNoteButton>
            <NewTaskBtn state={this.state.showNewTask} onClick={this.toggleShowNewTask.bind(this)}>+</NewTaskBtn>
            {this.state.showNewNote?
              <NewNote
                todayDate={this.state.todayDate}
                user={this.props.user}
                selectedTask={this.state.selectedTask}
              ></NewNote>
              : null}
            {this.state.showNewTask?
              <NewTask
                todayDate={this.state.todayDate}
                user={this.props.user}
              ></NewTask> : null}
          </NewNoteAndTaskContainer>
        </div>

      </div>
    );
  }
}

export default Dashboard;
