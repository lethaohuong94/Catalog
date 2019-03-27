import config from './config';

export function get(uri, accessToken = '') {
  const getUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'GET',
    headers: requestHeaders,
  };
  return { url: getUrl, request };
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
  const delUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'DEL',
    headers: requestHeaders,
  };
  return { url: delUrl, request };
}
