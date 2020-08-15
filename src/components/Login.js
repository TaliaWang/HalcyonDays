/*global chrome*/
import React, { Component } from 'react';
import {PuffLoader} from "react-spinners";
import spinnerCSS from "../additionalCSS/spinnerCSS.css"
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import arrow from '../images/arrow.png'
import loginImg from "../images/login.png";

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
  font-family: openSansRegular;
  padding: 2%;
  font-size: 120%;

  &:hover{
    color: #95ABFB;
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
`

const ForgotPasswordBtn = styled.button`
  border: none;
  background-color: white;
  margin: 0;
  font-size: 120%;
  width: 100%;

  &:hover{
    color: #95ABFB;
  }
`

const FormContainer = styled.div`
  text-align: center;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  border: none;
  border-radius: 10px;
  margin-top: 15%;
  margin-left: 30%;
  margin-right: 30%;


  @media (max-width: 1000px) {
    margin-top: 30%;
    margin-left: 20%;
    margin-right: 20%;
  }

  @media (max-width: 600px) {
    margin-top: 50%;
    margin-left: 10%;
    margin-right: 10%;
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
  border: none;
  border-radius: 3px;
  display: block;
  font-family: openSansRegular;
  font-size: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  outline: none;
  position: relative;
  width: 75%;
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
`

const IntroContainer = styled.div`
  text-align: left;
  display: block;
  background-image: linear-gradient(#FF68B8, #FFAA90);
  position: absolute;
  height: 100vh;
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

const P = styled.p`
  margin: '2% 0 0 0';
  font-size: 120%;
  font-family: openSansRegular;
  color : ${props =>props.color};
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
            <div style={{float: 'left', margin: '50vh 0% 0 10%', transform: 'translate(0, -50%)', width: '40%'}}>
              <IntroText>Welcome to</IntroText>
              <Title>HalcyonDays!</Title>
              <IntroText>A new way to visualize your day inspired by Parkinson's Law</IntroText>
              <LoginBtn id='login' onClick={this.toggleShowIntroPage.bind(this)}>
                Log in
              </LoginBtn>
              <CreateAccountButton id='createAccount' onClick={this.toggleShowIntroPage.bind(this)}>Get started</CreateAccountButton>
            </div>
            <div style={{width: '50px', margin: 'calc(15vh + 8vw) 0% 0 10%'}}>
              <PuffLoader color='white'/>
            </div>
          </IntroContainer>
          :
          /* login/signup */
          <div>
            <FormContainer>
              <form onSubmit={this.handleLogin.bind(this)}>
                {this.state.isLogin ? <P color='white'>Welcome back! Log in below:</P> : <P color='white'>Welcome! Sign up below:</P>}
                <Input value={this.state.email} onChange={this.emailChange.bind(this)} placeholder="email"/>
                <Input value = {this.state.password} onChange={this.passwordChange.bind(this)} placeholder="password"/>
                <div style={{textAlign: 'right', padding: '1%'}}>
                  <Button type="submit"><ArrowImg src={arrow}/></Button>
                </div>
              </form>
            </FormContainer>
            <ChangeLoginSignUpBtn onClick={this.changeLogInSignUp.bind(this)}>
              {this.state.isLogin? 'Create an account' : 'Aready have an account? Log In'}
            </ChangeLoginSignUpBtn>
            <ForgotPasswordBtn onClick={this.props.showPasswordResetScreen.bind(this)}>
              Forgot your password?
            </ForgotPasswordBtn>
          </div>
        }
    </div>
    );
  }
}

export default Login;
