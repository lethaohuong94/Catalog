import config from '../config';

export async function get(uri, accessToken = '') {
  const getUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'GET',
    headers: requestHeaders,
  };
  const response = await fetch(getUrl, request);
  const json = await response.json();
  return json;
}

export async function post(uri, body, accessToken = '') {
  const postUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(body),
  };
  const response = await fetch(postUrl, request);
  const json = await response.json();
  return json;
}

export async function put(uri, body, accessToken = '') {
  const putUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(body),
  };
  const response = await fetch(putUrl, request);
  const json = await response.json();
  return json;
}

export async function del(uri, accessToken = '') {
  const delUrl = `${config.URL}${uri}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  const request = {
    method: 'DELETE',
    headers: requestHeaders,
  };
  const response = await fetch(delUrl, request);
  const json = await response.json();
  return json;
}
