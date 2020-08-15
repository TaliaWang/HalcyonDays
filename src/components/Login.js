/*global chrome*/
import React, { Component } from 'react';
import {PuffLoader} from "react-spinners";
import spinnercss from "../additionalCSS/spinner.css"
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import arrow from '../images/arrow.png'
import loginImg from "../images/loginImg.svg";
import emailImg from "../images/emailImg.svg";
import passwordImg from "../images/passwordImg.svg";

const ArrowImg = styled.img`
  height: 30px;
  width: 30px;
  background-color: transparent;
  position: relative;

  @media (max-width: 600px) {
    height: 20px;
    width: 20px;
  }
`

const Button = styled.button`
  margin: 1% 0 0 0;
  padding: none;
  background-color: transparent;
  border: none;
  outline: none;
`

const ChangeLoginSignUpBtn = styled.button`
  border: none;
  background-color: white;
  padding: 2%;
  font-size: calc(0.8vh + 0.6vw);

  &:hover{
    color: #FF68B8;
  }
`

const CreateAccountButton = styled.button`
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  color: #95ABFB;
  padding: 10px;
  font-size: calc(1vh + 0.75vw);
  box-shadow: -1px 2px 5px 0px #FF68B8;
  z-index: 100;

  &:hover{
    color: #FF68B8;
  }
`

