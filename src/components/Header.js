/*global chrome*/
import React, { Component } from 'react';
import Draggable from "react-draggable";
import firebase from '../firebase';
import 'firebase/firestore'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../additionalCSS/calendar.css';
import styled from 'styled-components';
import accountImg from "../images/accountImg.png";
import calendarImg from "../images/calendarImg.png";
import settingsImg from "../images/settingsImg.png";
import moreImg from "../images/moreImg.png";

const CalendarContainer = styled.div`
  opacity: 1;

`

const CloseBtn = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  right: 10px;
  top: 10px;
  position: absolute;
`

const PopupContainer = styled.div`
  height: 310px;
  width: 340px;
  margin-left: calc(50% - 170px);
  margin-top: 10%;
  background-color: rgba(255,104,184, 0.9); /*#FF68B8 but faded*/
  position: absolute;
  border: none;
  border-radius: 10px;
  color: white;
  z-index: 100;
  text-align: center;
`

const PopupLabel = styled.div`
  margin-bottom: 0;
  padding-left: 5%;
  padding-top: 10px;
  float: left;
`

const OptionsContainer = styled.div`
  background-image: linear-gradient(to right, #FF68B8, #FFAA90);
  position: fixed;
  width: 100%;
  height: 45px;
  z-index: 50;
  top: 0;
`

const OptionsBtn = styled.button`
  color: white;
  background-color: transparent;
  font-size: 100%;
  border: none;
  outline: none;
  padding-top: 7px;
  text-align: center;
  width: 25%;

  @media (max-width: 600px) {
    font-size: 80%;
  }
`

const OptionsImg = styled.img`
  transform: translate(0, 10%);
`

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      headerOption: ""
    }
  }

  closePopup(){
    this.setState({
      headerOption: ""
    });
  }

  switchHeaderOption(e){
    this.setState({
      headerOption: e.target.id
    });
  }

  render(){
    return(
      <div>
        {
          {
            '' : null,
            'calendarOption' :
              <Draggable>
                <PopupContainer>
                  <PopupLabel>
                    <img style={{transform: 'translate(0, 10%)'}} src={calendarImg}/>
                    &nbsp;&nbsp;My Calendar
                  </PopupLabel>
                  <CloseBtn onClick={this.closePopup.bind(this)}><img src={moreImg} style={{transform: 'rotate(45deg)'}}/></CloseBtn>
                  <div style={{textAlign: 'center'}}>
                    <CalendarContainer>
                        <Calendar onChange={this.props.changeTodayTmrwFromCalendar}/>
                    </CalendarContainer>
                  </div>
                </PopupContainer>
            </Draggable>,

          }[this.state.headerOption]
        }
        <OptionsContainer>
          <OptionsBtn id='calendarOption' onClick={this.switchHeaderOption.bind(this)}>
            <img style={{transform: 'translate(0, 10%)'}} src={calendarImg}/>
            &nbsp;&nbsp;My Calendar
          </OptionsBtn>

          <OptionsBtn id='settingsOption' onClick={this.switchHeaderOption.bind(this)}>
            <img style={{transform: 'translate(0, 20%)'}} height='20px' width = '20px' src={settingsImg}/>
            &nbsp;&nbsp;My Settings
          </OptionsBtn>

          <OptionsBtn id='accountOption' onClick={this.switchHeaderOption.bind(this)}>
            <img style={{transform: 'translate(0, 20%)'}} height='20px' width = '20px' src={accountImg}/>
            &nbsp;&nbsp;My Account
          </OptionsBtn>

          <OptionsBtn id='moreOption' onClick={this.switchHeaderOption.bind(this)}>
            <img style={{transform: 'translate(0, 20%)'}} height='18px' width = '18px' src={moreImg}/>
            &nbsp;&nbsp;More
          </OptionsBtn>
        </OptionsContainer>
        <div style={{width: '100%', height: '10px', top: '45px', backgroundColor: '#FFACD8', position: 'fixed', zIndex: '50'}}></div>
      </div>
    );
  }
}

export default Header;
