const dev = {
  //configurations for dev
  URL: 'http://127.0.0.1:5000',
};

const prod = {
  //configurations for prod
  URL: 'http://127.0.0.1:5000',
};

const staging = {
  //configurations for staging
  URL: 'http://127.0.0.1:5000',
};

const test = {
  //configurations for test
  URL: 'http://127.0.0.1:5000',
};

let config = dev;

switch (process.env.REACT_APP_ENV) {
  case 'dev':
    config = dev;
    break;
  case 'prod':
    config = prod;
    break;
  case 'staging':
    config = staging;
    break;
  case 'test':
    config = test;
    break;
  default:
    config = dev;
}

export default {
  ...config,
};