/*global chrome*/
import React, { Component } from 'react';
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
  background-color: transparent;
  border: none;
  font-family: openSansRegular;
  font-size: 120%;
  position: fixed;
  margin-top: 200px;
  transform: translate(-50%, 0);

  &:hover{
    color: #95ABFB;
  }
`

const Button = styled.button`
  margin: 1% 0 0 0;
  padding: none;
  background-color: transparent;
  border: none;
  outline: none;
`

const ForgotPasswordBtn = styled.button`
  border: none;
  background-color: white;
  font-family: openSansRegular;
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

const IntroButton = styled.button`
  background-color: transparent;
  padding: 15px;
  border: none;
  position: fixed;
  transform: translate(-50%, 0);
`

const IntroContainer = styled.div`
  text-align: center;
  display: block;
  margin-top: 15%;

  @media (max-width: 1000px) {
    margin-top: 30%;
  }

  @media (max-width: 600px) {
    margin-top: 40%;
  }
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

        {this.state.showIntroPage
          ?
          /* intro page */
          <IntroContainer>
            {/* redirects to login */}
            <IntroButton className="icon" id='login' onClick={this.toggleShowIntroPage.bind(this)}>
              <Img src={loginImg} backgroundColor='none'/>
            </IntroButton>
            <br/>
            <CreateAccountButton id='createAccount' onClick={this.toggleShowIntroPage.bind(this)}>Create an account</CreateAccountButton>
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
