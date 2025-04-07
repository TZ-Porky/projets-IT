<template>
    <h2>Liste des transactions</h2>
    <div class="transactions">
        <ul v-if="transactions.length">
            <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.type">
                <div class="details">
                    <span class="description">{{ transaction.description }}</span>
                    <span class="categorie">{{ transaction.categorie }}</span>
                    <span class="date">{{ transaction.date }}</span>
                </div>
                <div class="montant">
                    {{ transaction.type === 'revenu' ? ' +' : ' -' }}{{ transaction.montant }}FCFA
                </div>
                <button @click="$emit('supprimer', transaction.id)">X</button>
            </li>
        </ul>
        <p v-else>Aucune transaction enregistrée</p>
    </div>
</template>

<script>
export default {
    name: "ListerTransactions",
    props: {
        transactions: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.transactions {
    width: 100%;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 5px;
    border-bottom: 1px solid #ccc;
}

.revenu {
    color: green;
}

.dépense {
    color: red;
}

.details {
    display: flex;
    flex-direction: column;
}

.description {
    font-weight: bold;
}

.categorie {
    font-size: 0.85em;
    color: #555;
}

.date {
    font-size: 0.75em;
    color: #888;
}

.montant {
    font-size: 1.1em;
    margin-left: 10px;
}

button {
    margin-left: 10px;
}
</style>