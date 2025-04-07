<template>
  <div class="container">
    <h1>My TodoList</h1>

    <input v-model="recherche" placeholder="Rechercher vos projets ici" class="textInput">
    <input v-model="nouvelleTache" @keyup.enter="ajouterTache" placeholder="Entrer une nouvelle tâche"
      class="textInput">

    <select v-model="categorie">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>

    <button @click="ajouterTache">Ajouter</button>

    <ul>
      <TacheItem v-for="(tache, index) in tachesFiltrees" :key="index" :tache="tache" :index="index"
        @supprimer="preparerSuppression" @maj-termine="mettreAJourTermine"/>
    </ul>

  </div>
</template>

<script>
import TacheItem from './components/Tache.vue';

export default {
  components: { TacheItem },
  data() {
    return {
      nouvelleTache: "",
      recherche: "",
      categorie: "Travail",
      categories: ["Travail", "Personnel", "Autre"],
      taches: []
    };
  },
  created() {
    //localStorage.clear();
    this.chargerTache();
  },
  computed: {
    tachesFiltrees() {
      if (!this.recherche) return this.taches;
      return this.taches.filter(tache => tache.titre.toLowerCase().includes(this.recherche.toLowerCase()));
    }
  },
  methods: {
    ajouterTache() {
      if (this.nouvelleTache.trim() !== "") {
        this.taches.push({ titre: this.nouvelleTache, categorie: this.categorie, termine: false });
        this.nouvelleTache = "";
        this.sauvegarderLocalStorage();
      }
      else {
        alert("Veuillez remplir le champ.");
      }
    },
    preparerSuppression(index) {
      if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
        this.supprimerTache(index);
      }
    },
    supprimerTache(index) {
      this.taches.splice(index, 1);
      this.sauvegarderLocalStorage();
    },
    mettreAJourTermine({ index, termine }){
      this.taches[index].termine = termine;
      this.sauvegarderLocalStorage();
    },
    sauvegarderLocalStorage() {
      localStorage.setItem("todolistAdvancedTaches", JSON.stringify(this.taches));
    },
    chargerTache() {
      const tachesStockees = localStorage.getItem("todolistAdvancedTaches");
      if (tachesStockees) {
        this.taches = JSON.parse(tachesStockees);
      }
    }
  }
}
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

.textInput,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.tacheBox {
  width: 15px;
  margin: 0;
  border: 1px solid #333;
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
  border: 1px solid #b6b6b6;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1px;
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

span {
  color: #555;
}

li button {
  background: #ff6b6b;
  margin-left: 5px;
}

li button:hover {
  background: #e05151;
}
</style>
