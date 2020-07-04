/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components'

const H3 = styled.h3`
`

const LogoutBtn = styled.button`
`

const P = styled.p`
`

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  logout(){
    firebase.auth().signOut();
  }

  render(){
    return(
      <div>
        <H3>Dashboard</H3>
        {this.props.user ? <P>{this.props.user.email}</P> : null}
        <LogoutBtn onClick={this.logout.bind(this)}>Log Out</LogoutBtn>
      </div>
    );
  }
}

export default Dashboard;
