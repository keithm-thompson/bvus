import React from 'react';

import Url from './url';

export default props => {
  let { urls, startIdx } = props;

  urls = urls.map((url, idx) => {
    return (
        <Url
          key={ idx }
          num={ startIdx + idx + 1 }
          { ...url }
          />
       )
  });
  return(
    <div className="page">
      <div className="row">
        <span
          className="url-rank"
          style={{fontSize: '18px'}}> rank </span>
        <span
          className="url-link"
          style={{fontSize: '18px'}}>URL</span>
        <span
          className="url-num-times-shortened"
          style={{fontSize: '18px'}}> count </span>
      </div>
      { urls }
    </div>
  );
};
