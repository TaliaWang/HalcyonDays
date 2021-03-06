/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import graphicSquare from "../images/graphicSquare.jpg"

const ClockModeBtn = styled.button`
  background-color: black;
  color: white;
  border: none;
  margin-top: 5%;
`

const Container = styled.div`
  text-align: center;
  background-color: black;
  position: fixed;
  min-height: 280px;
  min-height: 20%;
  width: 35%;
  border-radius: 10px;
  padding: 1%;
  bottom: 11vh;
  margin-left: 50%;
  transform: translate(-50%, 0);
  z-index: 40;

  @media (max-width: 1000px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 400px) {
    width: 90%;
  }
`

const Img = styled.img`
  margin-top: -1.5vh;
  width: 200px;
  height: 200px;
  border-radius: 5px;
`

const Input = styled.input`
  height: 15px;
  position: relative;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 3%;
  width: 40%;
  float: ${props=> props.float};

  @media (max-width: 1000px) {
    height: 8px;
  }
  @media (max-width: 800px) {
    height: 8px;
  }
`

const LogoutButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 2px;
  padding: 2%;
  font-size: 120%;
  margin-top: 5vh;
`


const P = styled.p`
  color: white;
  position: relative;
  font-size: 120%;
`

const P_Form = styled.p`
  color: white;
  line-height: 1px;
  font-size: 120%;
`

const TimeForm = styled.form`
  text-align: center;
  float: left;
  width: 85%;
`

class FooterPopup extends Component{
  constructor(props){
    super(props);
    this.state = {
      popupOption: this.props.popupOption,
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

  componentDidUpdate(prevProps){
    if (this.state.popupOption != this.props.popupOption){
      this.setState({
        popupOption: this.props.popupOption,
      })
    }
    if (this.state.relaxationClockMode != this.props.relaxationClockMode){
      this.setState({
        relaxationClockMode: this.props.relaxationClockMode
      });
    }
    if (this.state.sleepClockMode != this.props.sleepClockMode){
      this.setState({
        sleepClockMode: this.props.sleepClockMode
      });
    }
    if (this.state.wakeupClockMode != this.props.wakeupClockMode){
      this.setState({
        wakeupClockMode: this.props.wakeupClockMode
      });
    }
  }

  logout(){
    firebase.auth().signOut();
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

      var relaxationHourRef = this.state.relaxationHour;
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
    var db = firebase.firestore();
    if (this.props.wakeupClockMode == "AM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        wakeupClockMode: "PM"
      }).then(result=>{
          this.props.calculateTimePassedWidth();
      });
    }
    else if (this.props.wakeupClockMode == "PM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        wakeupClockMode: "AM"
      }).then(result=>{
          this.props.calculateTimePassedWidth();
      });
    }
  }

  toggleRelaxationClockMode(){
    var db = firebase.firestore();
    if (this.props.relaxationClockMode == "AM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        relaxationClockMode: "PM"
      });
    }
    else if (this.props.relaxationClockMode == "PM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        relaxationClockMode: "AM"
      });
    }
  }

  toggleSleepClockMode(){
    var db = firebase.firestore();
    if (this.props.sleepClockMode == "AM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        sleepClockMode: "PM"
      });
    }
    else if (this.props.sleepClockMode == "PM"){
      db.collection("users").doc(this.props.user.uid)
      .update({
        sleepClockMode: "AM"
      });
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Container>
          {/* switch between the different popups */}
          {
            {
              'clock':
                <div>
                  <div>

                    <div>
                      <TimeForm onSubmit={this.submitWakeupTime.bind(this)}>
                          <P_Form>Set Wake-up Time</P_Form>
                          <Input id='wakeupHour' value={this.state.wakeupHour} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                          <Input id='wakeupMin' value={this.state.wakeupMin} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                          <button type='submit' style={{display: 'none'}}/>
                      </TimeForm>
                      <div style={{float: 'right', padding: '0.5%', marginTop: '4vh'}}>
                        <ClockModeBtn onClick={this.toggleWakeupClockMode.bind(this)}>{this.state.wakeupClockMode}</ClockModeBtn>
                      </div>
                    </div>
                    <br/><br/><br/>

                    <div>
                      <TimeForm onSubmit={this.submitRelaxationTime.bind(this)}>
                        <P_Form>Set Relaxation Time</P_Form>
                        <Input id='relaxationHour' value={this.state.relaxationHour} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour'/>
                        <Input id='relaxationMin' value={this.state.relaxationMin} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute'/>
                        <button type='submit' style={{display: 'none'}}/>
                      </TimeForm>
                      <div style={{float: 'right', padding: '0.5%', marginTop: '4vh'}}>
                        <ClockModeBtn onClick={this.toggleRelaxationClockMode.bind(this)}>{this.state.relaxationClockMode}</ClockModeBtn>
                      </div>
                    </div>
                    <br/><br/><br/>

                    <div>
                      <TimeForm onSubmit={this.submitSleepTime.bind(this)}>
                          <P_Form>Set Sleep Time</P_Form>
                          <Input id='sleepHour' value={this.state.sleepHour} onChange={this.handleSleepChange.bind(this)} type='number' type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                          <Input id='sleepMin' value={this.state.sleepMin} onChange={this.handleSleepChange.bind(this)} type='number' type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                          <button type='submit' style={{display: 'none'}}/>
                      </TimeForm>
                      <div style={{float: 'right', padding: '0.5%', marginTop: '4vh'}}>
                        <ClockModeBtn onClick={this.toggleSleepClockMode.bind(this)}>{this.state.sleepClockMode}</ClockModeBtn>
                      </div>
                    </div>

                  </div>
                </div>,
              'moreOptions':
                <div>
                  <P>Coming soon!</P>
                  <Img src={graphicSquare}/>
                </div>,
              'settings':
                <div>
                  <LogoutButton onClick={this.logout.bind(this)}>Log out</LogoutButton>
                  {this.props.user == null ? null : <P>{this.props.user.email}</P>}
                </div>,
            }[this.state.popupOption]
          }
        </Container>
      </div>
    );
  }
}

export default FooterPopup;
