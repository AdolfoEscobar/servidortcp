const net = require('net');
const readline = require('readline');

const server = net.createServer((socket) => {
    console.log("Cliente conectado");

    // Almacenar el socket del cliente
    server.clients = server.clients || [];
    server.clients.push(socket);

    // Cuando el servidor recibe datos del cliente
    socket.on('data', (data) => {
        console.log(`Cliente: ${data}`);

        // Echo de los datos al cliente
        socket.write(`Servidor recibió: ${data}`);
    });

    // Cuando el cliente se desconecta
    socket.on('end', () => {
        console.log('Cliente desconectado');
        // Remover el socket del cliente desconectado
        server.clients.splice(server.clients.indexOf(socket), 1);
    });
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Servidor iniciado correctamente');

    // Crear una interfaz readline para leer desde la terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Escuchar el evento de línea para enviar datos al cliente
    rl.on('line', (input) => {
        if (server.clients && server.clients.length > 0) {
            server.clients.forEach((client) => {
                client.write(input + '\n');
            });
        } else {
            console.log("No hay clientes conectados");
        }
    });
});

