<template>
    <div class="form-ajout">
        <h2>Nouvelle Transaction</h2>
        <input v-model="transaction.description" placeholder="Description">

        <input v-model.number="transaction.montant" type="number" placeholder="Montant">

        <select v-model="transaction.type">
            <option value="revenu">Revenu</option>
            <option value="depense">Dépense</option>
        </select>

        <input v-model="transaction.date" type="date">

        <select v-model="transaction.categorie">
            <option disable value="">--Choisir une catégorie--</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <button @click="ajouter">Ajouter</button>
    </div>
</template>

<script>
export default {
    name: "AjoutTransaction",
    data() {
        return {
            transaction: {
                id: null,
                type: "revenu",
                montant: null,
                description: "",
                date: "",
                categorie: ""
            },
            categories: ["Nourriture", "Transport", "Bien-être", "Divertissement", "Imprévus", "Travail", "Université", "Santé", "Autre"]
        }
    },
    methods: {
        ajouter() {
            if (this.transaction.description && this.transaction.montant && this.transaction.date && this.transaction.categorie) {
                const nouvelleTransaction = {
                    ...this.transaction,
                    id: Date.now()
                }
                this.$emit("ajout-transaction", nouvelleTransaction);
                this.reinitialiserFormulaire();
            }else{
                alert("Veuillez remplir tous les champs");
                console.log(this.transaction);
            }
        },
        reinitialiserFormulaire() {
            this.transaction = {
                id: null,
                type: "revenu",
                montant: null,
                description: "",
                date: "",
                categorie: ""
            };
        }
    }
}
</script>

<style scoped>
.form-ajout {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}
</style>