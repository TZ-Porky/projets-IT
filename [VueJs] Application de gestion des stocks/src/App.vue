<template>
  <div class="container">
    <h1> Mini Shop App</h1>
    <div v-for="produit in produits" :key="produit.id" style="display: flex; flex-direction: column;">
      <h3>{{ produit.nom }} - {{ produit.prix }}$</h3>
      <button @click="ajouterAuPanier(produit)">Ajouter</button>
    </div>

    <h2>Panier</h2>
    <ul style="display: flex; flex-direction: column; list-style: none;">
      <li v-for="(article, index) in panier" :key="index" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
        <span>{{ article.nom }} - {{ article.prix }}$</span>
        <button @click="supprimerDuPanier(index)">X</button>
      </li>
    </ul>

    <h3>Total: {{ totalPanier }}$</h3>
  </div>

</template>

<script>
export default {
  data() {
    return {
      produits: [
        { id: 1, nom: "T-Shirts", prix: 20 },
        { id: 2, nom: "Casquette", prix: 30 },
        { id: 3, nom: "Chaussures", prix: 40 }
      ],
      panier: []
    }
  },
  created(){
    //localStorage.clear()
    this.chargerPanier();
  },
  methods: {
    ajouterAuPanier(produit) {
      this.panier.push(produit);
      localStorage.setItem("panier", JSON.stringify(this.panier));
    },
    supprimerDuPanier(index) {
      if (confirm("Retirer cet article du panier ?")) {
        this.panier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(this.panier));
      }
    },
    chargerPanier(){
      const panierStocke = localStorage.getItem("panier");
      if (panierStocke) {
        this.panier = JSON.parse(panierStocke);
      }
    }
  },
  computed: {
    totalPanier() {
      return this.panier.reduce((total, article) => total + article.prix, 0);
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
  width: 300px;
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
</style>
