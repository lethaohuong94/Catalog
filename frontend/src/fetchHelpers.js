import config from './config';

export function get(uri, accessToken = '') {
  const postUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'POST',
    headers: requestHeaders,
  };
  return { url: postUrl, request };
}

export function post(uri, body, accessToken = '') {
  const postUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(body),
  };
  return { url: postUrl, request };
}

export function put(uri, body, accessToken = '') {
  const postUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(body),
  };
  return { url: postUrl, request };
}

export function del(uri, accessToken = '') {
  const postUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'DEL',
    headers: requestHeaders,
  };
  return { url: postUrl, request };
}
