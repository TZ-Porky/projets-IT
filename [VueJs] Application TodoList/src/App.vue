<template>
  <div class="container">
    <h1>Todolist</h1>

    <input v-model="nouvelleTache" @keyup.enter="ajouterTache" placeholder="Ajouter une nouvelle tâche..." class="textInput"/>
    
    <button v-if="indexModification === null" @click="ajouterTache">Ajouter</button>
    <button v-else @click="sauvegarderTache">Sauvegarder</button>

    <ul>
      <li v-for="(tache, index) in taches" :key="index">
        <input type="checkbox" v-model="tache.termine" @change="sauvegarderDansLocalStorage">
        <span :class="{ termine: tache.termine}"> {{ tache.nom }} </span>
        <button @click="confirmerSuppression(index)"> Supprimer </button>
        <button @click="preparerModification(index)"> Modifier </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nouvelleTache: "",
      taches: [],
      indexModification: null
    };
  },
  created() {
    this.chargerTaches();
  },
  methods: {
    ajouterTache(){
      if (this.nouvelleTache.trim() !== "") {
        this.taches.push({nom: this.nouvelleTache, termine: false});
        this.nouvelleTache = "";
        this.sauvegarderDansLocalStorage();
      }
    },
    confirmerSuppression(index){
      if (confirm("Voulez-vous vraiment supprimer cette tâche ?")){
        this.supprimerTache(index);
      }
    },
    supprimerTache(index) {
      this.taches.splice(index, 1);
      this.indexModification = null;
      this.sauvegarderDansLocalStorage();
    },
    preparerModification(index) {
      this.nouvelleTache = this.taches[index].nom;
      this.indexModification = index;
    },
    sauvegarderTache(){
      if (this.nouvelleTache.trim() !== "") {
        this.taches[this.indexModification].nom = this.nouvelleTache;
        this.nouvelleTache = "";
        this.indexModification = null;
        this.sauvegarderDansLocalStorage();
      }
    },
    sauvegarderDansLocalStorage(){
      localStorage.setItem("taches", JSON.stringify(this.taches));
    },
    chargerTaches(){
      const tachesStockees = localStorage.getItem("taches");
      if (tachesStockees) {
        this.taches = JSON.parse(tachesStockees);
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

.termine{
  text-decoration: line-through;
  color: #e05151;
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
