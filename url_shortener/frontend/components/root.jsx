import React, { Component } from 'react';

import Header from './header';
import UrlInputContainer from './url_input/container';
import TopUrlsContainer from './top_urls/container';


export default class Root extends Component {
  render() {
    return(
      <div>
        <Header/>

        <div className="body-container">
          <div className="input-container">
            <UrlInputContainer type="shorten" />
            <UrlInputContainer type="elongate" />
          </div>

          <TopUrlsContainer />
        </div>
      </div>
    )
  }
}
