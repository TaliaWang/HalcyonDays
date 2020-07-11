/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const Button = styled.button`
  transform: translate(-50%, 0);
  background-color: transparent;
  border: none;
`

const P = styled.p`

`

const TimeContainer = styled.div`
  margin: 20% 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
`

const TasksContainer = styled.div`
  border: 1px solid rgba(112,112,112,1);
  margin: -43px 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
  z-index: 5;
  width: 50%;
`

const RelaxationTime = styled.div`
  height: 40px;
  text-Align: left;
  width: ${props=>props.width}%;
  float: right;
  background-color: #FFFACD;
`

const SleepTime = styled.div`
  height: 40px;
  text-Align: left;
  width: ${props=>props.width}%;
  float: right;
  background-color: #AFEEEE;
`

const TimePassed = styled.div`
  height: ${props => props.height}px;
  margin-left: ${props => props.width}%;
  margin-top: -5px;
  margin-bottom: -5px;
  min-width: 5px;
  border: 1px solid black;
  background-color: white;
  z-index: 10;
`

const UnfinishedTask = styled.div`
  height: ${props => props.height};
  width: ${props => props.width}%;
  border-left: 1px solid white;
  background-color: black;
`


class TaskBar extends Component{
  constructor(props){
    super(props);
    this.barHeight = 50;
    this.barHeightUnit = 'px';
    this.minsInDay = 60*24;
    this.allowRelaxationTimeChanges = true;
    this.state = {
      timePassedWidth: this.props.timePassedWidth,
      unfinishedTasks: this.props.unfinishedTasks,
      sleepHour: this.props.sleepHour,
      sleepMin: this.props.sleepMin,
      sleepClockMode: this.props.sleepClockMode,
      relaxationHour: this.props.relaxationHour,
      relaxationMin: this.props.relaxationMin,
      relaxationClockMode: this.props.relaxationClockMode,
      wakeupHour: this.props.wakeupHour,
      wakeupMin: this.props.wakeupMin,
      wakeupClockMode: this.props.wakeupClockMode,
      relaxationWidth: 0,
      sleepWidth: 0,
    }
  }

  // width of relaxation section
  // depends on sleep time
  calculateRelaxationWidth(){
    var sleepHourRef = this.state.sleepHour;
    if (this.state.sleepClockMode == 'PM' && this.state.sleepHour != 12){
      sleepHourRef = sleepHourRef + 12;
    }
    else if (this.state.sleepClockMode == 'AM' && this.state.sleepHour == 12){
      sleepHourRef = 0;
    }
    // total reference sleep minutes w.r.t 12 AM
    var totalSleepMinsRef = sleepHourRef*60 + parseInt(this.state.sleepMin);

    var relaxationHourRef = this.state.relaxationHour;
    if (this.state.relaxationClockMode == 'PM' && this.state.relaxationHour != 12){
      relaxationHourRef = relaxationHourRef + 12;
    }
    else if (this.state.relaxationClockMode == 'AM' && this.state.relaxationHour == 12){
      relaxationHourRef = 0;
    }
    // total reference relaxation minutes w.r.t 12 AM
    var totalRelaxationMinsRef = relaxationHourRef*60 + parseInt(this.state.relaxationMin);

    var wakeupHourRef = this.state.wakeupHour;
    if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
      wakeupHourRef = wakeupHourRef + 12;
    }
    else if (this.state.wakeupClockMode == 'AM' && this.state.wakeupHour == 12){
      wakeupHourRef = 0;
    }
    // total reference wakeup minutes w.r.t 12 AM
    var totalWakeupMinsRef = wakeupHourRef*60 + parseInt(this.state.wakeupMin);

    // ensure relaxation time is before sleep time
    var isValidRelaxationTime = true;
    // no wrap around 12 AM
    if (totalWakeupMinsRef >= totalSleepMinsRef){
      // check that the relaxation time isn't between the two times
      if (totalRelaxationMinsRef > totalSleepMinsRef && totalRelaxationMinsRef < totalWakeupMinsRef){
        isValidRelaxationTime = false;
        this.blockRelaxationTimeChangesAndResetRelaxationTime();
      }
    }
    // wrap around 12 AM
    else if ((totalRelaxationMinsRef > totalSleepMinsRef && totalRelaxationMinsRef <= this.minsInDay)
              || (totalRelaxationMinsRef >= this.minsInDay && totalRelaxationMinsRef <= totalWakeupMinsRef)){
        isValidRelaxationTime = false;
        this.blockRelaxationTimeChangesAndResetRelaxationTime();
    }


