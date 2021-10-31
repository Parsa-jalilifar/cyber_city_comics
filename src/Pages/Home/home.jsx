import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import ComicView from "../../Components/comic-view/comic-view";
import NotFound from "../../Components/not-found-page/not_found";
import logo from "../../Images/logo.png";
import moment from "moment";
import "./home.css";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: null,
      comic: null,
      loading: true,
      lastId: this.props.lastId,
      redirect: null,
      date: null,
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.random = this.random.bind(this);
  }

  next() {
    if (this.state.currentId < this.state.lastId) {
      this.setState({
        redirect: `/home/${this.state.currentId + 1}`,
      });
    }
  }

  prev() {
    if (this.state.currentId > 1) {
      this.setState({
        redirect: `/home/${this.state.currentId - 1}`,
      });
    }
  }

  random() {
    const randomId = Math.round(Math.random() * this.state.lastId);
    this.setState({
      redirect: `/home/${randomId}`,
    });
  }

  componentDidMount() {
    const url = `https://fathomless-springs-95129.herokuapp.com/comics?num=${this.props.match.params.id}`;

    fetch(url)
      .then((response) => {
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok,
        });
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        this.setState({
          comic: responseData,
          loading: false,
          currentId: responseData.num,
          date:
            responseData["month"] +
            "/" +
            responseData["day"] +
            "/" +
            responseData["year"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect !== null) {
      window.location.reload(false);
      console.log("Redirecting to" + this.state.redirect);
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { currentId: this.state.currentId },
          }}
        />
      );
    }

    return (
      <div className="home">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo"/>
          </a>
        </div>
        <div className="navigation">
          <div className="btn btn_random" onClick={this.random}>
            <a href> Random </a>
          </div>
          <div className="btn btn_prev" onClick={this.prev}>
            <a href>&lt; prev</a>
          </div>
          <div className="btn btn_next" onClick={this.next}>
            <a href>next &gt;</a>
          </div>
        </div>
        {!this.state.loading ? (
          <div className="header">
            <div className="title">
              <h2>{this.state.comic["safe_title"]}</h2>
            </div>
            <div className="date">
              <h4>{moment(this.state.date).format("LL")}</h4>
            </div>
          </div>
        ) : null}
        {this.props.match.params.id > this.state.lastId ||
        isNaN(this.props.match.params.id) ? (
          <NotFound />
        ) : null}
        {this.state.comic && <ComicView comic={this.state.comic} />}
      </div>
    );
  }
}

export default withRouter(home);
