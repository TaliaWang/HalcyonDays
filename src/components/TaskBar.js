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
    this.state = {
      timePassedWidth: this.props.timePassedWidth,
      unfinishedTasks: this.props.unfinishedTasks,
      sleepHour: this.props.sleepHour,
      sleepMin: this.props.sleepMin,
      sleepClockMode: this.props.sleepClockMode,
      wakeupHour: this.props.wakeupHour,
      wakeupMin: this.props.wakeupMin,
      wakeupClockMode: this.props.wakeupClockMode,
      sleepWidth: 0,
    }
  }

  // width of sleep section
  calculateSleepWidth(){
    var wakeupHourRef = this.state.wakeupHour;
    if (this.state.wakeupClockMode == 'PM' && this.state.wakeupHour != 12){
      wakeupHourRef = wakeupHourRef + 12;
    }
    else if (this.state.wakeupClockMode == 'AM' && this.state.wakeupHour == 12){
      wakeupHourRef = 0;
    }
    // total reference minutes w.r.t 12 AM
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

    this.setState({
      sleepWidth: tempSleepWidth
    })


  }

  componentDidMount(){
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
    // change sleep state and recalculate sleep width if sleep props change
    if (this.props.sleepHour != prevProps.sleepHour
        || this.props.sleepMin != prevProps.sleepMin
        || this.props.sleepClockMode != prevProps.sleepClockMode){
      this.setState({
        sleepHour: this.props.sleepHour,
        sleepMin: this.props.sleepMin,
        sleepClockMode: this.props.sleepClockMode
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
            <div style={{marginTop: '-25px'}}>
              <Button>{this.state.sleepHour}:{this.state.sleepMin} {this.state.sleepClockMode}</Button>
            </div>
          </SleepTime>
        </div>
      </TasksContainer>
      </div>
    );
  }
}

export default TaskBar;
