
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

function _options(options, body, path, cb) {
  return _request('OPTIONS', options, body, path, cb);
}

function _head(options, body, path, cb) {
  return _request('HEAD', options, body, path, cb);
}


function api(options, path) {
  path = (path || options.path) + '/api';
  function _api() {
    return {
    };
  }
  _api.v1 =  v1(options, path);

  _api.get = cb => _get(options, path, cb);
  return _api;
}

function v1(options, path) {
  path = (path || options.path) + '/v1';
  function _v1() {
    return {
    };
  }
  _v1.componentstatuses =  componentstatuses(options, path);
  _v1.cs = _v1.componentstatuses;
  _v1.configmaps =  configmaps(options, path);
  _v1.cm = _v1.configmaps;
  _v1.endpoints =  endpoints(options, path);
  _v1.ep = _v1.endpoints;
  _v1.events =  events(options, path);
  _v1.ev = _v1.events;
  _v1.limitranges =  limitranges(options, path);
  _v1.limits = _v1.limitranges;
  _v1.namespaces =  namespaces(options, path);
  _v1.ns = _v1.namespaces;
  _v1.nodes =  nodes(options, path);
  _v1.no = _v1.nodes;
  _v1.persistentvolumes =  persistentvolumes(options, path);
  _v1.pv = _v1.persistentvolumes;
  _v1.watch =  watch(options, path);
  _v1.tokenreviews =  tokenreviews(options, path);
  _v1.selfsubjectaccessreviews =  selfsubjectaccessreviews(options, path);
  _v1.subjectaccessreviews =  subjectaccessreviews(options, path);
  _v1.horizontalpodautoscalers =  horizontalpodautoscalers(options, path);
  _v1.hpa = _v1.horizontalpodautoscalers;
  _v1.jobs =  jobs(options, path);
  _v1.storageclasses =  storageclasses(options, path);

  _v1.get = cb => _get(options, path, cb);
  return _v1;
}

function componentstatuses(options, path) {
  path = (path || options.path) + '/componentstatuses';
  function _componentstatuses(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb)
    };
  }

  _componentstatuses.get = cb => _get(options, path, cb);
  return _componentstatuses;
}

