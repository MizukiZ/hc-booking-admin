import React, { Fragment, Component } from "react";

import Sidebar from "react-sidebar";
import SidebarContent from "./components/SidebarContent";
import Header from "./components/Header";
// import SidebarContent from "./sidebar_content";

const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};

class App extends Component {


  render() {
    return (
      <Sidebar
        sidebar={(
          <Fragment>
            <Header title="Menu"></Header>
            <SidebarContent />
          </Fragment>
        )
        }
        docked={true}
        sidebarClassName="hc-sidebar"
      >
        < Header title="Heart Councelling Admin Dashboard" >
        </Header >
      </Sidebar>
    );
  }
}


export default App;
