const fs = require('fs');
const yaml = require('yaml');

// Read and parse the YAML config file
const configFile = fs.readFileSync('common-config.yaml', 'utf8');
const config = yaml.parse(configFile);

// Default configuration that is common across all generated files
const defaultConfig = {
  testEnvironment: './jest-environment-fail-fast.js',
  maxWorkers: 6,
  bail: false,
  testRunner: 'jest-circus/runner',
  verbose: true,
  globals: {
    suites: {
      softwareTemplates: {
        templates: [],
        priority: "",
        github: {
          active: "",
          host: 'https://api.github.com',
          registriesConfig: {
            quay: {
              active: true,
              host: 'quay.io'
            },
          },
        },
        gitlab: {
          active: "",
          host: 'https://gitlab.com',
          registriesConfig: {
            quay: {
              active: true,
              host: 'quay.io'
            },
          },
        },
        pipeline: {
          ocp: "",
          version: "",
          rhtpa: "",
          github: "",
          gitlab: "",
        },
      }
    }
  },
  reporters: [
    "default",
    "jest-junit",
    ["jest-html-reporters", {
      "publicPath": process.env.ARTIFACT_DIR || "./artifacts",
      "filename": "report.html",
      "openReport": true,
      "expand": true,
      "pageTitle": "Red Hat Trusted Application Pipeline e2e report",
    }],
  ]
};

// Generate jest.config.js files for each version
Object.keys(config).forEach(version => {
  const versionConfig = config[version];
  
  // Customize the templates and priority for each version
  const generatedConfig = {
    ...defaultConfig,
    globals: {
      suites: {
        softwareTemplates: {
          ...defaultConfig.globals.suites.softwareTemplates,
          github: {
            ...defaultConfig.globals.suites.softwareTemplates.github,
            active: versionConfig.installer.github
          },
          gitlab: {
            ...defaultConfig.globals.suites.softwareTemplates.gitlab,
            active: versionConfig.installer.gitlab
          },
          pipeline: {
            ...defaultConfig.globals.suites.softwareTemplates.pipeline,
            ocp: version,
            version: versionConfig.version,
            rhtpa: versionConfig.installer.rhtpa,
            github: versionConfig.installer.github,
            gitlab: versionConfig.installer.gitlab
          },
          templates: versionConfig.templates,
          priority: versionConfig.priority
        }
      }
    },
  };

  // Convert the config object to a JS module export format
  const configContent = `module.exports = ${JSON.stringify(generatedConfig, null, 2)};`;
  const configFileName = `jest.config.${version}.js`;

  // Check if the file exists and write the new config content, replacing if necessary
  if (fs.existsSync(configFileName)) {
    console.log(`Replacing existing ${configFileName}`);
  } else {
    console.log(`Creating new ${configFileName}`);
  }

  fs.writeFileSync(configFileName, configContent);
  console.log(`Generated ${configFileName}`);
});