function configmaps(options, path) {
  path = (path || options.path) + '/configmaps';
  function _configmaps(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _configmaps.get = cb => _get(options, path, cb);
  _configmaps.post = (body, cb) => _post(options, body, path, cb);
  _configmaps.delete = (body, cb) => _delete(options, body, path, cb);
  return _configmaps;
}

function endpoints(options, path) {
  path = (path || options.path) + '/endpoints';
  function _endpoints(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _endpoints.get = cb => _get(options, path, cb);
  _endpoints.post = (body, cb) => _post(options, body, path, cb);
  _endpoints.delete = (body, cb) => _delete(options, body, path, cb);
  return _endpoints;
}

function events(options, path) {
  path = (path || options.path) + '/events';
  function _events(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _events.get = cb => _get(options, path, cb);
  _events.post = (body, cb) => _post(options, body, path, cb);
  _events.delete = (body, cb) => _delete(options, body, path, cb);
  return _events;
}

function limitranges(options, path) {
  path = (path || options.path) + '/limitranges';
  function _limitranges(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _limitranges.get = cb => _get(options, path, cb);
  _limitranges.post = (body, cb) => _post(options, body, path, cb);
  _limitranges.delete = (body, cb) => _delete(options, body, path, cb);
  return _limitranges;
}

function namespaces(options, path) {
  path = (path || options.path) + '/namespaces';
  function _namespaces(namespace) {
    const nextPath = path + '/' + namespace;
    return {
      bindings: bindings(options, nextPath),
      persistentvolumeclaims: persistentvolumeclaims(options, nextPath),
      pods: pods(options, nextPath),
      podtemplates: podtemplates(options, nextPath),
      replicationcontrollers: replicationcontrollers(options, nextPath),
      resourcequotas: resourcequotas(options, nextPath),
      secrets: secrets(options, nextPath),
      serviceaccounts: serviceaccounts(options, nextPath),
      services: services(options, nextPath),
      finalize: finalize(options, nextPath),
      statefulsets: statefulsets(options, nextPath),
      localsubjectaccessreviews: localsubjectaccessreviews(options, nextPath),
      scheduledjobs: scheduledjobs(options, nextPath),
      networkpolicies: networkpolicies(options, nextPath),
      replicasets: replicasets(options, nextPath),
      poddisruptionbudgets: poddisruptionbudgets(options, nextPath),
      rolebindings: rolebindings(options, nextPath),
      roles: roles(options, nextPath),
      podpresets: podpresets(options, nextPath),

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _namespaces.get = cb => _get(options, path, cb);
  _namespaces.post = (body, cb) => _post(options, body, path, cb);
  return _namespaces;
}

function bindings(options, path) {
  path = (path || options.path) + '/bindings';
  function _bindings() {
    return {
    };
  }

  _bindings.post = (body, cb) => _post(options, body, path, cb);
  return _bindings;
}

function persistentvolumeclaims(options, path) {
  path = (path || options.path) + '/persistentvolumeclaims';
  function _persistentvolumeclaims(name) {
    const nextPath = path + '/' + name;
    return {
      status: status(options, nextPath),

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _persistentvolumeclaims.get = cb => _get(options, path, cb);
  _persistentvolumeclaims.post = (body, cb) => _post(options, body, path, cb);
  _persistentvolumeclaims.delete = (body, cb) => _delete(options, body, path, cb);
  return _persistentvolumeclaims;
}

function status(options, path) {
  path = (path || options.path) + '/status';
  function _status() {
    return {
    };
  }

  _status.get = cb => _get(options, path, cb);
  _status.put = (body, cb) => _put(options, body, path, cb);
  return _status;
}

function pods(options, path) {
  path = (path || options.path) + '/pods';
  function _pods(name) {
    const nextPath = path + '/' + name;
    return {
      attach: attach(options, nextPath),
      binding: binding(options, nextPath),
      eviction: eviction(options, nextPath),
      exec: exec(options, nextPath),
      log: log(options, nextPath),
      portforward: portforward(options, nextPath),
      proxy: proxy(options, nextPath),

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb),
      post: (body, cb) => _post(options, body, nextPath, cb),
      options: (body, cb) => _options(options, body, nextPath, cb),
      head: (body, cb) => _head(options, body, nextPath, cb)
    };
  }

  _pods.get = cb => _get(options, path, cb);
  _pods.post = (body, cb) => _post(options, body, path, cb);
  _pods.delete = (body, cb) => _delete(options, body, path, cb);
  return _pods;
}

function attach(options, path) {
  path = (path || options.path) + '/attach';
  function _attach() {
    return {
    };
  }

  _attach.get = cb => _get(options, path, cb);
  _attach.post = (body, cb) => _post(options, body, path, cb);
  return _attach;
}

function binding(options, path) {
  path = (path || options.path) + '/binding';
  function _binding() {
    return {
    };
  }

  _binding.post = (body, cb) => _post(options, body, path, cb);
  return _binding;
}

function eviction(options, path) {
  path = (path || options.path) + '/eviction';
  function _eviction() {
    return {
    };
  }

  _eviction.post = (body, cb) => _post(options, body, path, cb);
  return _eviction;
}

function exec(options, path) {
  path = (path || options.path) + '/exec';
  function _exec() {
    return {
    };
  }

  _exec.get = cb => _get(options, path, cb);
  _exec.post = (body, cb) => _post(options, body, path, cb);
  return _exec;
}

function log(options, path) {
  path = (path || options.path) + '/log';
  function _log() {
    return {
    };
  }

  _log.get = cb => _get(options, path, cb);
  return _log;
}

function portforward(options, path) {
  path = (path || options.path) + '/portforward';
  function _portforward() {
    return {
    };
  }

  _portforward.get = cb => _get(options, path, cb);
  _portforward.post = (body, cb) => _post(options, body, path, cb);
  return _portforward;
}

function proxy(options, path) {
  path = (path || options.path) + '/proxy';
  function _proxy(path) {
    const nextPath = path + '/' + path;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      post: (body, cb) => _post(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb),
      options: (body, cb) => _options(options, body, nextPath, cb),
      head: (body, cb) => _head(options, body, nextPath, cb)
    };
  }

  _proxy.get = cb => _get(options, path, cb);
  _proxy.put = (body, cb) => _put(options, body, path, cb);
  _proxy.post = (body, cb) => _post(options, body, path, cb);
  _proxy.delete = (body, cb) => _delete(options, body, path, cb);
  _proxy.options = (body, cb) => _options(options, body, path, cb);
  _proxy.head = (body, cb) => _head(options, body, path, cb);
  return _proxy;
}

function podtemplates(options, path) {
  path = (path || options.path) + '/podtemplates';
  function _podtemplates(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _podtemplates.get = cb => _get(options, path, cb);
  _podtemplates.post = (body, cb) => _post(options, body, path, cb);
  _podtemplates.delete = (body, cb) => _delete(options, body, path, cb);
  return _podtemplates;
}

function replicationcontrollers(options, path) {
  path = (path || options.path) + '/replicationcontrollers';
  function _replicationcontrollers(name) {
    const nextPath = path + '/' + name;
    return {
      scale: scale(options, nextPath),

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _replicationcontrollers.get = cb => _get(options, path, cb);
  _replicationcontrollers.post = (body, cb) => _post(options, body, path, cb);
  _replicationcontrollers.delete = (body, cb) => _delete(options, body, path, cb);
  return _replicationcontrollers;
}

function scale(options, path) {
  path = (path || options.path) + '/scale';
  function _scale() {
    return {
    };
  }

  _scale.get = cb => _get(options, path, cb);
  _scale.put = (body, cb) => _put(options, body, path, cb);
  return _scale;
}

function resourcequotas(options, path) {
  path = (path || options.path) + '/resourcequotas';
  function _resourcequotas(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _resourcequotas.get = cb => _get(options, path, cb);
  _resourcequotas.post = (body, cb) => _post(options, body, path, cb);
  _resourcequotas.delete = (body, cb) => _delete(options, body, path, cb);
  return _resourcequotas;
}

function secrets(options, path) {
  path = (path || options.path) + '/secrets';
  function _secrets(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _secrets.get = cb => _get(options, path, cb);
  _secrets.post = (body, cb) => _post(options, body, path, cb);
  _secrets.delete = (body, cb) => _delete(options, body, path, cb);
  return _secrets;
}

function serviceaccounts(options, path) {
  path = (path || options.path) + '/serviceaccounts';
  function _serviceaccounts(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _serviceaccounts.get = cb => _get(options, path, cb);
  _serviceaccounts.post = (body, cb) => _post(options, body, path, cb);
  _serviceaccounts.delete = (body, cb) => _delete(options, body, path, cb);
  return _serviceaccounts;
}

function services(options, path) {
  path = (path || options.path) + '/services';
  function _services(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb),
      post: (body, cb) => _post(options, body, nextPath, cb),
      options: (body, cb) => _options(options, body, nextPath, cb),
      head: (body, cb) => _head(options, body, nextPath, cb)
    };
  }

  _services.get = cb => _get(options, path, cb);
  _services.post = (body, cb) => _post(options, body, path, cb);
  return _services;
}

function finalize(options, path) {
  path = (path || options.path) + '/finalize';
  function _finalize() {
    return {
    };
  }

  _finalize.put = (body, cb) => _put(options, body, path, cb);
  return _finalize;
}

function statefulsets(options, path) {
  path = (path || options.path) + '/statefulsets';
  function _statefulsets(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _statefulsets.get = cb => _get(options, path, cb);
  _statefulsets.post = (body, cb) => _post(options, body, path, cb);
  _statefulsets.delete = (body, cb) => _delete(options, body, path, cb);
  return _statefulsets;
}

function localsubjectaccessreviews(options, path) {
  path = (path || options.path) + '/localsubjectaccessreviews';
  function _localsubjectaccessreviews() {
    return {
    };
  }

  _localsubjectaccessreviews.post = (body, cb) => _post(options, body, path, cb);
  return _localsubjectaccessreviews;
}

function scheduledjobs(options, path) {
  path = (path || options.path) + '/scheduledjobs';
  function _scheduledjobs(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _scheduledjobs.get = cb => _get(options, path, cb);
  _scheduledjobs.post = (body, cb) => _post(options, body, path, cb);
  _scheduledjobs.delete = (body, cb) => _delete(options, body, path, cb);
  return _scheduledjobs;
}

function networkpolicies(options, path) {
  path = (path || options.path) + '/networkpolicies';
  function _networkpolicies(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _networkpolicies.get = cb => _get(options, path, cb);
  _networkpolicies.post = (body, cb) => _post(options, body, path, cb);
  _networkpolicies.delete = (body, cb) => _delete(options, body, path, cb);
  return _networkpolicies;
}

function replicasets(options, path) {
  path = (path || options.path) + '/replicasets';
  function _replicasets(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _replicasets.get = cb => _get(options, path, cb);
  _replicasets.post = (body, cb) => _post(options, body, path, cb);
  _replicasets.delete = (body, cb) => _delete(options, body, path, cb);
  return _replicasets;
}

function poddisruptionbudgets(options, path) {
  path = (path || options.path) + '/poddisruptionbudgets';
  function _poddisruptionbudgets(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _poddisruptionbudgets.get = cb => _get(options, path, cb);
  _poddisruptionbudgets.post = (body, cb) => _post(options, body, path, cb);
  _poddisruptionbudgets.delete = (body, cb) => _delete(options, body, path, cb);
  return _poddisruptionbudgets;
}

function rolebindings(options, path) {
  path = (path || options.path) + '/rolebindings';
  function _rolebindings(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _rolebindings.get = cb => _get(options, path, cb);
  _rolebindings.post = (body, cb) => _post(options, body, path, cb);
  _rolebindings.delete = (body, cb) => _delete(options, body, path, cb);
  return _rolebindings;
}

function roles(options, path) {
  path = (path || options.path) + '/roles';
  function _roles(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _roles.get = cb => _get(options, path, cb);
  _roles.post = (body, cb) => _post(options, body, path, cb);
  _roles.delete = (body, cb) => _delete(options, body, path, cb);
  return _roles;
}

function podpresets(options, path) {
  path = (path || options.path) + '/podpresets';
  function _podpresets(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _podpresets.get = cb => _get(options, path, cb);
  _podpresets.post = (body, cb) => _post(options, body, path, cb);
  _podpresets.delete = (body, cb) => _delete(options, body, path, cb);
  return _podpresets;
}

function nodes(options, path) {
  path = (path || options.path) + '/nodes';
  function _nodes(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb),
      post: (body, cb) => _post(options, body, nextPath, cb),
      options: (body, cb) => _options(options, body, nextPath, cb),
      head: (body, cb) => _head(options, body, nextPath, cb)
    };
  }

  _nodes.get = cb => _get(options, path, cb);
  _nodes.post = (body, cb) => _post(options, body, path, cb);
  _nodes.delete = (body, cb) => _delete(options, body, path, cb);
  return _nodes;
}

function persistentvolumes(options, path) {
  path = (path || options.path) + '/persistentvolumes';
  function _persistentvolumes(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _persistentvolumes.get = cb => _get(options, path, cb);
  _persistentvolumes.post = (body, cb) => _post(options, body, path, cb);
  _persistentvolumes.delete = (body, cb) => _delete(options, body, path, cb);
  return _persistentvolumes;
}

function watch(options, path) {
  path = (path || options.path) + '/watch';
  function _watch() {
    return {
    };
  }

  return _watch;
}

function tokenreviews(options, path) {
  path = (path || options.path) + '/tokenreviews';
  function _tokenreviews() {
    return {
    };
  }

  _tokenreviews.post = (body, cb) => _post(options, body, path, cb);
  return _tokenreviews;
}

function selfsubjectaccessreviews(options, path) {
  path = (path || options.path) + '/selfsubjectaccessreviews';
  function _selfsubjectaccessreviews() {
    return {
    };
  }

  _selfsubjectaccessreviews.post = (body, cb) => _post(options, body, path, cb);
  return _selfsubjectaccessreviews;
}

function subjectaccessreviews(options, path) {
  path = (path || options.path) + '/subjectaccessreviews';
  function _subjectaccessreviews() {
    return {
    };
  }

  _subjectaccessreviews.post = (body, cb) => _post(options, body, path, cb);
  return _subjectaccessreviews;
}

function horizontalpodautoscalers(options, path) {
  path = (path || options.path) + '/horizontalpodautoscalers';
  function _horizontalpodautoscalers(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _horizontalpodautoscalers.get = cb => _get(options, path, cb);
  _horizontalpodautoscalers.post = (body, cb) => _post(options, body, path, cb);
  _horizontalpodautoscalers.delete = (body, cb) => _delete(options, body, path, cb);
  return _horizontalpodautoscalers;
}

function jobs(options, path) {
  path = (path || options.path) + '/jobs';
  function _jobs(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _jobs.get = cb => _get(options, path, cb);
  _jobs.post = (body, cb) => _post(options, body, path, cb);
  _jobs.delete = (body, cb) => _delete(options, body, path, cb);
  return _jobs;
}

function storageclasses(options, path) {
  path = (path || options.path) + '/storageclasses';
  function _storageclasses(name) {
    const nextPath = path + '/' + name;
    return {

      get: cb => _get(options, nextPath, cb),
      put: (body, cb) => _put(options, body, nextPath, cb),
      delete: (body, cb) => _delete(options, body, nextPath, cb)
    };
  }

  _storageclasses.get = cb => _get(options, path, cb);
  _storageclasses.post = (body, cb) => _post(options, body, path, cb);
  _storageclasses.delete = (body, cb) => _delete(options, body, path, cb);
  return _storageclasses;
}

module.exports = api;
