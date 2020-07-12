/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import arrow from '../images/arrow.png'
import loginImg from "../images/login.png";

const ArrowImg = styled.img`
  height: 35px;
  width: 35px;
  background-color: ${props=>props.backgroundColor};
  transform: translate(-100%, -100%);
  position: fixed;

  &:hover{
    height: 38px;
    width: 38px;
  }
`

const ChangeLoginSignUpBtn = styled.button`
  border: none;
  background-color: white;
  font-family: openSansRegular;
  padding: 2%;
  font-size: 120%;

  &:hover{
    color: grey;
  }
`

const CreateAccountButton = styled.button`
  background-color: transparent;
  border: none;
  font-family: openSansRegular;
  font-size: 120%;
  margin-top: 10%;

  &:hover{
    color: grey;
  }
`

const Button = styled.button`
  margin: 1% 0 0 0;
  padding: none;
  background-color: black;
  border: none;
  outline: none;
`
const FormContainer = styled.div`
  text-align: center;
  background-color: black;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 15%;
  margin-left: 35%;
  margin-right: 35%;
`

const Img = styled.img`
  height: 150px;
  width: 175px;
  background-color: ${props=>props.backgroundColor};
  position: fixed;
  transform: translate(-50%, 0);

  &:hover{
    height: 155px;
    width: 180px;
  }
`

const Input = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  display: block;
  font-family: openSansRegular;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  outline: none;
  width: 50%;
`

const IntroButton = styled.button`
  background-color: transparent;
  border: none;
`

const P = styled.p`
  margin: '2% 0 0 0';
  font-size: 120%;
  font-family: openSansRegular;
  color : ${props =>props.color};
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
      .catch(function(error) {
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
          url: 'https://covid2-a6d70.firebaseapp.com',
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
    if (e.target.parentElement.id == 'login'){ // clicking image but its parent button links to this function
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
      <div style={{textAlign: 'center'}}>

        {/* intro page */}
        {this.state.showIntroPage
          ?
          <div style={{textAlign: 'center', marginTop: '15%', display: 'block'}}>
            {/* redirects to login */}
            <IntroButton id='login' onClick={this.toggleShowIntroPage.bind(this)}>
              <Img src={loginImg} backgroundColor='none'/>
            </IntroButton>
            <br/><br/><br/><br/>
            <CreateAccountButton id='createAccount' onClick={this.toggleShowIntroPage.bind(this)}>Create an account</CreateAccountButton>
          </div>
          : null
        }

        {this.state.showIntroPage
          ? null
          :
          <div>
            <FormContainer>
              <form onSubmit={this.handleLogin.bind(this)}>
                {this.state.isLogin ? <P color='white'>Welcome back! Log in below:</P> : <P color='white'>Welcome! Sign up below:</P>}
                <Input value={this.state.email} onChange={this.emailChange.bind(this)} placeholder="email"/>
                <Input value = {this.state.password} onChange={this.passwordChange.bind(this)} placeholder="password"/>
                <div style={{textAlign: 'right', padding: '1%'}}>
                  <Button type="submit"><ArrowImg src={arrow} backgroundColor='black'/></Button>
                </div>
              </form>
            </FormContainer>
            <ChangeLoginSignUpBtn onClick={this.changeLogInSignUp.bind(this)}>
              {this.state.isLogin? 'Create an account' : 'Aready have an account? Log In'}
            </ChangeLoginSignUpBtn>
          </div>
        }
      </div>
    );
  }
}

export default Login;