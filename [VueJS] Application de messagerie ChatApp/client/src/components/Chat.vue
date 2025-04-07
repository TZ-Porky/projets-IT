<template>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">

    <div class="chat-container">
        <h2>Chatting (Mini chat Application)</h2>
        <div v-if="!pseudoValide" style="display: flex; gap: 10px;">
            <label for="utilisateur">Utilisateur: </label>
            <input v-model="pseudoTemp" placeholder="Entrer votre pseudo ici..." style="flex: 1; padding: 8px;">
            <button @click="validerPseudo">Valider</button>
        </div>
        <div v-else>
            <p><strong>Utilisateur: </strong> {{ pseudo }}</p>
        </div>
        <div>
            <input type="checkbox" v-model="IAactive">
            <label for="IA">Activer l'IA pour répondre automatiquement. </label>
        </div>
        <ListerMessages :messages="messages" @supprimer-message="supprimerMessage" :pseudo="pseudo" />
        <p v-if="this.typing" class="typing">{{ this.utilisateurActuel }} est en train d'écrire...</p>
        <EnvoyerMessage @envoyer-message="ajouterMessage" @utilisateur-ecrit="notifierEcriture" />
    </div>
</template>

<script>
import EnvoyerMessage from './EnvoyerMessage.vue';
import ListerMessages from './ListerMessages.vue';
import { io } from 'socket.io-client';

export default {
    name: 'ChatApp',
    components: {
        EnvoyerMessage,
        ListerMessages
    },
    data() {
        return {
            IAactive: false,
            socket: null,
            messages: [],
            // Nom de l'utilisateur actuel
            pseudo: "",
            pseudoTemp: "",
            pseudoValide: false,
            // Détermine si un utilisateur est entrain de décrire
            typing: false,
            typingTimeout: null,
            // Faux utilisateurs
            utilisateursFictifs: ["Alice"],
            // Identifie l'utilisateur qui est entrain d'écrire
            utilisateurActuel: null,
            // Messages utilisés pour simuler une conversation aléatoire
            messagesSimules: [
                "Salut",
                "Comment ça va ?",
                "Je vais bien et toi ?",
                "Ah bon ?",
                "Pourquoi ?",
                "Sérieux ?",
                "Comment ?",
                "Salope",
                "Mdr",
                "On se parle plus tard",
                "Bonne journée !"
            ]
        }
    },
    mounted() {
        this.socket = io("http://localhost:3000");
        window.socket = this.socket;
        this.socket.on('recevoir-message', (message) => {
            this.messages.push(message);
        })
        this.socket.on("utilisateur-entrain-ecrire", (pseudo) => {
            console.log("Ce pseudo veut écrire !");
            this.utilisateurActuel = pseudo;
            this.typing = true;

            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
                this.typing = false;
                this.utilisateurActuel = null;
            }, 5000);
        })
        this.chargerDepuisLocalStorage();
    },
    methods: {
        notifierEcriture() {
            console.log("Je tape un message...");
            this.socket.emit("utilisateur-ecrit", this.pseudo);
        },
        ajouterMessage(Contenu) {
            if (this.pseudo.trim() != '') {
                const message = {
                    id: Date.now(),
                    auteur: this.pseudo,
                    contenu: Contenu,
                    date: new Date().toISOString()
                };
                this.socket.emit('envoyer-message', message);
                this.sauvergarderDansLocalStorage();

                if (this.IAactive) {
                    this.simulerResponse(Contenu);
                }
            } else {
                alert("Veuillez d'abord entrer un pseudo.");
            }
        },
        // Répond à un message de l'utilisateur de manière intelligente
        simulerResponse(messageUtilisateur) {
            const auteur = this.utilisateursFictifs[Math.floor(Math.random() * this.utilisateursFictifs.length)];
            this.utilisateurActuel = auteur;
            this.typing = true;

            setTimeout(() => {
                const reponse = this.genererReponse(messageUtilisateur);

                const message = {
                    id: Date.now(),
                    auteur: auteur,
                    contenu: reponse,
                    date: new Date().toISOString()
                };
                this.messages.push(message);
                this.typing = false;
                this.utilisateurActuel = null;
                this.sauvergarderDansLocalStorage();
            }, 2000)
        },
        // Génére une réponse approprié au message reçu (A améliorer)
        genererReponse(message) {
            const texte = message.toLowerCase();
            if (texte.includes("bonjour") || texte.includes("salut") || texte.includes("yo")) return "Salut !";
            if (texte.includes("ca va ?") || texte.includes("comment tu vas") || texte.includes("comment ça va"))
                return "Je vais bien et toi ?";
            if (texte.includes("bien") || texte.includes("super") || texte.includes("ça va"))
                return "Super! En quoi puis-je t'être utile ?";
            if (texte.includes("ton nom") || texte.includes("comment tu t'appelles"))
                return ("Je m'appelle " + this.utilisateurActuel);
            if (texte.includes("m'aider") || texte.includes("aide-moi") || texte.includes("Tu peux") || texte.includes("Peux-tu"))
                return ("Je ne suis qu'un assistant fictif pour l'instant, je ne peux encore vous aider. Désolé.")
            if (texte.includes("c'est bon") || texte.includes("c'est ok"))
                return ("Oui. Parfaitement.");
            if (texte.includes("merde") || texte.includes("mince"))
                return ("Vraiment désolé de ne pas pouvoir aider plus.");
            if (texte.includes("un instant") || texte.includes("attends"))
                return ("D'accord.");

            return ("Désolé, je ne comprends pas cela encore cela ")
        },
        // Envoi des messages aléatoires dans un intervalle de temps pour simuler une conversation
        lancerSimulation() {
            setInterval(() => {
                const auteur = this.utilisateursFictifs[
                    Math.floor(Math.random() * this.utilisateursFictifs.length)
                ];
                const contenu = this.messagesSimules[
                    Math.floor(Math.random() * this.messagesSimules.length)
                ];
                const message = {
                    id: Date.now(),
                    auteur: auteur,
                    contenu: contenu,
                    date: new Date().toISOString()
                };
                this.messages.push(message);
                this.sauvergarderDansLocalStorage();
            }, 7000);
        },
        supprimerMessage(id) {
            this.messages = this.messages.filter(m => m.id !== id);
            this.sauvergarderDansLocalStorage();
        },
        sauvergarderDansLocalStorage() {
            localStorage.setItem("chatMessages", JSON.stringify(this.messages));
        },
        chargerDepuisLocalStorage() {
            const messagesSauvegardes = localStorage.getItem("chatMessages");
            if (messagesSauvegardes) {
                this.messages = JSON.parse(messagesSauvegardes);
            }
        },
        validerPseudo() {
            if (this.pseudoTemp.trim() !== "") {
                this.pseudo = this.pseudoTemp.trim();
                this.pseudoValide = true;
                this.socket.emit("nouvel-utilisateur", this.pseudo);
            }
        }
    }
}
</script>

<style>
body {
    font-family: 'Quicksand', sans-serif;
}

.chat-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
}

.typing {
    font-size: 11px;
    font-style: italic;
    color: #666;
    margin-left: 10px;
}
</style>