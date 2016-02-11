import { assert } from 'chai';
import express from 'express';

const createApp = (config) => {
          let app = express();

          return require('../src/apis/img-searcher')(app, config);
      },

      api = {
          is: assert.strictEqual,
          deq: assert.deepEqual,
          assert: assert,
          createApp: createApp
      },

      exports = Object.create(api),

      globalize = context => {
          if( context===undefined ) context = global||window;

          Object.keys(api)
              .forEach(fnName => {
                  context[fnName] = api[fnName];
              });

          return exports;
      };


exports.globalize = globalize;

module.exports = exports;
