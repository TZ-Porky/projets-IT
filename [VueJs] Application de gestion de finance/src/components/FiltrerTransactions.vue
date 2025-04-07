<template>
    <h2>Filtrage</h2>
    <div class="filtres">

        <select v-model="filtre.type">
            <option value="">Tous les types</option>
            <option value="revenu">Revenus</option>
            <option value="depense">Dépenses</option>
        </select>

        <select v-model="filtre.categorie">
            <option value="">Toutes les categories</option>
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>

        <input type="date" v-model="filtre.dateDebut">
        <input type="date" v-model="filtre.dateFin">

        <button @click="resetFiltres">Réinitialiser les filtres</button>
    </div>
</template>

<script>
export default {
    name: "FiltrerTransactions",
    props: {
        transactions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            categories: ["Nourriture", "Transport", "Bien-être", "Divertissement", "Imprévus", "Travail", "Université", "Santé", "Autre"],
            filtre: {
                type: "",
                categorie: "",
                dateDebut: "",
                dateFin: ""
            }
        }
    },
    watch: {
        filtre: {
            handler() {
                const resultat = this.transactions.filter(tx => {
                    const matchType = this.filtre.type === "" || tx.type === this.filtre.type;
                    const matchCategorie = this.filtre.categorie === "" || tx.categorie === this.filtre.categorie;

                    const dateTx = new Date(tx.date);
                    const dateDebut = this.filtre.dateDebut ? new Date(this.filtre.dateDebut) : null;
                    const dateFin = this.filtre.dateFin ? new Date(this.filtre.dateFin) : null;

                    const matchDateDebut = !dateDebut || dateTx >= dateDebut;
                    const matchDateFin = !dateFin || dateTx <= dateFin;

                    return matchType && matchCategorie && matchDateDebut && matchDateFin;
                });

                this.$emit("filtrage", resultat);
            },
            deep: true
        }
    },
    methods: {
        resetFiltres() {
            this.filtre = {
                type: "",
                categorie: "",
                dateDebut: "",
                dateFin: ""
            }
        }
    }
}
</script>