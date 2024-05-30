const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Find all config files starting with 'jest.config' in the current directory
const configFiles = fs.readdirSync(__dirname).filter(file => file.startsWith('jest.config') && file.endsWith('.js'));

if (configFiles.length === 0) {
  console.error('No Jest config files found.');
  process.exit(1);
}

console.log(`found config file ${configFiles}`)

configFiles.forEach(config => {
  const configPath = path.join(__dirname, config);
  console.log(`Running Jest with config: ${configPath}`);
  execSync(`jest --config=${configPath}`, { stdio: 'inherit' });
});
