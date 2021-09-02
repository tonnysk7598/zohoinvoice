import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import MainPage from "views/MainPage";
import EditContact from "views/EditContact";
import CreateContact from "views/CreateContact";
import DetailsView from "views/DetailsView";
import ErrorPage from "views/ErrorPage";
import CloneContact from "views/CloneContact";

var ps;

class IndexLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/create" component={CreateContact} />
            <Route path="/edit/:id" component={EditContact} />
            <Route path="/view/:id" component={DetailsView} />
            <Route path="/clone/:id" component={CloneContact} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default IndexLayout;
