/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import arrow from '../images/arrow.png'
import passwordresetImg from "../images/passwordResetImg.svg";
import emailImg from "../images/emailImg.svg";
import passwordResetImg from "../images/passwordResetImg.svg";

const ArrowImg = styled.img`
  transform: translate(25%, 25%);
  height: 20px;
  width: 20px;
  margin: 0;
`

const Button = styled.button`
  color: #95ABFB;
  background-color: transparent;
  border: 1px solid #95ABFB;
  border-radius: 5px;
  padding: calc(0.5vw + 0.5vh);
  font-size: calc(1vh + 0.75vw);
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 1vh;
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

const InputImg = styled.img`
  float: left;
  position: absolute;
  height: calc(1vh + 0.75vw);
  width: calc(1vh + 1vw);
  margin-left: 0.5vw;
  margin-bottom: calc(0.25vw + 0.25vh);
  margin-top: calc(0.25vw + 0.25vh);
`

const Input = styled.input`
  border: none;
  color: #B7C6FB;
  display: flex;
  font-size: calc(1vh + 0.75vw);
  margin-top: 3%;
  margin-left: calc(1.5vh + 1.5vw);
  margin-bottom: calc(0.25vw + 0.25vh);
  margin-top: calc(0.25vw + 0.25vh);
  height: 100%;
  width: 80%;
  outline: none;
  position: relative;

  ::placeholder{
    color: #B7C6FB;
  }
`

const InputContainer = styled.div`
  border: 1px solid #B7C6FB;
  text-align: left;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 2vh;
`

const Form = styled.form`
  background-color: transparent;
  margin-left: 0;
  margin-right: 3vw;
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
  margin-bottom: 1vh;
`

const PasswordResetImgTop = styled.img`
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

const PasswordResetImgBottom = styled.img`
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

const SendBtn = styled.button`
  border: none;
  background: none;
`

class PasswordReset extends Component{
  constructor(props){
    super(props);
    this.state = {
      showEmailInput: true,
      email: ""
    }
  }

  backToLogin(){
      this.props.hidePasswordResetScreen();
  }

  handleEmailChange(e){
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  sendPasswordResetEmail(e){
    e.preventDefault();
    var auth = firebase.auth();
    var email = this.state.email;

    auth.sendPasswordResetEmail(email).then(()=>{
      this.setState({
        showEmailInput: false
      });
    }).catch(error=>{
      alert(error);
    });
  }

  resendPasswordResetEmail(e){
    e.preventDefault();
    var auth = firebase.auth();
    var email = this.state.email;

    auth.sendPasswordResetEmail(email).then(()=>{
      alert("Another password reset email was sent!")
    }).catch(error=>{
      alert(error);
    });
  }

  render(){
    return(
      <div>
        <PasswordResetImgTop src={passwordResetImg}/>
        <Container>
          {this.state.showEmailInput
            ?
            <div style={{textAlign: 'left', position: 'relative', marginTop: '25vh', transform: 'translate(0, -50%)'}}>
              <H1>Password Reset</H1>
              <P>No worries, it happens to the best of us!</P>
              <Form onSubmit={this.sendPasswordResetEmail.bind(this)}>
                <InputContainer>
                  <InputImg src={emailImg}/>
                  <Input value={this.state.email} onChange={this.handleEmailChange.bind(this)} placeholder="Email"></Input>
                </InputContainer>
                <button type='submit' style={{display: 'none'}}></button>
              </Form>
              <br/>
              <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
            </div>
            :
            <div style={{textAlign: 'left', position: 'relative', marginTop: '25vh', transform: 'translate(0, -50%)'}}>
              <H1>Almost done!</H1>
              <P>Please check your email to reset your password.</P>
              <Button onClick={this.resendPasswordResetEmail.bind(this)}>Resend password reset email</Button>
              <br/>
              <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
            </div>
          }
        </Container>
        <PasswordResetImgBottom src={passwordResetImg}/>
      </div>
    );
  }
}

export default PasswordReset;
