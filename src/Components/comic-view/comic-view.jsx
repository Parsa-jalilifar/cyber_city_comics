import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./comic-view.css";

class comic_view extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
    };
  }

  componentDidMount() {
    this.setState({
      comic: this.props.comic,
    });
  }

  parseTranscript() {
    let transcriptData = this.state.comic["transcript"];
    // let filter1 = transcriptData.replaceAll("[[", "");
    // let filter2 = filter1.replaceAll("]]", "");
    // let filter3 = filter2.replace(/(\n)+{{Title.*}}/gm, "");
    return transcriptData;
  }

  render() {
    return (
      <div className="comic_container">
        <div class="comic_image">
          <img src={this.state.comic["img"]} alt={this.state.comic["alt"]} />
        </div>
        {this.state.comic["transcript"] ? (
          <div id="transcript">
            <pre>{this.parseTranscript()}</pre>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(comic_view);
