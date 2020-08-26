/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import graphicSquare from "../images/graphicSquare.jpg";
import saveImg from "../images/saveImg.svg";

const ClockModeP = styled.p`
  background-color: transparent;
  color: white;
  border: none;
  transform: translate(0, -200%);
  font-size: 80%;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 0;
`

const Container = styled.div`
  text-align: center;
  background-color: transparent;
  margin-right: 5%;
  margin-left: 5%;
  position: relative;
  margin-top: 50px;
  height: 100%;
  width: 90%;
  border-radius: 10px;
  z-index: 40;
`

const Input = styled.input`
  background-color: transparent;
  color: white;
  height: 20px;
  position: relative;
  border: 1px solid white;
  outline: none;
  border-radius: 5px;
  padding: 3%;
  width: 40%;
  float: ${props=> props.float};

  ::placeholder{
    color: white;
  }
`


const P = styled.p`
  color: white;
  margin-left: auto;
  margin-right: auto;
  transform: translate(0, 20%);
  width: 5px;
  font-size: 100%;
`

const P_Form = styled.p`
  color: white;
  line-height: 1px;
  font-size: 100%;
`

const RightContainer = styled.div`
  float: right;
  transform: translate(130%, 0);
  margin: 0;
  padding: 0;
`

const SaveBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  padding: 0;
  margin-left: 5%;
  transform: translate(0, -150%);
  height: 20px;
  width: 20px;
`

const SaveImg = styled.img`
  height: 20px;
  width: 20px;
  padding: 0;
`

const TimeForm = styled.form`
  text-align: center;
  float: left;
  width: 85%;
  margin-top: -1%;
