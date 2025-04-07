<template>
  <div class="container">
    <h1>Gestionnaire de notes (pense-bêtes)</h1>
    
    <p>Recherche :</p>
    <input v-model="recherche" placeholder="Rechercher une note...">

    <div>
      <p>Informations de la note :</p>
      <input v-model="nouvelleNote.titre" placeholder="Titre de la note">
      <textarea v-model="nouvelleNote.contenu" placeholder="Contenu de la note"></textarea>
    </div>
    
    <p>Personnalisation :</p>
    <div class="color-picker">
      <label for="color">Couleur: </label>
      <input type="color" id="color" v-model="nouvelleNote.couleur">
    </div>

    <button v-if="indexModification === null" @click="ajouterNote">Ajouter</button>
    <button v-else @click="sauvegarderNote">Sauvegarder</button>

    <ul>
      <li v-for="(note, index) in notesFiltrees" :key="index" :style="{backgroundColor: note.couleur}">
        <h3>{{ note.titre }}</h3>
        <p>{{ note.contenu }}</p>
        <p class="note-date">{{ note.date }}</p>
        <button @click="preparerModification(index)">Modifier</button>
        <button @click="confirmerSuppression(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nouvelleNote: { titre: "", contenu: ""},
      notes: [],
      indexModification: null
    };
  },
  created() {
    this.chargerNotes();
  },
  computed: {
    notesFiltrees(){
      if (!this.recherche) return this.notes;
      return this.notes.filter(note => 
        note.titre.toLowerCase().includes(this.recherche.toLowerCase()) ||
        note.contenu.toLowerCase().includes(this.recherche.toLowerCase())
      );
    }
  },
  methods: {
    ajouterNote(){
      if (this.nouvelleNote.titre.trim() && this.nouvelleNote.contenu.trim()){
        const dateActuelle = new Date().toLocaleDateString();
        this.notes.push({
          ...this.nouvelleNote, 
          date: dateActuelle, 
          couleur: this.nouvelleNote.couleur || "#fffff"
        });
      }
      this.nouvelleNote = { titre: "", contenu: ""};
      this.sauvegarderDansLocalStorage();
    },
    preparerModification(index){
      this.nouvelleNote = {...this.notes[index]};
      this.indexModification = index;
    },
    sauvegarderNote(){
      if (this.nouvelleNote.titre.trim() && this.nouvelleNote.contenu.trim()){
        this.notes[this.indexModification] = {
          ...this.nouvelleNote,
          date: this.notes[this.indexModification].dateActuelle
      };
        this.nouvelleNote = { titre: "", contenu: ""};
        this.indexModification = null;
        this.sauvegarderDansLocalStorage();
      }
    },
    confirmerSuppression(index){
      if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
        this.supprimerNote(index);
      }
    },
    supprimerNote(index){
      this.notes.splice(index, 1);
      this.sauvegarderDansLocalStorage();
    },
    sauvegarderDansLocalStorage() {
      localStorage.setItem("notes", JSON.stringify(this.notes))
    },
    chargerNotes(){
      const notesStockees = localStorage.getItem("notes");
      if (notesStockees) {
        this.notes = JSON.parse(notesStockees);
      }
    }
  }
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.container {
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="color"] {
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background: none;
}

textarea {
  resize: none;
  height: 80px;
}

button {
  background: #6e8efb;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

button:hover {
  background: #5a7ee3;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
}

li {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h3 {
  margin-bottom: 5px;
  color: #333;
}

p {
  color: #555;
}

/* Boutons dans les cartes */
li button {
  background: #ff6b6b;
  margin-left: 5px;
}

li button:hover {
  background: #e05151;
}
</style>

