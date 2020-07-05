/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';

const ChangeLoginSignUpBtn = styled.button`
  border: none;
  background-color: white;
`

const Button = styled.button`
  margin: 1% 0 0 0;
`
const FormContainer = styled.div`
  text-align: center;
  border: 1px solid black;
  margin-left: 25%;
  margin-right: 25%;
`
const H3 = styled.h3`
`

const Input = styled.input`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
  width: 50%;
`
const P = styled.p`
  margin: 0;
`

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLogin: true,
      text: "Log In",
      email: "",
      password: ""
    }
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

  emailChange(e){
    this.setState({
      email: e.target.value
    });
  }

  passwordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  changeLogInSignUp(){
    if (this.state.isLogin){
      this.setState({
        isLogin: false,
        text: "Sign Up"
      })
    }
    else{
      this.setState({
        isLogin: true,
        text: "Log In"
      })
    }
  }

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <FormContainer>
          <H3>Welcome</H3>
          <form onSubmit={this.handleLogin.bind(this)}>
            <Input value={this.state.email} onChange={this.emailChange.bind(this)} placeholder="email"/>
            <Input value = {this.state.password} onChange={this.passwordChange.bind(this)} placeholder="password"/>
            <Button type="submit">{this.state.text}</Button>
          </form>
          <ChangeLoginSignUpBtn onClick={this.changeLogInSignUp.bind(this)}>
            {this.state.isLogin? <P>Create an account</P> : <P>Already have an account? Log In</P>}
          </ChangeLoginSignUpBtn>
        </FormContainer>
      </div>
    );
  }
}

export default Login;
