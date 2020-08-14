/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import feedbackImg from "../images/feedbackImg.svg";
import aboutUsImg from "../images/aboutUsImg.svg";
import helpImg from "../images/helpImg.svg"

const Container = styled.div`
  background-color: transparent;
  color: white;
  margin-top: 80px;
  margin-left: 100px;
  text-align: left;
  padding-left: 0;
`

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 100%;
`


const P = styled.p`
  color: white;
  margin-left: 5%;
  margin-right: 5%;
`

class MoreOptions extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Container>
        <Button><img src={helpImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Help</Button>
        <br/><br/>
        <Button><img src={aboutUsImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;About Us</Button>
        <br/><br/>
        <Button><img src={feedbackImg} width='20px' height='20px' style={{transform: 'translate(0, 10%)'}}/>&nbsp;&nbsp;Give us feedback</Button>
      </Container>
    );
  }
}

export default MoreOptions;
