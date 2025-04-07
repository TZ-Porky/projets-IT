<template>

  <div class="container">
    <h1>Mini Agenda</h1>

    <input v-model="nouvelEvement.titre" placeholder="Entrer le titre de l'évènement">
    <input type="date" v-model="nouvelEvement.date">
    <button @click="ajouterEvenement">ajouter</button>

    <ul>
      <li v-for="(event, index) in evenementsTries" :key="index">
        {{ event.titre }} - {{ event.date }}
        <button @click="supprimerEvenement(index)">X</button>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data() {
    return {
      nouvelEvement: { titre: "", date: "" },
      evenements: []
    };
  },
  created() {
    this.chargerLocalStorage();
  },
  computed: {
    evenementsTries() {
      if (!this.evenements) return [];
      return [...this.evenements].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  },
  methods: {
    ajouterEvenement() {
      if (this.nouvelEvement.titre && this.nouvelEvement.date) {
        this.evenements.push({ ...this.nouvelEvement });
        this.nouvelEvement = { titre: "", date: "" };
        this.sauvegarderLocalStorage()
      }
    },
    supprimerEvenement(index) {
      if (confirm("Supprimer l'élément ?")) {
        this.evenements.splice(index, 1);
        this.sauvegarderLocalStorage();
      }
    },
    sauvegarderLocalStorage() {
      localStorage.setItem("evenements", JSON.stringify(this.evenements));
    },
    chargerLocalStorage() {
      const evenementsStockes = localStorage.getItem("evenements");
      if (evenementsStockes) {
        this.evenements = JSON.parse(evenementsStockes);
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

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
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

</style>
