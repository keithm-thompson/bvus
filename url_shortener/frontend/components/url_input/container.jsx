import React, { Component } from 'react';

import { shortenUrl, getLongUrl } from '../../util/api';

export default class UrlInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      url: "",
      isLoading: false,
      output: "",
      error: false,
      errorMessage: ""
    });

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ url: e.currentTarget.value });
  }

  handleSubmit(type) {
    return (e) => {
      const { url } = this.state;
      e.preventDefault();
      if (type === "shorten") {
        this.makeShortURLRequest(url);
      } else if(type === "elongate") {
        this.makeLongURLRequest(url);
      }
      this.setState({ isLoading: true})
    }
  }

  getText(component) {
    if (component === "shorten") {
      return ({
        title: "shorten a URL",
        inputLabel: "enter a URL to shorten",
        outputLabel: "shortened url:"
      })
    } else if (component === "elongate") {
      return ({
        title: "check where your shortened URL is pointing",
        inputLabel: "enter a URL that was shortened by us",
        outputLabel: "long url:"
      })
    }
  }

  makeLongURLRequest(url) {
    getLongUrl(url).then( response => {
      this.setState({
        output: response.long_url,
        isLoading: false
       });
    }).catch( response => {
      this.setState({
        error: true,
        errorMessage: response.errorMessage
      })
    });
  }

  makeShortURLRequest(url) {
    shortenUrl(url).then( response => {
      this.setState({
        output: window.location.href + response.short_url,
        isLoading: false });
    }).catch( response => {
      this.setState({
        error: true,
        errorMessage: response.errorMessage
      });
    });
  }

  render() {
    const { type } = this.props;
    const {
      title,
      inputLabel,
      outputLabel
    } = this.getText(type);
    const { isLoading, output} = this.state;


    return(
      <div className="url-input">
        <div className="url-input-header-container">
          <h2 className="url-input-header">{ title }</h2>
        </div>
        <div className="url-input-body-container">
          <div className="url-input-text">
            <label htmlFor="url-input"> { inputLabel }
            </label>
            <input
              id="url-input"
              type="text"
              onChange={this.handleInput}
              value={this.state.url}
            />
          </div>
          <div className="url-input-text">
              <p><span>{ outputLabel }</span> { output }</p>
          </div>
        </div>
        <div className="url-submit">
          <p onClick={this.handleSubmit(type)}> submit </p>
        </div>
      </div>
    )
  }
}
