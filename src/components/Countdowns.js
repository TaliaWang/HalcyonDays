import React, { Component } from 'react';
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
  z-index: 50;

  @media (max-width: 800px) {
    width: 40%;
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

class Countdowns extends Component{
  constructor(props){
    super(props);
    this.state = {
      showCountdownsList: true,
      dateInput: "",
      eventInput: "",
      hourInput: "",
      minInput: "",
      clockMode: "PM"
    }
  }

  handleDateChange(e){
    this.setState({
      dateInput: e.target.value
    });
  }

  handleEventChange(e){
    this.setState({
      eventInput: e.target.value
    });
  }

  handleHourChange(e){
    this.setState({
      hourInput: e.target.value
    });
  }

  handleMinChange(e){
    var tempMin = e.target.value;
    tempMin = (parseInt(tempMin) < 10 ? "0" + tempMin : tempMin);
    this.setState({
      minInput: e.target.value
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
    if (this.state.minInput < 10){
      var tempMin = "0" + this.state.minInput;
      this.setState({
        minInput: tempMin
      }, ()=>{
            alert(this.state.dateInput + " " + this.state.eventInput + " " + this.state.hourInput + " " + this.state.minInput + " " + this.state.clockMode);
      });
    }
    else{
          alert(this.state.dateInput + " " + this.state.eventInput + " " + this.state.hourInput + " " + this.state.minInput + " " + this.state.clockMode);
    }
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
        {this.state.showCountdownsList
          ?
          <div>
            <TextContainer>
              <P>Coming soon!</P>
            </TextContainer>
            <NewCountdownBtn onClick={this.hideCountdownsList.bind(this)}><NewCountdownImg src={newItemImg}/></NewCountdownBtn>
          </div>
          : <div>
              <Form onSubmit={this.submitCountdown.bind(this)}>
                <DateInput value={this.state.dateInput} onChange={this.handleDateChange.bind(this)} className='countdownInput_date' type='date' required/>
                <EventInput onChange={this.handleEventChange.bind(this)} placeholder='Event name' required/>
                <div style={{width: '90%', textAlign: 'left', float: 'left'}}>
                  <TimeInput onChange={this.handleHourChange.bind(this)} placeholder='hour' type='number' pattern="\d+" min="1" max='12' step="1" float='left' required/>
                  <TimeInput onChange={this.handleMinChange.bind(this)} placeholder='minute' type='number' pattern="\d+" min="0" max='59' step="1" float='right' required/>
                </div>
                <P>:</P>
                <div style={{float: 'right', width: '10%', textAlign: 'right'}}>
                  <ClockMode onClick={this.toggleClockMode.bind(this)}>{this.state.clockMode}</ClockMode>
                </div>
                <SaveBtn type='submit'><SaveImg src={saveImg}/></SaveBtn>
              </Form>
              <BackBtn onClick={this.showCountdownsList.bind(this)}>➤</BackBtn>
            </div>
        }
      </Container>
    );
  }
}

export default Countdowns;
