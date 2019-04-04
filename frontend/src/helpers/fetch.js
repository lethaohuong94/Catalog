import config from '../config';
import { showErrorToast } from './toaster';

function createRequest(uri, method, accessToken = '', body = '') {
  const url = `${config.URL}${uri}`;
  const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  let request = {};
  if (['GET', 'DELETE'].includes(method)) {
    request = {
      method,
      headers: requestHeaders,
    };
  } else if (['POST', 'PUT'].includes(method)) {
    request = {
      method,
      headers: requestHeaders,
      body: JSON.stringify(body),
    };
    return { url, request };
  } else {
    throw Error('unrecognized method');
  }
  return { url, request };
}

async function sendRequest(request) {
  let json = {};
  let successful = false;
  try {
    const response = await fetch(request.url, request.request);
    successful = response.ok;
    json = await response.json();
    json.successful = successful;
    if (!successful) throw Error(json.message);
  } catch (error) {
    showErrorToast(error.message);
  }
  return json;
}

export async function get(uri, accessToken = '') {
  const request = createRequest(uri, 'GET', accessToken);
  const response = await sendRequest(request);
  return response;
}

export async function post(uri, body, accessToken = '') {
  const request = createRequest(uri, 'POST', accessToken, body);
  const response = await sendRequest(request);
  return response;
}

export async function put(uri, body, accessToken = '') {
  const request = createRequest(uri, 'PUT', accessToken, body);
  const response = await sendRequest(request);
  return response;
}

export async function del(uri, accessToken = '') {
  const request = createRequest(uri, 'DELETE', accessToken);
  const response = await sendRequest(request);
  return response;
}
