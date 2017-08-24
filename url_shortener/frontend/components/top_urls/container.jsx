import React, { Component } from 'react';

import { getMostCommonlyShortenedUrls } from '../../util/api';

import PageOfUrls from './page_of_urls';

export default class UrlInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = ({ topUrls: [], page: 0 });
  }

  componentWillMount() {
    getMostCommonlyShortenedUrls().then((urls) => {
      this.setState({ topUrls: urls})
    });
  }

  mapUrlsToColumns() {
    let startIdx = 0;
    const { topUrls } = this.state;
    let urlPages = [];
    while (startIdx < topUrls.length) {
      urlPages.push(
        <PageOfUrls
          key={startIdx}
          startIdx={startIdx}
          urls={ topUrls.slice(startIdx, startIdx + 10) }
          />
      );
      startIdx += 10;
    }
    return urlPages;
  }

  render() {
    const urlPages = this.mapUrlsToColumns();

    return(
      <div className="most-shortened-container">
        <div className="most-shortened-header-container">
          <p className="most-shortened-header">100 most commonly shortened URLs </p>
        </div>

        <div className="most-shortened-body-container">
          { urlPages }
        </div>
      </div>
    )
  }
}
