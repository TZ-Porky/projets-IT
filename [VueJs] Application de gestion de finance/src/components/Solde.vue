<template>
    <div class="solde">
        <h2>Solde Total : {{ soldeTotal }}FCFA</h2>
        <p class="revenu">Revenus: + {{ totalRevenus }} FCFA</p>
        <p class="depense">Dépenses: - {{ totalDepenses }} FCFA</p>
    </div>
</template>

<script>
export default {
    name: "SoldeFinance",
    props: {
        transactions: {
            type: Array,
            required: true
        }
    },
    computed: {
        totalRevenus() {
            return this.transactions
                .filter(t => t.type === "revenu")
                .reduce((somme, t) => somme + t.montant, 0);
        },
        totalDepenses() {
            return this.transactions
                .filter(t => t.type === "depense")
                .reduce((somme, t) => somme + t.montant, 0);
        },
        soldeTotal() {
            return this.totalRevenus - this.totalDepenses;
        }
    }
}
</script>

<style scoped>
.solde {
    background-color: #f0f4f8;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.revenu {
    color: green;
}

.depense {
    color: red;
}
</style>