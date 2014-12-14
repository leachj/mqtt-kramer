var net = require('net');
var mqtt = require('mqtt')

mqttClient = mqtt.createClient(1883, 'localhost');

var HOST = '192.168.1.39'; 
var PORT = 5000;
 

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 

  mqttClient.subscribe('kramer-control');

        mqttClient.on('message', function (topic, message) {
                console.log(message);
                var output = message.split(" ")[0];
                var input = message.split(" ")[1];
                console.log("setting "+output+" to "+input);


    		var byteBuffer = new Buffer("01"+getHex(input)+getHex(output)+"81", 'hex');
    		client.write(byteBuffer);    

        });
});

function getHex(num){

	if(num == "1"){
		return "81"
	}
	if(num == "2"){
		return "82"
	}
	if(num == "3"){
		return "83"
	}
	if(num == "4"){
		return "84"
	}
}


