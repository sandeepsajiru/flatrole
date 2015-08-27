var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect('mongodb://localhost/flatrole');
var db = mongoose.connection;
db.on('error', function()
{
   console.log('db connection error');
});
db.once('open', function(){
   console.log('DB Connection Opened to FLATROLE');
});

var flatSchema = mongoose.Schema({flatNumber : String, memberShipPaid : Boolean});
var Flat = mongoose.model('Flat', flatSchema);
var flatDetails;

Flat.findOne().exec(function(err, flatDoc){
   flatDetails = flatDoc.flatNumber;

});
var app = express();
function compile(str, path)
{
    return stylus(str).set('filename', path);
}

app.set('views', __dirname+'/server/views');
app.set('view engine', 'jade');

app.use(stylus.middleware(
    {
        src:__dirname +'/public', compile:compile
    }
));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/partials/:path', function(req, res){
   res.render('partials/'+req.params.path);
});

app.get('*', function(req, res){
   res.render('index', {
    flatDetails : flatDetails
   });
});


app.listen(port, function(){
   console.log('Server started http://localhost:'+port);
});