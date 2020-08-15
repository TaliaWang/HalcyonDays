/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components';
import emailVerificationImg from "../images/emailVerificationImg.svg";

const Button = styled.button`
  color: #95ABFB;
  background-color: transparent;
  border: 1px solid #95ABFB;
  border-radius: 5px;
  padding: calc(0.5vw + 0.5vh);
  margin-top: 2vh;
  font-size: calc(1vh + 0.75vw);
  margin-left: 3vw;
  margin-right: 3vw;
  text-align: left;

  &:hover{
    border: 1px solid #FF68B8;
    color: #FF68B8;
  }
`

const Container = styled.div`
  text-align: left;
  background-color: white;
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  border: 1px solid white;
  height: 50vh;
  top: 25vh;
  bottom: 25vh;
  width: 50vw;
  left: 25vw;
  right: 25vw;
  position: relative;
  z-index: 10;
`

const EmailVerificationImgTop = styled.img`
  border: none;
  background-color: transparent;
  top: 27vh;
  left: 26vw;
  transform: translate(-50%, -50%);
  height: calc(17vw + 17vh);
  width: calc(17vw + 17vh);
  position: absolute;
  z-index: 5;
`

const EmailVerificationImgBottom = styled.img`
  border: none;
  background-color: transparent;
  top: 73vh;
  left: 74vw;
  transform: translate(-50%, -50%) rotate(180deg);
  height: calc(17vw + 17vh);
  width: calc(17vw + 17vh);
  position: absolute;
  z-index: 5;
`

const H1 = styled.h1`
  font-weight: normal;
  font-size: calc(2vw + 2vh);
  margin-left: 3vw;
  margin-bottom: 2vh;
  position: relative;
`

const P = styled.p`
  font-size: calc(1vh + 0.75vw);
  margin-left: 3vw;
  margin-right: 3vw;
  margin-bottom: 0;
`


class EmailVerification extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  backToLogin(){
    firebase.auth().signOut();
  }

  resendEmail(){
    this.props.user.sendEmailVerification({
      url: 'https://halcyondays-app.herokuapp.com',
      handleCodeInApp: false
    })
    .then(function(){
      alert("Verification email sent!");
    })
    .catch(function(error){
      if (error == "Error: We have blocked all requests from this device due to unusual activity. Try again later."){
        alert("Oops! For security reasons, please wait a minute or two before resending the verification email.")
      }
    });
  }

  render(){
    return(
      <div>
        <EmailVerificationImgTop src={emailVerificationImg}/>
        <Container>
          <div style={{position: 'relative', marginTop: '25vh', transform: 'translate(0, -50%)'}}>
            <H1>Almost done!</H1>
            <P>Please check your email to verify your account.</P>
            <Button onClick={this.resendEmail.bind(this)}>Resend verification email</Button>
            <br/>
            <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
          </div>
        </Container>
        <EmailVerificationImgBottom src={emailVerificationImg}/>
      </div>
    );
  }
}

export default EmailVerification;
