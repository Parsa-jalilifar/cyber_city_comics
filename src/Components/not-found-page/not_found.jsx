import React, { Component } from "react";
import "./not-found.css";

class not_found extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="not_found">
        <h1>404 Page Not Found</h1>
      </div>
    );
  }
}

export default not_found;
