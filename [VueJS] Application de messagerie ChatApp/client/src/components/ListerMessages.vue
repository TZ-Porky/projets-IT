<template>
    <div v-if="this.messages.length !== 0">
        <div class="liste-messages">
            <div v-for="message in messages" :key="message.id"
            :class="['message', message.auteur === pseudo ? 'moi' : 'autre']">
            <div class="contenu">
                {{ message.contenu }}
                <button class="btn-supprimer" @click="$emit('supprimer-message', message.id)">X</button>
            </div>
            <div class="infos">
                <span class="auteur">{{ message.auteur }}</span>
                <span class="date">{{ formatDate(message.date) }}</span>
            </div>
        </div>
        </div>
    </div>
    <span v-else>Aucun message à afficher</span>
</template>

<script>
export default {
    name: "ListerMessage",
    props: {
        messages: {
            type: Array,
            required: true
        },
        pseudo: String,
    },
    methods: {
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleTimeString("fr-Fr", {
                hour: "2-digit",
                minute: "2-digit"
            });
        }
    }
}


</script>

<style>
.liste-messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 330px;
    overflow-y: auto;
    padding: 10px;
}
.message {
    max-width: 70%;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
}
.moi {
    background-color: #cefaac;
    align-self: flex-end;
}
.autre {
    background-color: #cac7c7;
    align-self: flex-start;
}
.infos {
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    margin-top: 5px;
    text-align: right;
    color: #555;
}
.btn-supprimer {
  background: transparent;
  border: none;
  color: red;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}
.btn-supprimer:hover {
  color: darkred;
}
p {
    color: #555;
}
</style>