<template>
    <div>
        <h2>Dépenses par catégorie</h2>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
    name: "GraphiqueDepense",
    components: { Bar },
    props: {
        transactions: Array
    },
    computed: {
        chartData() {
            const categories = {}
            this.transactions.forEach(t => {
                if (t.type === 'depense') {
                    categories[t.categorie] = (categories[t.categorie] || 0) + t.montant;
                }
            })

            return {
                labels: Object.keys(categories),
                datasets: [{
                    label: 'Montant dépensé',
                    backgroundColor: '#f87979',
                    data: Object.values(categories)
                }]
            }
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRation: false
            }
        }
    }
}

</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>