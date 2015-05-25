var express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
;

server.listen(8333);
app.use(express.static(__dirname)/* + '/src'*/);

console.log('Server is running under localhost:8333 ...');