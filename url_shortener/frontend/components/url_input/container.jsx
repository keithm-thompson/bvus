import React, { Component } from 'react';

import { shortenUrl, getLongUrl } from '../../util/api';

export default class UrlInputContainer extends Component {
  render() {
    return(
      <div className="url-input">
        <div className="url-input-container">
          <p className="url-input-header">Need a shorter URL?</p>
        </div>
        <div className="url-input-body-container">
          <div className="url-input-text-input">
            <label> Please enter a URL to shorten
              <input type="text"></input>
            </label>
          </div>
          <div className="url-input-text-input">
              <p>{ "blah" }</p>
          </div>
        </div>
      </div>
    )
  }
}
