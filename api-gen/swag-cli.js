/* eslint-disable no-sync */

const fs = require('fs');

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
const swaggerApi = JSON.parse(fs.readFileSync(argv.in));
const createApi = require('./create-api');

// Create a JS script for the API and save it
createApi.createApiScript(swaggerApi, (err, script) => {
  if (!err) {
    fs.writeFileSync(argv.out, script);
  }
});
