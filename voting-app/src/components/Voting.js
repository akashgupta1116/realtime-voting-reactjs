import React, { Component } from "react";
import * as Ably from "ably";
import "./voting.css";
import { Link } from 'react-router-dom'

class Voting extends Component {
  state = {
    cards:[
      {name:'Barcelona',value:'barcelona'},
      {name:'Real Madrid',value:'realMadrid'},
      {name:'Juventus',value:'juventus'}
    ],
    flipped_barcelona: false,
    flipped_realMadrid: false,
    flipped_juventus: false,
    removeListener: false
  };
  clickHandler = (event, value) => {
    if (this.state.removeListener) {
      return;
    }
    // switch (value) {
      this.setState({
        [`flipped_${value}`]: true
      });
      // case "barcelona":
      //   this.setState({
      //     flipped_barcelona: true
      //   });
      //   break;
      // case "realMadrid":
      //   this.setState({
      //     flipped_realMadrid: true
      //   });
      //   break;
      // case "juventus":
      //   this.setState({
      //     flipped_juventus: true
      //   });
      //   break;
      // default:
      //   this.setState({
      //     flipped_barcelona: false,
      //     flipped_realMadrid: false,
      //     flipped_juventus: false
      //   });
    // }
    const realTime = new Ably.Realtime({ authUrl: '/publish' });
    realTime.connection.once('connected', () => {
      // create the channel object
        const myVotingChannel = realTime.channels.get('Voting-App');
        myVotingChannel.publish("vote", value, (err) => {
          console.log('err',err);
        });
      });
   
    this.setState({
      removeListener: true
    });
  };
  render() {
    return (
      <div>
          <div className="voting-main">
            {this.state.cards.map((card,index)=>{
              return <section key={card.name+index} className="container">
                        <div
                          className={`card ${this.state[`flipped_${card.value}`] ? "flipped" : ""} ${
                            this.state.removeListener ? "remove-mouse-pointer" : "pointer"
                          }`}
                          onClick={(e) => this.clickHandler(e, card.value)}
                        >
                          <div className="front">{card.name}</div>
                          <div className="back">Thanks for voting </div>
                        </div>
                      </section>
            })}            
          </div>
          <Link to="/chart" target="blank" className="show-stats-btn">Show Stats</Link>
      </div>
    );
  }
}

export default Voting;
