<template>
    <div class="envoyer-message">
        <input v-model="contenu" @keyup.enter="envoyer" placeholder="Ecris ton message..." @input="$emit('utilisateur-ecrit')">
        <button @click="envoyer">Envoyer</button>
    </div>
</template>

<script>
export default {
    name: "EnvoyerMessage",
    data() {
        return {
            contenu: "",
        };
    },
    methods: {
        envoyer(){
            if (!this.contenu.trim()) return;
            this.$emit("envoyer-message", this.contenu);
            this.contenu = "";
        },
    }
}
</script>

<style>
.envoyer-message {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 16px;
}
</style>