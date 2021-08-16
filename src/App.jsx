import React, { Component } from 'react';
import Home from './Home';

class App extends Component {

  async componentWillMount(){
    const response = await fetch('/authenticate');
    await response.json();
  }
  
  render() {
    return (
      <div><Home /></div>
    )
  }
}

export default App;
