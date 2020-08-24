import React, { Component } from 'react';
import {BeatLoader} from "react-spinners";
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import saveImg from "../images/saveImg.svg";
import newItemImg from "../images/newItemImg.svg";
import lockedImg from "../images/lockedImg.svg";
import unlockedImg from "../images/unlockedImg.svg";
import xImg from "../images/xImg.svg";

const BackBtn = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(180deg) translate(-50%, 25%);
  font-size: calc(1vh + 0.75vw);
`

const ClockMode = styled.p`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  position: relative;
  font-size: calc(0.8vh + 0.6vw);
  padding: calc(0.6vh + 0.45vw);
`

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  right: 1vw;
`

const CloseImg = styled.img`
  height: calc(0.8vh + 0.6vw);
  width: calc(0.8vh + 0.6vw);
  position: relative;
`

const Container = styled.div`
  position: fixed;
  text-align: left;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  width: 30%;
  height: calc(15vh + 11.25vw);
  overflow-y: hidden;
  bottom: 0;
  z-index: 100;

  @media (max-width: 800px) {
    width: 40%;
    bottom: calc(15vh + 11.25vw);
  }
`

const EventInput = styled.input`
  font-size: calc(0.8vh + 0.6vw);
  padding: calc(0.6vh + 0.45vw);
  border-radius: calc(0.2vh + 0.15vw);
  background-color: transparent;
  border: 1px solid white;
  color: white;
  position: relative;
  width: 100%;
  margin-top: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }

  ::placeholder{
    color: white;
  }
`

const DateInput = styled.input`
  font-family: Futura,Trebuchet MS,Arial,sans-serif;
  font-size: calc(0.8vh + 0.6vw);
  padding: calc(0.6vh + 0.45vw);
  border-radius: calc(0.2vh + 0.15vw);
  background-color: transparent;
  border: 1px solid white;
  color: white;
  position: relative;
  width: 100%;

  &:focus{
    outline: none;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`

const Form = styled.form`
  position: absolute;
  top: calc(3vh + 2.25vw);
  width: 80%;
  left: 5%;
  text-align: center;
`

const NewCountdownImg = styled.img`
  border: none;
  outline: none;
  background-color: transparent;
  height: calc(2vh + 1.5vw);
  width: calc(2vh + 1.5vw);
  position: relative;
`

const NewCountdownBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  bottom: calc(-0.2vh - 0.15vw);
  right: 0;
`

const P = styled.p`
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  position: absolute;
  margin-left: 44.3%;
  transform: translate(0, 40%);
`

const P_list = styled.p`
  color: white;
  font-size: calc(0.8vh + 0.6vw);
  font-weight: bold;
  position: relative;
`

const P_time = styled.p`
  color: white;
  font-size: calc(0.6vh + 0.45vw);
  margin-top: calc(-0.6vh - 0.45vw);
`

const SaveBtn = styled.button`
  border: none;
  outline: none;
  color: white;
  background-color: transparent;
  bottom: calc(-2.4vh - 1.8vw);
  right: -3.5vw;
  position: absolute;
`

const SaveImg = styled.img`
  outline: none;
  background-color: transparent;
  position: relative;
  height: calc(1vh + 0.75vw);
  width: calc(1vh + 0.75vw);
`

const TextContainer = styled.div`
  position: relative;
  color: white;
  border: 1px solid black;
  top: calc(2vh + 1.5vw);
  margin-left: 5%;
  margin-right: calc(2.5vh + 1.875vw);
  height: calc(12vh + 9vw);
  overflow-y: auto;
`

const TimeInput = styled.input`
  font-size: calc(0.8vh + 0.6vw);
  padding: calc(0.6vh + 0.45vw);
  border-radius: calc(0.2vh + 0.15vw);
  background-color: transparent;
  border: 1px solid white;
  color: white;
  float: ${props=>props.float};
  position: relative;
  width: 35%;
  margin-top: calc(0.8vh + 0.6vw);

  &:focus{
    outline: none;
  }

  ::placeholder{
    color: white;
  }
