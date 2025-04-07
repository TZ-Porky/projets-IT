<template>

  <div class="bento-container">

    <div class="bento-top">
      <h2>Finance Tracker</h2>
    </div>
    
    <div class="bento-top-left">
      <AjouterTransaction @ajout-transaction="ajouterTransaction" />
      <FiltrerTransactions :transactions="transactions" @filtrage="transactionsAffichees = $event"/>
    </div>

    <div class="bento-bottom-left">
      <GraphiqueDepenses :transactions="transactions" />
    </div>
    
    <div class="bento-right">
      <ListerTransactions :transactions="transactionsAffichees" @supprimer="supprimerTransaction" />
    </div>

    <div class="bento-bottom">
      <SoldeFinance :transactions="transactions" />
    </div>

  </div>

</template>

<script>

import AjouterTransaction from './components/AjouterTransaction.vue';
import ListerTransactions from './components/ListerTransactions.vue';
import SoldeFinance from './components/Solde.vue';
import FiltrerTransactions from './components/FiltrerTransactions.vue';
import GraphiqueDepenses from './components/GraphiqueDepense.vue';

export default {
  components: {
    AjouterTransaction,
    ListerTransactions,
    SoldeFinance,
    GraphiqueDepenses,
    FiltrerTransactions
  },
  data() {
    return {
      transactions: [],
      transactionsAffichees: []
    }
  },
  mounted() {
    this.transactionsAffichees = this.transactions;
  },
  created() {
    this.chargerLocalStorage()
  },
  methods: {
    ajouterTransaction(tx) {
      this.transactions.push(tx);
      this.sauvegarderLocalStorage();
    },
    supprimerTransaction(id) {
      const index = this.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        this.transactions.splice(index, 1);
        this.sauvegarderLocalStorage();
      }
    },
    sauvegarderLocalStorage() {
      localStorage.setItem("FinanceAppTransactions", JSON.stringify(this.transactions));
    },
    chargerLocalStorage() {
      const transactionsEnregistrees = localStorage.getItem("FinanceAppTransactions");
      if (transactionsEnregistrees) {
        this.transactions = JSON.parse(transactionsEnregistrees);
      }
    }
  }
}
</script>

<style>
* {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.revenu {
  color: green;
}

.depense {
  color: red;
}

.bento-container{
  display: grid;
  grid-template-areas:
    "top top"
    "top-left right"
    "bottom-left right"
    "bottom bottom";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto 1fr auto;
  gap: 1rem;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

.bento-top {
  grid-area: top;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.bento-top-left {
  grid-area: top-left;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.bento-bottom-left {
  grid-area: bottom-left;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.bento-right {
  grid-area: right;
  background-color: #fff;
  padding: 1rem;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.bento-bottom {
  grid-area: bottom;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

input,
select {
  width: 95%;
  padding-block: 15px;
  padding-inline-start: 10px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
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
