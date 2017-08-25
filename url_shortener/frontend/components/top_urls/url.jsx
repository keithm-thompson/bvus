import React from 'react';

export default props => {
  const { num, long_url, num_times_shortened } = props;

  return (
    <div className="row">
      <p className="url-rank">{ num } </p>
      <div className="url-link">
        <a href={long_url}>{ long_url }</a>
      </div>
      <p className="url-num-times-shortened">{ num_times_shortened }</p>
    </div>
  )
};
