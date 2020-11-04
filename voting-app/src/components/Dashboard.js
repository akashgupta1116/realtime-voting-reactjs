import React, { Component } from "react";
import * as Ably from "ably";
import { Doughnut } from "react-chartjs-2";

let realTime = null;
let myVotingChannel = null;
class Dashboard extends Component {
 
  state = {
    votes: {
      barcelona: 0,
      realMadrid: 0,
      juventus: 0,
    },
  };

  componentDidMount() {
    realTime = new Ably.Realtime({ authUrl: "/subscribe" });
    realTime.connection.once("connected", () => {
      // create the channel object
      myVotingChannel = realTime.channels.get("Voting-App");
      myVotingChannel.subscribe("vote", (msg) => {
        this.setState({
          votes: {
            ...this.state.votes,
            [msg.data]: this.state.votes[msg.data] + 1,
          },
        });
      });
    });
  }
  componentWillUnmount(){
    myVotingChannel.unsubscribe();
    realTime.connection.off();
  }
  render() {
    const data = {
      labels: ["Barcelona", "Real Madrid", "Juventus"],
      datasets: [
        {
          barPercentage: 1,
          backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56"],
          data: [
            this.state.votes.barcelona,
            this.state.votes.realMadrid,
            this.state.votes.juventus,
          ],
        },
      ],
    };

    const options = {
      title: {
        display: true,
        text: "Voting Dashboard",
        fontSize: 25,
        fontColor: "#CB0F33",
      },
      layout: {
        padding: {
          top: 50,
        }
      }
    };
    return <Doughnut className="graph" data={data} options={options} />;
  }
}

export default Dashboard;
