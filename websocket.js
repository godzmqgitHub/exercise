let http = require('http');
let io = require('socket.io');

let server = http.createServer();
server.listen('8011', function() {
    console.log('server start');
});

let wsServer = io.listen(server);

wsServer.on('connection', function(sock){
    sock.on('/login', function (info1, info2) {
        console.log('接受到' + info1 + '   ' +  info2);
        sock.emit('/send', 'li', Math.random());
    });
    
})