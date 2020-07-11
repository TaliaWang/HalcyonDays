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
      popupOption: this.props.popupOption
    }
  }

  componentDidUpdate(){
    if (this.state.popupOption != this.props.popupOption){
      this.setState({
        popupOption: this.props.popupOption,
        wakeupHour: "",
        wakeupMin: "",
      })
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  handleWakeupTimeChange(e){
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

  submitWakeupTime(e){
    e.preventDefault();
    if (this.state.wakeupHour != "" && this.state.wakeupClockMode != ""){
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
      });
    }
  }

  toggleWakeupClockMode(){
    var db = firebase.firestore();
    if (this.props.wakeupClockMode == "AM"){
      db.collection("users").doc(this.props.user.email)
      .update({
        wakeupClockMode: "PM"
      });
    }
    else if (this.props.wakeupClockMode == "PM"){
      db.collection("users").doc(this.props.user.email)
      .update({
        wakeupClockMode: "AM"
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
                      <Input id='wakeupHour' value={this.state.wakeupHour} onChange={this.handleWakeupTimeChange.bind(this)} type='number' pattern="\d+" min="0" max='12' step="1" float='left' placeholder='Hour'/>
                      <Input id='wakeupMin' value={this.state.wakeupMin} onChange={this.handleWakeupTimeChange.bind(this)} type='number' pattern="\d+" min="0" max='59' step="1" float='right' placeholder='Minute'/>
                      <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                  <ClockModeBtn onClick={this.toggleWakeupClockMode.bind(this)}>{this.props.wakeupClockMode}</ClockModeBtn>
                  </div>
                </div>
                <br/><br/><br/>

                <div style={{marginTop: '2vh'}}>
                  <TimeForm>
                    <P_Form>Set Relaxation Time</P_Form>
                    <Input type='number' pattern="\d+" min="0" step="1" float='left' placeholder='Hour'/>
                    <Input type='number' pattern="\d+" min="0" step="1" float='right' placeholder='Minute'/>
                    <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                    <ClockModeBtn >PM</ClockModeBtn>
                  </div>
                </div>
                <br/><br/><br/>

                <div style={{marginTop: '2vh'}}>
                  <TimeForm>
                      <P_Form>Set Sleep Time</P_Form>
                      <Input type='number' pattern="\d+" min="0" step="1" float='left' placeholder='Hour'/>
                      <Input type='number' pattern="\d+" min="0" step="1" float='right' placeholder='Minute'/>
                      <button type='submit' style={{display: 'none'}}/>
                  </TimeForm>
                  <div style={{float: 'right', padding: '0.5%'}}>
                    <ClockModeBtn >PM</ClockModeBtn>
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
