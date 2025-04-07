const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Gestion de la connexion
io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté');

    // Envoi de message
    socket.on('envoyer-message', (message) => {
        console.log('Message reçu :', message);
        io.emit('recevoir-message', message); // Envoi le message à tous les utilisateurs
    });

    // Signale qu'un utilisateur est entrain d'écrire
    socket.on("utilisateur-ecrit", (pseudo) => {
        console.log(`${pseudo} est entrain d'écrire...`);
        socket.broadcast.emit("utilisateur-entrain-ecrire", pseudo);
    })

    // Déconnexion
    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté");
    })
});

// Démarre le serveur
const PORT = 3000
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur en ligne sur http://localhost:${PORT}`);
})