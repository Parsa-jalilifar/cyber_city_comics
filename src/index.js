import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const url = `https://fathomless-springs-95129.herokuapp.com/comic/latestcomic`;

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      throw Error("HTTP 404, Not found");
    } else {
      throw Error(`HTTP ${response.status}, ${response.statusText}`);
    }
  })
  .then((responseData) => {
    ReactDOM.render(
      <>
        <App myPropsObject={responseData["num"]} />
      </>,
      document.getElementById('root')
    );
  })
  .catch((error) => {
    console.log(error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
