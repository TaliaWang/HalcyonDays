/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const BufferTime = styled.div`
  background-color: #FFEFD5;
  width: ${props=>props.width}%;
  float: right;
  height: 40px;
  display: ${props=>props.showTickerAndBuffer ? 'auto' : 'none'}
`

const Button = styled.button`
  transform: translate(-50%, 0);
  background-color: transparent;
  border: none;
  color: #95ABFB;
`

const P = styled.p`
    margin-top: 10px;
    pointer-events: none;
`

const TimeContainer = styled.div`
  margin: 10% 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
  z-index: 1;


  @media (max-width: 1200px) {
    margin: 15% 20% 0 20%;
  }
  @media (max-width: 1000px) {
    margin: 20% 20% 0 20%;
  }
  @media (max-width: 800px) {
    margin: 25% 15% 0 15%;
  }
  @media (max-width: 600px) {
    margin: 25% 15% 0 15%;
  }
  @media (max-width: 400px) {
    margin: 35% 15% 0 15%;
  }
`

const TasksContainer = styled.div`
  border: 1px solid #95ABFB;
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  margin: -43px 25% 0 25%;
  height: ${props => props.height}px;
  display: flex;
  z-index: 1;
  width: 50%;

  @media (max-width: 1200px) {
    margin: -43px 20% 0 20%;
    width: 60%;
  }
  @media (max-width: 800px) {
    margin: -43px 15% 0 15%;
    width: 70%;
  }
`

const RelaxationTime = styled.div`
  height: 40px;
  text-Align: left;
  width: ${props=>props.width}%;
  float: right;
  background-color: #B7C6FB;
  z-index: 1;
`

const SleepTime = styled.div`
  height: 40px;
  text-Align: left;
  width: ${props=>props.width}%;
  float: right;
  background-color: #95ABFB;
  z-index: 1;
`

const TimePassed = styled.div`
  height: ${props => props.height}px;
  background: transparent;
  margin-left: ${props => props.width}%;
  margin-top: -5px;
  margin-bottom: -5px;
  min-width: 5px;
  border: 1px solid black;
  background-color: white;
  z-index: 12;
  pointer-events: none;
  opacity: ${props=>props.showTickerAndBuffer? 1 : 0}
`

const Task = styled.button`
  border-left: 1px solid white;
  border-top: none;
  border-bottom: none;
  border-right: none;
  background-color: ${props=>props.finished? '#FFADD7' : '#FDCBBC'};
  color: white;
  float: right;
  height: 40px;
  text-align: center;
  z-index: 11;
  width: ${props => props.width}%;

  &:hover{
    background-color: ${props=>props.finished? '#ff94cb' : '#fcb8a3'};
  }
`


class TaskBar extends Component{
  constructor(props){
    super(props);
    this.barHeight = 50;
    this.barHeightUnit = 'px';
    this.minsInDay = 60*24;
    this.state = {
      timePassedWidth: this.props.timePassedWidth,
      tasks: this.props.tasks,
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
      bufferwidth: 0
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

    var minsDifference;
    if (totalSleepMinsRef >= totalRelaxationMinsRef){
      minsDifference = totalSleepMinsRef - totalRelaxationMinsRef;
    }
    else{
      // calculate absolute difference from both times to 12 AM, then add them
      minsDifference = totalSleepMinsRef + (this.minsInDay - totalRelaxationMinsRef);
    }
    var tempRelaxationWidth = (minsDifference/this.minsInDay) * 100;

    // pass total minutes of relaxation up to dashboard statistics
    this.props.setRelaxationTime(minsDifference);

    this.setState({
      relaxationWidth: tempRelaxationWidth
    });
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
    if (this.props.tasks != prevProps.tasks){
      this.setState({
        tasks: this.props.tasks
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
      this.setState({
        relaxationHour: this.props.relaxationHour,
        relaxationMin: this.props.relaxationMin,
        relaxationClockMode: this.props.relaxationClockMode
      }, ()=>{
          this.calculateRelaxationWidth();
          this.calculateSleepWidth();
      });
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

  getBufferWidth(){
    // subtract state timepassedwidth, relaxationwidth, sleepwidth, and width of all unfinished tasks from the total width
    var tempBufferWidth = 0;
    tempBufferWidth = 100 - this.state.timePassedWidth - this.state.relaxationWidth - this.state.sleepWidth;
    this.state.tasks.forEach(task =>{
      if (!task.finished){
        tempBufferWidth = tempBufferWidth - this.getTaskWidth(task);
      }
    });
    tempBufferWidth = (tempBufferWidth > 0 ? tempBufferWidth : 0);
    return tempBufferWidth;
  }

  getTaskWidth(task){
    var totalMins = task.hours*60 + task.mins;
    var widthPercent = totalMins/this.minsInDay*100;
    //alert(widthPercent);
    return widthPercent;
  }


  render(){
    return(
      <div style={{display: 'block', width: '100%'}}>
        {/* tasks container is below time container*/}
        <TimeContainer height={this.barheight}>
            <TimePassed
              height={this.barHeight}
              width={this.state.timePassedWidth}
              showTickerAndBuffer={this.props.showTickerAndBuffer}
            ></TimePassed>
        </TimeContainer>
        {/* NOTE: top to bottom appears in order right to left */}
        <TasksContainer height={this.barheight}>
          <div style={{width: '100%', zIndex: '10'}}>
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
            <BufferTime
            width={this.getBufferWidth()}
            showTickerAndBuffer={this.props.showTickerAndBuffer}
            ></BufferTime>
            {/* unfinished tasks come before finished tasks */}
            {/* oldest added tasks show up on left, hence slice and reverse */}
            {this.state.tasks.slice(0).reverse().map((task, index) =>
              task.finished? null : <Task id={`${index}taskChunk_${task.name}`} key={`${index}taskChunk_${task}`} onClick={this.props.changeSelectedTaskFromTaskBar} width={this.getTaskWidth(task)} finished={task.finished}/>
            )}
            {this.state.tasks.slice(0).reverse().map((task, index) =>
              task.finished? <Task id={`${index}taskChunk_${task.name}`} key={`${index}taskChunk_${task}`} onClick={this.props.changeSelectedTaskFromTaskBar} width={this.getTaskWidth(task)} finished={task.finished}><P>✓</P></Task> : null
            )}
          </div>
        </TasksContainer>
      </div>
    );
  }
}

export default TaskBar;
