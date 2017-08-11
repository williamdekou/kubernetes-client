## Support for generating an API from swagger doc

This directory contains scripts for generating an API that matches a swagger
specification doc. The code to generate the API is in create-api.js.

There are two ways to generate an API.

### Generate a script

The swag-cli script generates a javascript script which can be saved and required
from a client module that wants to access the API.

Example usage
```
curl -L url-of-swagger-doc > swagger.json
node swag-cli --in ./swagger.json --out theApi.js
```

Currently it just supports reading a local swagger document, so it must first
be downloaded; in the future it will support reading the swagger doc directly
from the host.

### Generate executable javascript

You can also generate an executable module that can be use directly to access
a kubernetes API.
```
const createApi = require('./create-api');
const swaggerApi = JSON.parse(fs.readFileSync('swagger.json'));
createApi.createApi(theApi, (err, Api) => {
  if (err) return err;
  const api = Api(...);
});
```

### Running the test app.
The run-test.sh script uses swag-cli to generate an API, then launches test-app.js,
which is a simple app that lets you do a few canned commands. It's not meant to be
a comprehensive test, but it allows a quick sanity check to make sure things are
working in general.

**Note** test-app requires a running minikube installation - all commands are
issued against your minikube instance.
