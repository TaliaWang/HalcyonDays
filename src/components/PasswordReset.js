/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import arrow from '../images/arrow.png'

const ArrowImg = styled.img`
  transform: translate(25%, 25%);
  height: 20px;
  width: 20px;
  margin: 0;
`

const Button = styled.button`
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 2%;
`

const Container = styled.div`
  text-align: center;
  margin: 15% 35% 0 40%;
  width: 30%;

  @media (max-width: 800px) {
    margin: 30% 35% 0 38%;
    width: 35%;
  }
  @media (max-width: 600px) {
    margin: 40% 15% 0 30%;
    width: 50%;
  }
  @media (max-width: 400px) {
    margin: 40% 15% 0 20%;
    width: 65%;
  }
`

const EmailInput = styled.input`
  background-color: white;
  border: 1px solid black;
  border-radius: 1px;
  padding: 5px;
  width: 80%;

  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 1000px) {
    width: 80%;
  }
  @media (max-width: 800px) {
    width: 75%;
  }
`

const Form = styled.form`
  border-radius: 5px;
  padding: 10px;
  background-color: black;
  width: 70%;
  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 1000px) {
    width: 95%;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`

const H1 = styled.h1`
`

const P = styled.p`
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
      <Container>
        <div style={{textAlign: 'left'}}>
          {this.state.showEmailInput
            ?
            <div>
              <H1>Password Reset</H1>
              <P>No worries, it happens to the best of us!</P>
              <Form onSubmit={this.sendPasswordResetEmail.bind(this)}>
                <EmailInput value={this.state.email} onChange={this.handleEmailChange.bind(this)} placeholder="Enter your email"></EmailInput>
                <SendBtn type='submit'><ArrowImg src={arrow}/></SendBtn>
              </Form>
              <br/>
              <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
            </div>
            :
            <div>
              <H1>Almost done!</H1>
              <P>Please check your email to reset your password.</P>
              <Button onClick={this.resendPasswordResetEmail.bind(this)}>Resend password reset email</Button>
              <br/>
              <Button onClick={this.backToLogin.bind(this)}>Go back to login</Button>
            </div>
          }
        </div>
      </Container>
    );
  }
}

export default PasswordReset;
