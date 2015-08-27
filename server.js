var express = require('express');

var port = 3000;

var app = express();

app.set('views', __dirname+'/server/views');
app.set('view engine', 'jade');

app.get('*', function(req, res){
   res.send('Hello Node');
});


app.listen(port, function(){
   console.log('Server started http://localhost:'+port);
});