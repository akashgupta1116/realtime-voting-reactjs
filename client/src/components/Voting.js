import React, { Component } from "react";
import * as Ably from "ably";
import "./voting.css";
import { Link } from "react-router-dom";

class Voting extends Component {
  state = {
    cards: [
      { id: 1, name: "Barcelona", value: "barcelona" },
      { id: 2, name: "Real Madrid", value: "realMadrid" },
      { id: 3, name: "Juventus", value: "juventus" },
    ],
    flipped: null,
  };

  clickHandler = (card) => {
    if (this.state.flipped) {
      return;
    }

    const realTime = new Ably.Realtime({ authUrl: "/publish" });
    realTime.connection.once("connected", () => {
      // create the channel object
      const myVotingChannel = realTime.channels.get("Voting-App");
      myVotingChannel.publish("vote", card.value, (err) => {
        console.log("err", err);
      });
    });

    this.setState({
      flipped: card,
    });
  };

  render() {
    const hasVoted = !!this.state.flipped;
    return (
      <div>
        <h1 className="headerText">Vote for your favourite team</h1>
        <div className="voting-main">
          {this.state.cards.map((card) => {
            return (
              <section key={card.id} className="container">
                <div
                  className={`card ${
                    this.state.flipped === card ? "flipped" : ""
                  } ${hasVoted ? "remove-mouse-pointer" : "pointer"}`}
                  onClick={() => this.clickHandler(card)}
                >
                  <div className="front">{card.name}</div>
                  <div className="back">Thanks for voting </div>
                </div>
              </section>
            );
          })}
        </div>
        <Link to="/dashboard" target="blank" className="show-stats-btn">
          Show Dashboard
        </Link>
      </div>
    );
  }
}

export default Voting;
