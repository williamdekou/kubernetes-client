/* eslint-disable no-sync */

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options('in', {
    describe: 'Input specification',
    demandOption: true
  }).option('out', {
    describe: 'Output specification',
    demandOption: true
  })
  .argv
;
const swagger = require('swagger-client');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const source = fs.readFileSync(path.join(__dirname, 'factory.handlebars')).toString();
const template = handlebars.compile(source);

const swaggerApi = JSON.parse(fs.readFileSync(argv.in));

let apiScript = `
/* eslint-disable max-params, max-statements */
const request = require('request');
function _request(method, options, body, path, cb) {

  if (typeof body === 'function') {
    cb = body;
    body = null;
  }

  const requestOptions = Object.assign({
    method: method || 'GET',
    uri: path,
    body: body,
    json: true,
    qs: options.qs,
    headers: options.headers
  }, options);

  return request(requestOptions, (err, res, resBody) => {
    if (err) return cb(err);
    cb(null, { statusCode: res.statusCode, body: resBody });
  });
}

function _get(options, path, cb) {
  return _request('GET', options, null, path, cb);
}

function _post(options, body, path, cb) {
  return _request('POST', options, body, path, cb);
}

function _put(options, body, path, cb) {
  return _request('PUT', options, body, path, cb);
}

function _delete(options, body, path, cb) {
  return _request('DELETE', options, body, path, cb);
}

`;


function parseApi(apis) {
  const apiObjects = {};
  const resourceAliases = {
    // We support the full names and all the abbbreviated aliases:
    //   http://kubernetes.io/docs/user-guide/kubectl-overview/
    // and anything else we think is useful.
    clusterroles: [],
    clusterrolebindings: [],
    componentstatuses: ['cs'],
    configmaps: ['cm'],
    cronjobs: [],
    daemonsets: ['ds'],
    deployments: ['deploy'],
    events: ['ev'],
    endpoints: ['ep'],
    horizontalpodautoscalers: ['hpa'],
    ingresses: ['ing'],
    jobs: [],
    limitranges: ['limits'],
    namespaces: ['ns'],
    nodes: ['no'],
    persistentvolumes: ['pv'],
    persistentvolumeclaims: ['pvc'],
    // Deprecated name of statefulsets in kubernetes 1.4
    petsets: [],
    pods: ['po'],
    replicationcontrollers: ['rc'],
    replicasets: ['rs'],
    resourcequotas: ['quota'],
    roles: [],
    rolebindings: [],
    // Deprecated name of cronjobs in kubernetes 1.4
    scheduledjobs: [],
    secrets: [],
    serviceaccounts: [],
    services: ['svc'],
    statefulsets: [],
    thirdpartyresources: []
  };

  Object.keys(apis).forEach(apiFullPath => {
    const pathNodes = apiFullPath.split('/').filter(node => node);
    let prevApiNode;
    pathNodes.forEach(className  => {
      if (className.startsWith('{')) {
        prevApiNode.parameter = className.slice(1, -1);
        return;
      }
      let classObject = apiObjects[className];
      if (!classObject) {
        classObject = { className: className, children: [], methods: [], parameterMethods: [] };
        classObject.resourceAliases = resourceAliases[className] || [];
        apiObjects[className] = classObject;
        if (prevApiNode && !prevApiNode.children.includes(className)) {
          prevApiNode.children.push(classObject);
        }
      }
      prevApiNode = classObject;
    });

    const parameterMethods = pathNodes.pop().startsWith('{');

    if (prevApiNode) {
      Object.keys(apis[apiFullPath]).filter(key => isHttpMethod(key)).forEach(method => {
        const methods = parameterMethods ? prevApiNode.parameterMethods
                                         : prevApiNode.methods;
        if (!methods.includes(method)) {
          methods.push(method);
        }
      });
    }
  });
  return apiObjects;
}

function isHttpMethod(value) {
  return ['connect', 'delete', 'get', 'head', 'options', 'post', 'put']
    .includes(value.toLowerCase());
}

function generateClassesFor(modelObject) {


  const body = template(modelObject);
  apiScript = apiScript.concat(body);

  modelObject.children.forEach(childNode => {
    generateClassesFor(childNode);
  });
}

function generateClasses(apiObjects) {

  handlebars.registerHelper('method', function (method, methodPath) {
    if (method === 'post' || method === 'put' || method === 'delete') {
      return `(body, cb) => _${ method }(options, body, ${ methodPath }, cb)`;
    }
    return `cb => _${ method }(options, ${ methodPath }, cb)`;
  });

  generateClassesFor(apiObjects.api);
}

swagger({ spec: swaggerApi }).then((jx) => {
  const apiObjects = parseApi(jx.spec.paths);

  generateClasses(apiObjects);

  apiScript = apiScript.concat(`
    module.exports = api;
    `);

  fs.writeFileSync('theApi.js', apiScript);
});
