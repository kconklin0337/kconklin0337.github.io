var express = require('express'),
    logger = require('morgan')('dev'),
    server = express();


//Static Ass like HTML, JS, and CSS
server.use(express.static(__dirname+'/'));
//Setup Logging
server.use(logger);
server.set('port', process.env.PORT || 8080);


server.get('/', function(req, res){
  res.sendFile('/index.html', {root:__dirname})
});

server.listen(server.get('port'), listenCallback);

server.listen(8080, function(){
  console.log("May the Force Be With You...");
});
