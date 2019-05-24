import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      predictions: []
    }
  }

  fetchPredictions = async () => {
    try {
      const res = await axios.get('https://ih551tgz9c.execute-api.eu-west-2.amazonaws.com/prod/predictions');
      this.setState({predictions: JSON.parse(res.data.body)})
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.fetchPredictions();
  }

  predictions() {
    if (this.state.predictions.length) {
      return this.state.predictions.map(item => {
        console.log(item.home)
        return <li>{item.home} v {item.away}</li>
      })
    }
    return <li>No Predictions</li>
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {this.predictions()}
            </ul>
        </header>
      </div>
    );
  }
}

export default App;
