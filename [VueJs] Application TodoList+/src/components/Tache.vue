<template>
    <li>
        <input type="checkbox" :checked="tache.termine" @change="mettreAJourTermine">
        <p :class="{ termine: tache.termine }">{{ tache.titre }}</p>
        <span>{{ tache.categorie }}</span>
        <button @click="$emit('supprimer', index)">X</button>
    </li>
</template>

<script>
// Tips:
// On utilise props pour recevoir les données (tache et index) depuis le parent.
// On utilise $emit('supprimer', index) pour envoyer un événement au parent (la liste des tâches).
export default {
    name: "TacheItem",
    props: ["tache", "index"],
    emits: ["supprimer"],
    methods: {
        mettreAJourTermine(event){
            this.$emit('maj-termine', { index: this.index, termine: event.target.checked });
        }
    }
};
</script>

 
<style scoped>
.termine{
  text-decoration: line-through;
  color: #e05151;
}
</style>