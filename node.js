var express = require('express');
var app = express();
app.use(express.static('./'));
app.get('/1.txt', function (req, res) {
    res.send('Hello World');
    console.log('1.txt...succ');
});
app.get('*', function (req, res) {
    res.send('Hello World');
    console.log('succ');
})
app.listen(8888, function(){
    console.log('Server running at 8888');
});
 

