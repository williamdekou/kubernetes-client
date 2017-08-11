/* eslint-disable no-console, no-sync, no-process-env */
const fs = require('fs');
const path = require('path');
const process = require('process');
const Api = require('./theApi');

const minikubeConfigRaw = fs.readFileSync(
  path.resolve(process.env.HOME, '.minikube', 'machines', 'minikube', 'config.json'));
const minikubeConfig = JSON.parse(minikubeConfigRaw);

const api = new Api({
  path: `https://${ minikubeConfig.Driver.IPAddress }:8443`,
  ca: fs.readFileSync(path.resolve(process.env.HOME, '.minikube/ca.crt')),
  cert: fs.readFileSync(path.resolve(process.env.HOME, '.minikube/apiserver.crt')),
  key: fs.readFileSync(path.resolve(process.env.HOME, '.minikube/apiserver.key'))
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const namespace = {
  kind: 'Namespace',
  metadata: {
    name: 'test'
  }
};

const options = [{
  api: 'api.v1.get()', exec: () => api.v1.get(print)
}, {
  api: 'api.v1.ns.get()', exec: () => api.v1.ns.get(print)
}, {
  api: 'api.v1.namespaces.get()', exec: () => api.v1.namespaces.get(print)
}, {
  api: 'api.v1.namespaces(\'kube-system\').get()', exec: () => api.v1.namespaces('kube-system').get(print)
}, {
  api: 'api.v1.namespaces(\'kube-system\').pods.get()',
  exec: () =>  api.v1.namespaces('kube-system').pods.get(print)
}, {
  api: 'api.v1.namespaces(\'kube-system\').pods(\'default-http-backend-hmvql\').get()',
  exec: () =>  api.v1.namespaces('kube-system').pods('default-http-backend-hmvql').get(print)
}, {
  api: 'api.v1.namespaces.post({ name: \'test\'})',
  exec: () =>  api.v1.namespaces.post(namespace, print)
}, {
  api: 'api.v1.ns(\'test\').put({ name: \'test\'})',
  exec: () =>  api.v1.ns('test').put(namespace, print)
}, {
  api: 'api.v1.namespaces(\'test\').delete()',
  exec: () =>  api.v1.namespaces('test').delete(print)
}
];

function menu() {
  console.log();
  console.log('********************************');
  let index = 0;
  options.forEach(option => {
    console.log(`${ index }.${ option.api }`);
    index++;
  });
  rl.prompt();
}

function print(err, result) {
  // console.log(err || JSON.stringify(result, null, '  '));
  console.log(err || result);
  menu();
}

menu();

rl.on('line', line => {

  const option = line[0];
  if (option >= 0 && option < options.length) {
    console.log();
    console.log(options[option].api);
    console.log();

    try {
      options[option].exec();
    } catch (ex) {
      console.log(ex);
    }
  } else {
    rl.prompt();
  }
}).on('close', () => {
  console.log('Exiting');
});
