        //run it in a server
        //var http = require('http');
        //var fs = require('fs');

        var express = require('express');
        var app = express();
        
        //var css = require('main.css')

       // function onRequest(request,response){


        //}

        app.use(express.static('public'));

        app.get('/', function(req, res){
            res.sendFile(__dirname + '/main.html');
        });

        app.listen(3000,function(){
            console.log('runing on port 3000');
        });

        


