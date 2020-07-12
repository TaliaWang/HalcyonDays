/*global chrome*/
import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/firestore'
import styled from 'styled-components';
import clock from "../images/clock.png";
import moreOptions from "../images/moreOptions.png";
import settings from "../images/settings.png";
import FooterPopup from "./FooterPopup.js"

const Container = styled.div`
  text-align: center;
  position: fixed;
  margin-bottom: 0px;
  bottom: 0;
  width: 100%;
  height: 10vh;
`

const Img = styled.img`

`

const IconButton = styled.button`
  background-color: transparent;
  padding: 0;
  margin: 5px;
  border: none;
`

const IconsContainer = styled.div`
  bottom: 2vh;
  position: fixed;
  left: 50%;
  transform: translate(-52%, 0);
`

class Footer extends Component{
  constructor(props){
    super(props);
    this.state = {
      popupOption: "",
      showPopup: false
    }
  }

  toggleShowPopup(e){
    if (!this.state.showPopup){
      this.setState({
        showPopup: true,
        popupOption: e.target.id
      });
    }
    else if (this.state.popupOption == e.target.id){
      this.setState({
        showPopup: false
      });
    }
    else{
      this.setState({
          popupOption: e.target.id
      });
    }
  }

  render(){
    return(
      <Container>
        {this.state.showPopup
          ?
            <FooterPopup
              setRelaxationTime={this.props.setRelaxationTime.bind(this)}
              user={this.props.user}
              popupOption={this.state.popupOption}
              sleepHour={this.props.sleepHour}
              sleepMin={this.props.sleepMin}
              sleepClockMode={this.props.sleepClockMode}
              relaxationHour={this.props.relaxationHour}
              relaxationMin={this.props.relaxationMin}
              relaxationClockMode={this.props.relaxationClockMode}
              wakeupHour={this.props.wakeupHour}
              wakeupMin={this.props.wakeupMin}
              wakeupClockMode={this.props.wakeupClockMode}
              calculateTimePassedWidth={this.props.calculateTimePassedWidth.bind(this)}
            ></FooterPopup>
          : null
        }
        <IconsContainer>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='clock' src={clock}/></IconButton>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='moreOptions' src={moreOptions}/></IconButton>
          <IconButton onClick={this.toggleShowPopup.bind(this)}><Img id='settings' src={settings}/></IconButton>
        </IconsContainer>
      </Container>
    );
  }
}

export default Footer;