import React, { Component } from 'react';

import { shortenUrl, getLongUrl } from '../../util/api';

export default class UrlInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      url: ""
    });

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ url: e.currentTarget.value });
  }

  render() {
    return(
      <div className="url-input">
        <div className="url-input-header-container">
          <p className="url-input-header">Need a shorter URL?</p>
        </div>
        <div className="url-input-body-container">
          <div className="url-input-text">
            <label htmlFor="url-input"> enter a URL to shorten below
            </label>
              <input
                id="url-input"
                type="text"
                onChange={this.handleInput}
                value={this.state.url}/>
          </div>
          <div className="url-input-text">
              <p>{ "blah" }</p>
          </div>
        </div>
      </div>
    )
  }
}
