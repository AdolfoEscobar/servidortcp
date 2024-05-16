const net = require('net');

const client = new net.Socket();

client.connect(5000, '127.0.0.1', () => {
    console.log("Conexión exitosa");
});

client.on('close', () => {
    console.log("Conexión terminada");
});

client.on('data', (data) => {
    console.log(`INFO: ${data}`);
});