    if (isValidRelaxationTime){
        this.allowRelaxationTimeChanges = true;
        var minsDifference;
        if (totalSleepMinsRef >= totalRelaxationMinsRef){
          minsDifference = totalSleepMinsRef - totalRelaxationMinsRef;
        }
        else{
          // calculate absolute difference from both times to 12 AM, then add them
          minsDifference = totalSleepMinsRef + (this.minsInDay - totalRelaxationMinsRef);
        }
        var tempRelaxationWidth = (minsDifference/this.minsInDay) * 100;

        // pass total minutes of relaxation time up to dashboard statistics
        this.props.setRelaxationTime(minsDifference);

        this.setState({
          relaxationWidth: tempRelaxationWidth
        });
    }
    else{
      alert(`Please set the relaxation time before ${this.state.sleepHour}:${this.state.sleepMin} ${this.state.sleepClockMode} (the time you sleep)!`);
    }
  }

  // width of sleep section
  // depends on wake up time
  calculateSleepWidth(){
    var wakeupHourRef = this.state.wakeupHour;
    if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
      wakeupHourRef = wakeupHourRef + 12;
    }
    else if (this.state.wakeupClockMode == 'AM' && this.state.wakeupHour == 12){
      wakeupHourRef = 0;
    }
    // total reference wakeup minutes w.r.t 12 AM
    var totalWakeupMinsRef = wakeupHourRef*60 + parseInt(this.state.wakeupMin);

    var sleepHourRef = this.state.sleepHour;
    if (this.state.sleepClockMode == 'PM' && this.state.sleepHour != 12){
      sleepHourRef = sleepHourRef + 12;
    }
    else if (this.state.sleepClockMode == 'AM' && this.state.sleepHour == 12){
      sleepHourRef = 0;
    }
    // total reference sleep minutes w.r.t 12 AM
    var totalSleepMinsRef = sleepHourRef*60 + parseInt(this.state.sleepMin);

    var minsDifference;
    if (totalWakeupMinsRef >= totalSleepMinsRef){
      minsDifference = totalWakeupMinsRef - totalSleepMinsRef;
    }
    else{
      // calculate absolute difference from both times to 12 AM, then add them
      minsDifference = totalWakeupMinsRef + (this.minsInDay - totalSleepMinsRef);
    }
    var tempSleepWidth = (minsDifference/this.minsInDay) * 100;

    // pass total minutes of sleep up to dashboard statistics
    this.props.setSleepTime(minsDifference);

    this.setState({
      sleepWidth: tempSleepWidth
    });

  }

  componentDidMount(){
    this.calculateRelaxationWidth();
    this.calculateSleepWidth();
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.unfinishedTasks != prevProps.unfinishedTasks){
      this.setState({
        unfinishedTasks: this.props.unfinishedTasks
      })
    }
    if (this.props.type == 'mainBar'){
      if (this.props.timePassedWidth != prevProps.timePassedWidth){
        this.setState({
          timePassedWidth: this.props.timePassedWidth
        })
      }
    }
    // change relaxation state and recalculate relaxation and sleep width if sleep props change
    if (this.props.relaxationHour != prevProps.relaxationHour
        || this.props.relaxationMin != prevProps.relaxationMin
        || this.props.relaxationClockMode != prevProps.relaxationClockMode){
      // only change current relaxation time if it's valid
      if (this.allowRelaxationTimeChanges){
        this.setState({
          relaxationHour: this.props.relaxationHour,
          relaxationMin: this.props.relaxationMin,
          relaxationClockMode: this.props.relaxationClockMode
        }, ()=>{
            this.calculateRelaxationWidth();
            this.calculateSleepWidth();
        })
      }
    }
    // change sleep state and recalculate sleep width if sleep props change
    if (this.props.sleepHour != prevProps.sleepHour
        || this.props.sleepMin != prevProps.sleepMin
        || this.props.sleepClockMode != prevProps.sleepClockMode){
      this.setState({
        sleepHour: this.props.sleepHour,
        sleepMin: this.props.sleepMin,
        sleepClockMode: this.props.sleepClockMode
      }, ()=>{
          this.calculateRelaxationWidth();
          this.calculateSleepWidth();
      })
    }
    // change wakeup state and recalculate sleep width if wakeup props change
    if (this.props.wakeupHour != prevProps.wakeupHour
        || this.props.wakeupMin != prevProps.wakeupMin
        || this.props.wakeupClockMode != prevProps.wakeupClockMode){
      this.setState({
        wakeupHour: this.props.wakeupHour,
        wakeupMin: this.props.wakeupMin,
        wakeupClockMode: this.props.wakeupClockMode
      }, ()=>{
          this.calculateSleepWidth();
      })
    }
  }

  getTaskWidth(task){
    var totalMins = task.hours*60 + task.mins;
    var widthPercent = totalMins/this.minsInDay*100;
    //alert(widthPercent);
    return widthPercent;
  }

  blockRelaxationTimeChangesAndResetRelaxationTime(){
    this.allowRelaxationTimeChanges = false;
      var db = firebase.firestore();
      db.collection('users').doc(this.props.user.email).update({
        relaxationHour: this.state.relaxationHour,
        relaxationMin: this.state.relaxationMin,
        relaxationClockMode: this.state.relaxationClockMode
      });

  }

  render(){
    return(
      <div style={{display: 'block'}}>
      {/* tasks container is on top of time container*/}
      <TimeContainer height={this.barheight}>
          <TimePassed height={this.barHeight} width={this.state.timePassedWidth}></TimePassed>
          {/*this.props.unfinishedTasks.map((task, index) =>
            <UnfinishedTask id={`unfinished_${task}${index}`} task={task} width={this.getTaskWidth(task)}/>
          )*/}
      </TimeContainer>
      <TasksContainer height={this.barheight}>
        <div style={{width: '100%'}}>
          <SleepTime width={this.state.sleepWidth}>
            <div style={{marginTop: '-30px', minWidth: '75px'}}>
              <Button>{this.state.sleepHour}:{this.state.sleepMin} {this.state.sleepClockMode}</Button>
            </div>
          </SleepTime>
          <RelaxationTime width={this.state.relaxationWidth}>
            <div style={{marginTop: '45px', minWidth: '75px'}}>
              <Button>{this.state.relaxationHour}:{this.state.relaxationMin} {this.state.relaxationClockMode}</Button>
            </div>
          </RelaxationTime>
        </div>
      </TasksContainer>
      </div>
    );
  }
}

export default TaskBar;
