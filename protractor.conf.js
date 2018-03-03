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
      member: {
        firstName: 'Bartholomew',
        lastName: 'Hicks',
        fullName: function (member) {
          return member.firstName + ' ' + member.lastName;
        },
        boardMember: false,
        contactIcon: function (member, i) {
          const type = member.contacts[i].type.toLowerCase();
          if (type && type === 'email') {
            return 'fa-envelope';
          }
          return 'fa-' + type;
        },
        contacts: [{
          type: 'Phone',
          value: '0123123123'
        }, {
          type: 'Email',
          value: 'bartholomew.hicks@huscii.tld'
        }]
      }
    }
  }
};
