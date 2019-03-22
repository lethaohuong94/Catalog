const dev = {
  //configurations for dev
  NAME: 'dev',
};

const prod = {
  //configurations for prod
  NAME: 'prod',
};

const staging = {
  //configurations for staging
  NAME: 'staging',
};

const test = {
  //configurations for test
  NAME: 'test',
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