`

class TimeBarSettings extends Component{
  constructor(props){
    super(props);
    this.state = {
      relaxationHour: "",
      relaxationMin: "",
      relaxationClockMode: this.props.relaxationClockMode,
      sleepHour: "",
      sleepMin: "",
      sleepClockMode: this.props.sleepClockMode,
      wakeupHour: "",
      wakeupMin: "",
      wakeupClockMode: this.props.wakeupClockMode,
    }
  }

  handleSleepChange(e){
    if (e.target.id == 'sleepHour'){
      this.setState({
        sleepHour: e.target.value
      })
    }
    else if (e.target.id == 'sleepMin'){
      this.setState({
        sleepMin: e.target.value
      })
    }
  }

  handleRelaxationChange(e){
    if (e.target.id == 'relaxationHour'){
      this.setState({
        relaxationHour: e.target.value
      })
    }
    else if (e.target.id == 'relaxationMin'){
      this.setState({
        relaxationMin: e.target.value
      })
    }
  }

  handleWakeupChange(e){
    if (e.target.id=='wakeupHour'){
      this.setState({
        wakeupHour: e.target.value
      })
    }
    else if (e.target.id == 'wakeupMin'){
      this.setState({
        wakeupMin: e.target.value
      })
    }
  }

  submitSleepTime(e){
    e.preventDefault();
    if (this.state.sleepHour != "" && this.state.sleepMin != ""){
      var db = firebase.firestore();

      var newHour = parseInt(this.state.sleepHour);
      var newMin = parseInt(this.state.sleepMin);
      newMin = newMin < 10? '0' + newMin : '' + newMin;
    }

    db.collection("users").doc(this.props.user.uid)
    .update({
      sleepHour: newHour,
      sleepMin: newMin,
      sleepClockMode: this.state.sleepClockMode
    }).then(result=>{
      this.setState({
        sleepHour: "",
        sleepMin: "",
      })
    });
  }

  submitRelaxationTime(e){
    e.preventDefault();
    if (this.state.relaxationHour != "" && this.state.relaxationMin != ""){

      var sleepHourRef = this.props.sleepHour;
      if (this.props.sleepClockMode == 'PM' && this.props.sleepHour != 12){
        sleepHourRef = sleepHourRef + 12;
      }
      else if (this.props.sleepClockMode == 'AM' && this.props.sleepHour == 12){
        sleepHourRef = 0;
      }
      // total reference sleep minutes w.r.t 12 AM
      var totalSleepMinsRef = sleepHourRef*60 + parseInt(this.props.sleepMin);

      var relaxationHourRef = parseInt(this.state.relaxationHour);
      if (this.state.relaxationClockMode == 'PM' && this.state.relaxationHour != 12){
        relaxationHourRef = relaxationHourRef + 12;
      }
      else if (this.state.relaxationClockMode == 'AM' && this.state.relaxationHour == 12){
        relaxationHourRef = 0;
      }
      // total reference relaxation minutes w.r.t 12 AM
      var totalRelaxationMinsRef = relaxationHourRef*60 + parseInt(this.state.relaxationMin);

      var wakeupHourRef = this.props.wakeupHour;
      if (this.props.wakeupClockMode == 'PM' && this.props.wakeupHour != 12){
        wakeupHourRef = wakeupHourRef + 12;
      }
      else if (this.props.wakeupClockMode == 'AM' && this.props.wakeupHour == 12){
        wakeupHourRef = 0;
      }
      // total reference wakeup minutes w.r.t 12 AM
      var totalWakeupMinsRef = wakeupHourRef*60 + parseInt(this.props.wakeupMin);


      // ensure relaxation time is before sleep time
      var isValidRelaxationTime = true;
      // no wrap around 12 AM
      if (totalWakeupMinsRef >= totalSleepMinsRef){
        // check that the relaxation time isn't between the two times
        if (totalRelaxationMinsRef > totalSleepMinsRef && totalRelaxationMinsRef < totalWakeupMinsRef){
          isValidRelaxationTime = false;
        }
      }
      // wrap around 12 AM
      else if ((totalRelaxationMinsRef > totalSleepMinsRef && totalRelaxationMinsRef <= this.minsInDay)
                || (totalRelaxationMinsRef >= this.minsInDay && totalRelaxationMinsRef <= totalWakeupMinsRef)){
          isValidRelaxationTime = false;
      }


      if (isValidRelaxationTime){
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

          // change relaxation hour and min in database
          var db = firebase.firestore();
          var newHour = parseInt(this.state.relaxationHour);
          var newMin = parseInt(this.state.relaxationMin);
          newMin = newMin < 10? '0' + newMin : '' + newMin;

          db.collection("users").doc(this.props.user.uid)
          .update({
            relaxationHour: newHour,
            relaxationMin: newMin,
            relaxationClockMode: this.state.relaxationClockMode
          }).then(result=>{
            this.setState({
              relaxationHour: "",
              relaxationMin: "",
            })
          });
      }
      else{
        alert(`Please set the relaxation time before ${this.props.sleepHour}:${this.props.sleepMin} ${this.props.sleepClockMode} (the time you sleep)!`);
        this.setState({
          relaxationHour: "",
          relaxationMin: "",
        });
      }
    }
  }

  submitWakeupTime(e){
    e.preventDefault();
    if (this.state.wakeupHour != "" && this.state.wakeupMin != ""){
      var db = firebase.firestore();

      // adjust mins
      var newHour = parseInt(this.state.wakeupHour);
      var newMin = parseInt(this.state.wakeupMin);
      newMin = newMin < 10? '0' + newMin : '' + newMin;


      db.collection("users").doc(this.props.user.uid)
      .update({
        wakeupHour: newHour,
        wakeupMin: newMin,
        wakeupClockMode: this.state.wakeupClockMode
      }).then(result=>{
        this.setState({
          wakeupHour: "",
          wakeupMin: "",
        })
      }).then(result=>{
        this.props.calculateTimePassedWidth();
      });
    }
  }

  toggleWakeupClockMode(){
    if (this.state.wakeupClockMode == "AM"){
      this.setState({
        wakeupClockMode: "PM"
      });
    }
    else if (this.state.wakeupClockMode == "PM"){
      this.setState({
        wakeupClockMode: "AM"
      });
    }
  }

  toggleRelaxationClockMode(){
    if (this.state.relaxationClockMode == "AM"){
      this.setState({
        relaxationClockMode: "PM"
      });
    }
    else if (this.state.relaxationClockMode == "PM"){
      this.setState({
        relaxationClockMode: "AM"
      });
    }
  }

  toggleSleepClockMode(){
    var db = firebase.firestore();
    if (this.state.sleepClockMode == "AM"){
      this.setState({
        sleepClockMode: 'PM'
      });
    }
    else if (this.state.sleepClockMode == "PM"){
      this.setState({
        sleepClockMode: 'AM'
      });
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Container>

            <div>
              <TimeForm onSubmit={this.submitWakeupTime.bind(this)}>
                  <P_Form>Wake-up Time</P_Form>
                  <Input id='wakeupHour' value={this.state.wakeupHour} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                  <Input id='wakeupMin' value={this.state.wakeupMin} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                  <P>:</P>
                <RightContainer>
                  <ClockModeP onClick={this.toggleWakeupClockMode.bind(this)}>{this.state.wakeupClockMode}</ClockModeP>
                  <SaveBtn type='submit'><SaveImg src={saveImg}/></SaveBtn>
                </RightContainer>
              </TimeForm>
            </div>

            <div>
              <TimeForm onSubmit={this.submitRelaxationTime.bind(this)}>
                <P_Form>Relaxation Time</P_Form>
                <Input id='relaxationHour' value={this.state.relaxationHour} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour'/>
                <Input id='relaxationMin' value={this.state.relaxationMin} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute'/>
                <P>:</P>
                <RightContainer>
                  <ClockModeP onClick={this.toggleRelaxationClockMode.bind(this)}>{this.state.relaxationClockMode}</ClockModeP>
                  <SaveBtn type='submit'><SaveImg src={saveImg}/></SaveBtn>
                </RightContainer>
              </TimeForm>
            </div>

            <div>
              <TimeForm onSubmit={this.submitSleepTime.bind(this)}>
                  <P_Form>Sleep Time</P_Form>
                  <Input id='sleepHour' value={this.state.sleepHour} onChange={this.handleSleepChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                  <Input id='sleepMin' value={this.state.sleepMin} onChange={this.handleSleepChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                  <P>:</P>
                <RightContainer>
                  <ClockModeP onClick={this.toggleSleepClockMode.bind(this)}>{this.state.sleepClockMode}</ClockModeP>
                  <SaveBtn type='submit'><SaveImg src={saveImg}/></SaveBtn>
                </RightContainer>
              </TimeForm>
            </div>

        </Container>
      </div>
    );
  }
}

export default TimeBarSettings;
