import React, { Component } from 'react';

import { getMostCommonlyShortenedUrls } from '../../util/api';

import PageOfUrls from './page_of_urls';

export default class UrlInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = ({ topUrls: [], page: 0, topUrlPages: [] });
    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    getMostCommonlyShortenedUrls().then( urls => {
      this.setState({ topUrls: urls, topUrlPages: this.mapUrlsToPages(urls)})
    });
  }

  changePage(e) {
    const newPage = parseInt(e.target.id);
    if (newPage >= 0 && newPage < 10) {
      this.setState({ page: newPage });
    }
  }
  mapUrlsToPages(topUrls) {
    let startIdx = 0;
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

  renderPageNumbers() {
    const { topUrls, page } = this.state;
    const numbers = [];
    const numPages = Math.ceil(topUrls.length / 10 );
    for (var i = 0; i < numPages; i++) {
      if( i === page) {
        numbers.push(<span id={i} key={i} className="selected-page">{ i + 1 }</span>);
      } else {
        numbers.push(<span id={i} key={i} className="unselected-page">{ i + 1 }</span>);
      }
    }
    return numbers;
  }

  render() {
    const { topUrlPages, page } = this.state;
    
    return(
      <div className="most-shortened-container">
        <div className="most-shortened-header-container">
          <p className="most-shortened-header">100 most commonly shortened URLs </p>
        </div>

        <div className="most-shortened-body-container">
          { topUrlPages[page] }
        </div>

        <div
          className="most-shortened-page-numbers-container"
        >
        <p className="most-shortened-page-label">Page:</p>
        <div className="most-shortened-page-numbers"onClick={this.changePage}>
          { this.renderPageNumbers() }
        </div>
        </div>
      </div>
    )
  }
}
