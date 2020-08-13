/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import accountImg from "../images/accountImg.png";
import calendarImg from "../images/calendarImg.png";
import settingsImg from "../images/settingsImg.png";
import moreImg from "../images/moreImg.png";

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
    }
  }

  render(){
    return(
      <div>
        <OptionsContainer>
          <OptionsBtn>
            <img style={{transform: 'translate(0, 10%)'}} src={calendarImg}/>
            &nbsp;&nbsp;My Calendar
          </OptionsBtn>

          <OptionsBtn>
            <img style={{transform: 'translate(0, 20%)'}} height='20px' width = '20px' src={settingsImg}/>
            &nbsp;&nbsp;My Settings
          </OptionsBtn>

          <OptionsBtn>
            <img style={{transform: 'translate(0, 20%)'}} height='20px' width = '20px' src={accountImg}/>
            &nbsp;&nbsp;My Account
          </OptionsBtn>

          <OptionsBtn>
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
