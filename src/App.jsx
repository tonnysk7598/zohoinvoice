import React, { Component } from 'react';
import swal from 'sweetalert';
import Home from './Home';

class App extends Component {

  async componentWillMount(){
    const response = await fetch('/authenticate');
    const res = await response.json();
    if(res.code === 400){
      swal({
        title:'Error',
        text: `${res.error}`,
        icon: 'error',
        button: true
      })
      .then(() => {
        window.close()
      })
    }
  }
  
  render() {
    return (
      <div><Home /></div>
    )
  }
}

export default App;
