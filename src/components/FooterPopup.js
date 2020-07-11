/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';

const ClockModeBtn = styled.button`
  background-color: black;
  color: white;
  border: none;
  margin-top: 4vh;
`

const Container = styled.div`
  text-align: center;
  background-color: black;
  position: relative;
  margin-left: 35%;
  margin-right: 35%;
  height: 28vh;
  border-radius: 10px;
  padding: 1%;
  margin-top: -30vh;
`

const Input = styled.input`
  position: relative;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 3%;
  width: 40%;
  float: ${props=> props.float};
`

const LogoutButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 2px;
  padding: 2%;
`


const P = styled.p`
  color: white;
  margin-top: 3vh;
  position: relative;
`

const P_Form = styled.p`
  color: white;
  line-height: 1px;
`

const TimeForm = styled.form`
  text-align: center;
  float: left;
  width: 90%;
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

  componentDidUpdate(){
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

    db.collection("users").doc(this.props.user.email)
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
      var db = firebase.firestore();

      var newHour = parseInt(this.state.relaxationHour);
      var newMin = parseInt(this.state.relaxationMin);
      newMin = newMin < 10? '0' + newMin : '' + newMin;
    }

    db.collection("users").doc(this.props.user.email)
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

  submitWakeupTime(e){
    e.preventDefault();
    if (this.state.wakeupHour != "" && this.state.wakeupMin != ""){
      var db = firebase.firestore();

      // adjust mins
      var newHour = parseInt(this.state.wakeupHour);
      var newMin = parseInt(this.state.wakeupMin);
      newMin = newMin < 10? '0' + newMin : '' + newMin;


      db.collection("users").doc(this.props.user.email)
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
      db.collection("users").doc(this.props.user.email)
      .update({
        wakeupClockMode: "PM"
      }).then(result=>{
          this.props.calculateTimePassedWidth();
      });
    }
    else if (this.props.wakeupClockMode == "PM"){
      db.collection("users").doc(this.props.user.email)
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
      db.collection("users").doc(this.props.user.email)
      .update({
        relaxationClockMode: "PM"
      });
    }
    else if (this.props.relaxationClockMode == "PM"){
      db.collection("users").doc(this.props.user.email)
      .update({
        relaxationClockMode: "AM"
      });
    }
  }

  toggleSleepClockMode(){
    var db = firebase.firestore();
    if (this.props.sleepClockMode == "AM"){
      db.collection("users").doc(this.props.user.email)
      .update({
        sleepClockMode: "PM"
      });
    }
    else if (this.props.sleepClockMode == "PM"){
      db.collection("users").doc(this.props.user.email)
      .update({
        sleepClockMode: "AM"
      });
    }
  }

  render(){
    return(
      <Container>
        {/* switch between the different popups */}
        {
          {
            'clock':
              <div style={{marginTop: '-4vh', display: 'block'}}>

                <div style={{marginTop: '4vh'}}>
                  <TimeForm onSubmit={this.submitWakeupTime.bind(this)}>
                      <P_Form>Set Wake-up Time</P_Form>
                      <Input id='wakeupHour' value={this.state.wakeupHour} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                      <Input id='wakeupMin' value={this.state.wakeupMin} onChange={this.handleWakeupChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                      <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                    <ClockModeBtn onClick={this.toggleWakeupClockMode.bind(this)}>{this.state.wakeupClockMode}</ClockModeBtn>
                  </div>
                </div>
                <br/><br/><br/>

                <div style={{marginTop: '2vh'}}>
                  <TimeForm onSubmit={this.submitRelaxationTime.bind(this)}>
                    <P_Form>Set Relaxation Time</P_Form>
                    <Input id='relaxationHour' value={this.state.relaxationHour} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour'/>
                    <Input id='relaxationMin' value={this.state.relaxationMin} onChange={this.handleRelaxationChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute'/>
                    <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                    <ClockModeBtn onClick={this.toggleRelaxationClockMode.bind(this)}>{this.state.relaxationClockMode}</ClockModeBtn>
                  </div>
                </div>
                <br/><br/><br/>

                <div style={{marginTop: '2vh'}}>
                  <TimeForm onSubmit={this.submitSleepTime.bind(this)}>
                      <P_Form>Set Sleep Time</P_Form>
                      <Input id='sleepHour' value={this.state.sleepHour} onChange={this.handleSleepChange.bind(this)} type='number' type='number' pattern="\d+" min="1" max='12' step="1" float='left' placeholder='Hour' required/>
                      <Input id='sleepMin' value={this.state.sleepMin} onChange={this.handleSleepChange.bind(this)} type='number' type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute' required/>
                      <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                    <ClockModeBtn onClick={this.toggleSleepClockMode.bind(this)}>{this.state.sleepClockMode}</ClockModeBtn>
                  </div>
                </div>

              </div>,
            'moreOptions':
              <P>Coming soon! </P>,
            'settings':
              <P><LogoutButton onClick={this.logout.bind(this)}>Log out</LogoutButton></P>,
          }[this.state.popupOption]
        }
      </Container>
    );
  }
}

export default FooterPopup;