const ColourSideContainer = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-image: linear-gradient(#FF68B8, #FFAA90);
`

const ForgotPasswordBtn = styled.button`
  border: none;
  background-color: white;
  margin: 0;
  font-size: calc(0.8vh + 0.6vw);
  font-weight: normal;
  width: 100%;

  &:hover{
    color: #FF68B8;
  }
`

const FormContainer = styled.div`
  text-align: center;
  background-color: white;
  color: black;
  border: none;
  top: 35vh;
  transform: translate(0, -50%);
  position: relative;
  margin-left: 10%;
  margin-right: 10%;

  @media (max-width: 600px) {
    top: 50vh;
    transform: translate(0, -50%);
  }
`

const H1 = styled.h1`
  color: white;
`

const Img = styled.img`
  height: 150px;
  width: 175px;
  background-color: ${props=>props.backgroundColor};

  &:hover{
    height: 155px;
    width: 180px;
  }
`

const Input = styled.input`
  border: transparent;
  color: #B7C6FB;
  display: flex;
  font-size: calc(1vh + 0.75vw);
  margin-top: 3%;
  transform: translate(0, calc(-0.1vw - 0.1vh));
  outline: none;
  position: relative;
  width: calc(100% - 2.5vh - 2.5vw);

  ::placeholder{
    color: #B7C6FB;
  }
`

const InputContainer = styled.div`
  border: 1px solid #B7C6FB;
  width: 80%;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 2vh;
  padding: calc(0.1vw + 0.1vh);
`

const InputImg = styled.img`
  float: left;
  position: relative;
  height: calc(1vh + 0.75vw);
  width: calc(1vh + 1vw);
  margin-right: 0.5vw;
  margin-left: 0.5vw;
  transform: translate(0, calc(0.25vw + 0.25vh));
`

const IntroContainer = styled.div`
  text-align: left;
  display: block;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const IntroText = styled.p`
  color: white;
  font-size: calc(1.5vh + 1.5vw);
  margin-top: 0;
`

const LoginBtn = styled.button`
  background-color: white;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  color: #95ABFB;
  font-size: calc(1vh + 0.75vw);
  margin-right: 10%;
  box-shadow: -1px 2px 5px 0px #FF68B8;

  &:hover{
    color: #FF68B8;
  }
`

const LoginImg = styled.img`
  top: 50%;
  transform: translate(0, -50%);
  position: relative;
  height: 25vh;
  width: 25vw;
`

const LoginSignupContainer=styled.div`
  box-shadow: -1px 2px 5px 0px #B7C6FB;
  position: absolute;
  height: 70vh;
  width: 60vw;
  top: 15vh;
  bottom: 15vh;
  left: 20vw;
  right: 20vw;

  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const P = styled.p`
  margin: '2% 0 0 0';
  font-size: calc(1vh + 0.75vw);
  color : black;
`

const TextSideContainer = styled.div`
  width: 50%;
  float: right;
`

const Title = styled.h1`
  color: white;
  font-size: calc(3vh + 3vw);
  line-height: 75%;
`

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      showIntroPage: true,
      isLogin: true,
      text: "Log In",
      email: "",
      password: ""
    }
  }

  changeLogInSignUp(){
    if (this.state.isLogin){
      this.setState({
        isLogin: false,
        text: "Sign Up",
        email: "",
        password: ""
      })
    }
    else{
      this.setState({
        isLogin: true,
        text: "Log In",
        email: "",
        password: ""
      })
    }
  }

  emailChange(e){
    this.setState({
      email: e.target.value
    });
  }

  handleLogin(e){
    e.preventDefault();
    if (this.state.isLogin){
      // log in
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
    }
    else{
      // sign up
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(result =>{
        firebase.auth().currentUser.sendEmailVerification({
          url: 'https://halcyondays-app.herokuapp.com',
          handleCodeInApp: false
        })
        .catch(function(error){
          alert(error);
        });
      })
      .then(result=>{
        this.setState({
          email: "",
          password: ""
        })
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
    }
  }

  passwordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  toggleShowIntroPage(e){
    if (e.target.id == 'login'){
      this.setState({
        showIntroPage: false
      });
    }
    else if (e.target.id == 'createAccount'){
      this.setState({
        showIntroPage: false,
        isLogin: false,
        text: 'Sign Up'
      })
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center', position: 'relative'}}>

        {this.state.showIntroPage
          ?
          /* intro page */
          <IntroContainer>
            <div style={{float: 'left', margin: '50vh 0% 0 10vw', transform: 'translate(0, -50%)', width: '40%'}}>
              <IntroText>Welcome to</IntroText>
              <Title>HalcyonDays!</Title>
              <IntroText>A new way to visualize your day inspired by Parkinson's Law</IntroText>
              <LoginBtn id='login' onClick={this.toggleShowIntroPage.bind(this)}>
                Log in
              </LoginBtn>
              <CreateAccountButton id='createAccount' onClick={this.toggleShowIntroPage.bind(this)}>Get started</CreateAccountButton>
            </div>
            <PuffLoader color='white'/>
          </IntroContainer>
          :
          /* login/signup */
          <LoginSignupContainer>
            <ColourSideContainer>
              <LoginImg src={loginImg}/>
            </ColourSideContainer>
            <TextSideContainer>
              <FormContainer>
                <form onSubmit={this.handleLogin.bind(this)}>
                  {this.state.isLogin ? <P>Welcome back! Please log in below :)</P> : <P>Welcome! Please sign up below :)</P>}
                  <br/>
                  <InputContainer>
                    <InputImg src={emailImg}/>
                    <Input value={this.state.email} onChange={this.emailChange.bind(this)} placeholder="Email"/>
                  </InputContainer>
                  <InputContainer>
                    <InputImg src={passwordImg}/>
                    <Input value = {this.state.password} onChange={this.passwordChange.bind(this)} placeholder="Password"/>
                  </InputContainer>
                  <div style={{textAlign: 'right', padding: '1%'}}>
                    <button style={{display: 'none'}} type="submit"/>
                  </div>
                </form>
                <br/>
                <ChangeLoginSignUpBtn onClick={this.changeLogInSignUp.bind(this)}>
                  {this.state.isLogin? 'Create an account' : 'Aready have an account?'}
                </ChangeLoginSignUpBtn>
                <ForgotPasswordBtn onClick={this.props.showPasswordResetScreen.bind(this)}>
                  Forgot password
                </ForgotPasswordBtn>
              </FormContainer>
            </TextSideContainer>
          </LoginSignupContainer>
        }
    </div>
    );
  }
}

export default Login;
