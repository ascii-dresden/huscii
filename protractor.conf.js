// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const browser = require('protractor');

const {
  SpecReporter
} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
  params: {
    testdata: {
      members: [{
        firstName: 'Max',
        lastName: 'Mustermann',
        boardMember: false,
        contacts: [{
          type: 'Phone',
          value: '0123123123'
        }, {
          type: 'Email',
          value: 'max.mustermann@huscii.git'
        }]
      }, {
        firstName: 'Erika',
        lastName: 'Musterfrau',
        boardMember: true,
        contacts: [{
          type: 'Twitter',
          value: 'https://twitter.com/thisisjustfortests'
        }]
      }]
    }
  }
};
