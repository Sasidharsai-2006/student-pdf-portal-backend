const http = require('http');

const testPath = (path) => {
  const options = {
    hostname: 'localhost',
    port: 5001,
    path: path,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    console.log(`PATH: ${path} | STATUS: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
};

testPath('/api/subjects');
testPath('/test');
testPath('/api/subjects/test');