`

const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: calc(1vh + 0.75vw);
  padding-top: calc(0.4vh + 0.1vw);
  padding-bottom: calc(0.4vh + 0.1vw);
  width: 20vw;
  margin-left: 5%;
  margin-right: 5%;

  @media (max-width: 800px) {
    width: 25vw;
  }
`

const Ul = styled.ul`
  position: relative;
  color: white;
  border: none;
  top: calc(1vh + 0.75vw);
  margin-left: 0;
  margin-right: calc(2.5vh + 1.875vw);
  height: calc(12vh + 9vw);
  overflow-y: auto;
`

const XBtn = styled.button`
  background: none;
  border: none;
  font-size: calc(0.8vh + 0.6vw);
  color: white;
  display: none;
`

class Countdowns extends Component{
  constructor(props){
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    this.state = {
      showCountdownsList: true,
      countdowns: this.props.countdowns,
      date: "",
      event: "",
      hour: "",
      min: "",
      clockMode: "PM"
    }
  }

  deleteCountdown(e){
    // parse the countdown name
    var countdown = e.target.parentElement.getElementsByClassName('countdownText')[0].textContent;

    var confirmDelete = window.confirm(`Are you sure you want to delete "${countdown}?"`);

    if (confirmDelete){
      var db = firebase.firestore();

      db.collection("users").doc(this.props.user.uid)
      .collection('countdowns').doc(countdown).delete();
    }
  }

  displayBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='inline-block';
  }

  hideBtns(e){
    var button = e.target.parentElement.getElementsByClassName('XBtn')[0] || e.target.parentElement.parentElement.getElementsByClassName('XBtn')[0];
    button.style.display='none';
  }

  getCountdownDate(countdownTimestamp){
    var countdownDate = countdownTimestamp.toDate();
    var day = this.days[countdownDate.getDay()];
    var month = this.months[countdownDate.getMonth()];
    var date = countdownDate.getDate();
    var year = countdownDate.getFullYear();

    var hour = countdownDate.getHours();
    var clockMode = (hour < 12 ? "AM" : "PM");
    hour = hour % 12;
    if (hour == 0){
      hour = 12;
    }

    var min = countdownDate.getMinutes();
    min = (min < 10 ? "0" + min : min);

    return (`${day}, ${month} ${date}, ${year} at ${hour}:${min} ${clockMode}`);

  }

  getCountdownTime(minsLeft){
    var daysLeft = Math.floor(minsLeft / (60*24));
    minsLeft = minsLeft - daysLeft*60*24;

    var hoursLeft = Math.floor(minsLeft / 60);
    minsLeft = minsLeft - hoursLeft * 60;

    var minutesLeft = Math.floor(minsLeft);

    if (daysLeft == 0){
      if (hoursLeft == 0){
        return (`${minutesLeft} minute(s)`);
      }
      else{
        return (`${hoursLeft} hour(s), ${minutesLeft} minute(s)`);
      }
    }
    else{
      return (`${daysLeft} day(s), ${hoursLeft} hour(s), ${minutesLeft} minute(s)`);
    }
  }

  handleDateChange(e){
    this.setState({
      date: e.target.value
    });
  }

  handleEventChange(e){
    this.setState({
      event: e.target.value
    });
  }

  handleHourChange(e){
    this.setState({
      hour: e.target.value
    });
  }

  handleMinChange(e){
    var tempMin = e.target.value;
    tempMin = (parseInt(tempMin) < 10 ? "0" + tempMin : tempMin);
    this.setState({
      min: e.target.value
    });
  }

  hideCountdownsList(){
    this.setState({
      showCountdownsList: false
    });
  }

  showCountdownsList(){
    this.setState({
      showCountdownsList: true
    });
  }

  submitCountdown(e){
    e.preventDefault();
    var adjustedMin;
    if (parseInt(this.state.min) < 10){
      adjustedMin = "0" + this.state.min;
    }
    else{
      adjustedMin = this.state.min;
    }

    var dateObj = new Date(Date.parse(`${this.state.date} ${this.state.hour}:${adjustedMin}:00 ${this.state.clockMode}`));

    var db = firebase.firestore();
    var countdownRef = db.collection("users").doc(this.props.user.uid)
    .collection("countdowns").doc(this.state.event);

    countdownRef.set({
      timestamp: firebase.firestore.Timestamp.fromDate(dateObj),
      name: this.state.event,
      hour: parseInt(this.state.hour),
      min: this.state.min,
      clockMode: this.state.clockMode
    }).then(()=>{
      this.setState({
        date: "",
        event: "",
        hour: "",
        min: "",
        showCountdownsList: true
      });
    });
  }

  toggleClockMode(e){
    e.preventDefault();
    if (this.state.clockMode == "AM"){
      this.setState({
        clockMode: "PM"
      });
    }
    else if (this.state.clockMode == "PM"){
      this.setState({
        clockMode: "AM"
      });
    }
  }

  render(){
    return(
      <Container>
        <div style={{position: 'absolute', width: '100%', zIndex: '30'}}>
          <Title>{this.state.showCountdownsList ? "My Countdowns" : "New Countdown"}</Title>
          <CloseBtn><CloseImg src={xImg} onClick={this.props.hideCountdowns}/></CloseBtn>
        </div>
        {!this.props.countdownsLoaded
          ?
          <div style={{textAlign: 'center', marginTop: 'calc(3vh + 2.25vw)'}}>
            <BeatLoader color='white' size='10'/>
          </div>
          :
          (this.state.showCountdownsList
            ?
            <div>
              <Ul>
                {this.props.countdowns.map((countdown, index) =>
                  <li className="countdown" id={`${countdown}${index}_label`} style={{marginBottom: 'calc(-0.6vh - 0.45vw)'}} onMouseOver={this.displayBtns.bind(this)} onMouseLeave={this.hideBtns.bind(this)}>
                      <div style={{display: 'flex'}}>
                        <P_list className="countdownText">{countdown.name}</P_list>
                        <XBtn className="XBtn" onClick={this.deleteCountdown.bind(this)}>✖</XBtn>
                      </div>
                      <P_time>{countdown.minsLeft < 0 ? "Already passed" : this.getCountdownTime(countdown.minsLeft)}</P_time>
                      <P_time>{this.getCountdownDate(countdown.timestamp)}</P_time>
                  </li>
                )}
              </Ul>
              <NewCountdownBtn onClick={this.hideCountdownsList.bind(this)}><NewCountdownImg src={newItemImg}/></NewCountdownBtn>
            </div>
            : <div>
                <Form onSubmit={this.submitCountdown.bind(this)}>
                  <DateInput value={this.state.date} onChange={this.handleDateChange.bind(this)} className='countdownInput_date' type='date' required/>
                  <EventInput value={this.state.event} onChange={this.handleEventChange.bind(this)} placeholder='Event name' required/>
                  <div style={{width: '90%', textAlign: 'left', float: 'left'}}>
                    <TimeInput value={this.state.hour} onChange={this.handleHourChange.bind(this)} placeholder='hour' type='number' pattern="\d+" min="1" max='12' step="1" float='left' required/>
                    <TimeInput value={this.state.min} onChange={this.handleMinChange.bind(this)} placeholder='minute' type='number' pattern="\d+" min="0" max='59' step="1" float='right' required/>
                  </div>
                  <P>:</P>
                  <div style={{float: 'right', width: '10%', textAlign: 'right'}}>
                    <ClockMode onClick={this.toggleClockMode.bind(this)}>{this.state.clockMode}</ClockMode>
                  </div>
                  <SaveBtn type='submit'><SaveImg src={saveImg}/></SaveBtn>
                </Form>
                <BackBtn onClick={this.showCountdownsList.bind(this)}>➤</BackBtn>
              </div>
          )
        }
      </Container>
    );
  }
}

export default Countdowns;
