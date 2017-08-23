export const shortenUrl = (longUrl) => {
  makeXHR('POST', '/api/urls', { long_url: longUrl });
};

export const getLongUrl = (shortUrl) => {
  makeXHR('GET', '/api/urls/short', { short_url: shortUrl });
};

export const getMostCommonlyShortenedUrls = () => {
  makeXHR('GET', '/api/urls');
};

const makeXHR = (method, url, data) => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };

    request.onerror = () => {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    };

    request.send(JSON.stringify(data));
  });
};
