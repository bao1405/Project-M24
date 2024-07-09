const { spawn } = require('child_process');
const fs = require('fs');

const jsonServerProcess = spawn('json-server', ['--watch', 'db.json', '--port', '5000']);

console.log('JSON Server is running...');

// Watch for changes on db.json
fs.watch('db.json', (eventType, filename) => {
  if (eventType === 'change') {
    console.log('Detected change in db.json. Restarting JSON Server...');

    // Kill the existing JSON Server process
    jsonServerProcess.kill();

    // Start a new JSON Server process
    const newJsonServerProcess = spawn('json-server', ['--watch', 'db.json', '--port', '5000']);
    
    // Update the reference to the new process
    jsonServerProcess = newJsonServerProcess;

    console.log('JSON Server restarted.');
  }
});

// Handle process exit
process.on('exit', () => {
  // Kill the JSON Server process when the script exits
  jsonServerProcess.kill();
});
