import React, { Component } from 'react';
import swal from 'sweetalert';
import Home from './Home';
import Loading from './Loading';

class App extends Component {
  state = {
    authenticated: false
  }

  async componentWillMount() {
    const response = await fetch('/validateAuth');
    const res = await response.json();
    if (res.code === 400) {
      swal({
        title: 'One step further...!',
        text: 'Click to generate Grant Token. Copy generated token and back to this page and paste.',
        icon: 'info',
        buttons: ['Cancel', 'Generate']
      })
        .then((generate) => {
          if (generate) {
            window.open('https://accounts.zoho.com/developerconsole')
            swal({
              title: 'Plese generate grant token and paste here',
              content: "input",
            })
              .then(async (value) => {
                const authResponse = await fetch(`/authenticate/${value}`);
                const authRes = await authResponse.json();
                if(authRes.code === 200){
                  this.setState({ authenticated: true });
                } else {
                  window.location = '/'
                }
              })
          } else {
            window.close()
          }
        })
    } else {
      this.setState({ authenticated: true });
    }
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>{authenticated ? <Home /> : <Loading />}</div>
    )
  }
}

export default App;
