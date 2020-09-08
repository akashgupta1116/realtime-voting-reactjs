import React, { Component } from "react";
import * as Ably from "ably";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  state = {
    barcelona: 0,
    realMadrid: 0,
    juventus: 0
  };

  componentDidMount() {
    const realTime = new Ably.Realtime({ authUrl: '/subscribe' });
    realTime.connection.once('connected', () => {
        // create the channel object
        const myVotingChannel = realTime.channels.get('Voting-App');
        myVotingChannel.subscribe("vote", (msg) => {
        
        this.setState(
            {
            [msg.data]: this.state[msg.data] + 1
            })  
        });
    });
  }

  render() {
    const data = {
      labels: ["Barcelona", "Real Madrid", "Juventus"],
      datasets: [
        {
          barPercentage: 1,
          backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56"],
        //   label: "Name",
          data: [
            this.state.barcelona,
            this.state.realMadrid,
            this.state.juventus
          ]
        }
      ]
    };

    const options = {
      title: {
        display: true,
        text: "Voting",
        fontSize: 20,
        fontColor: "#CB0F33"
      }
    };
    return (
      <div>
        <Doughnut data={data} options={options} />
      </div>
    );
  }
}

export default Chart;