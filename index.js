var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var contador = 0;

app.get('/',function(req,res){
	//console.log(req.headers);
	res.sendFile(__dirname + '/content/index.html');
});

io.on('connection',function(socket){
	contador++;
	console.log(contador + ' - User connected...');

	socket.on('chat message',function(msg){
		console.log('Message : ' + msg);
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect',function(){
		console.log ('...User disconnected...');
		contador--;
		console.log(contador + ' - User connected...');
	});
	
	
});


http.listen(3000,function(){
	console.log('Listening on *:3000');
});