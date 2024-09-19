module.exports = {
  "testEnvironment": "./jest-environment-fail-fast.js",
  "maxWorkers": 6,
  "bail": false,
  "testRunner": "jest-circus/runner",
  "verbose": true,
  "globals": {
    "suites": {
      "softwareTemplates": {
        "templates": [
          "dotnet-basic",
          "go",
          "nodejs",
          "python",
          "java-quarkus",
          "java-springboot"
        ],
        "priority": [
          "High"
        ],
        "github": {
          "active": true,
          "tekton": true,
          "jenkins": false,
          "host": "https://api.github.com",
          "registriesConfig": {
            "quay": {
              "active": true,
              "host": "quay.io"
            }
          }
        },
        "gitlab": {
          "active": true,
          "tekton": true,
          "jenkins": false,
          "host": "https://gitlab.com",
          "registriesConfig": {
            "quay": {
              "active": true,
              "host": "quay.io"
            }
          }
        },
        "pipeline": {
          "ocp": "4.14",
          "version": "1.0",
          "rhtpa": true,
          "github": true,
          "gitlab": true
        }
      }
    }
  },
  "reporters": [
    "default",
    "jest-junit",
    [
      "jest-html-reporters",
      {
        "publicPath": "./artifacts",
        "filename": "report.html",
        "openReport": true,
        "expand": true,
        "pageTitle": "Red Hat Trusted Application Pipeline e2e report"
      }
    ]
  ]
};