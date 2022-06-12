<template>
  <div class="home">
    <h1>SupplyProbe-Canary-3</h1>
    <Bar
      :chart-data="data"
      chart-id="supplyProbe"
      :dataset-id-key="'label'"
      :chart-options="options"
      :height="250"
      css-classes="chart-container"
    />
    <div v-if="selectedElement.selected">
      <h2>Detail: {{ selectedKeyword }}</h2>
      {{ selectedStart.toLocaleString() }} ~ {{ selectedEnd.toLocaleString() }}
      <table v-if="articles.length" class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Emotion</th>
          <th scope="col">Time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles" :key="article.id">
          <th scope="row">{{ article.id }}</th>
          <td><a :href="article.url">{{ article.title }}</a></td>
          <td>{{ article.emotional_value }}</td>
          <td>{{ article.time }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script async setup>
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale
} from 'chart.js'
import Api from '@/api'
import { color } from '@/utils/color'
ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, LineController, CategoryScale, LinearScale)
const api = new Api()

const statistics = ref([])
statistics.value = (await api.getWeeklyStatistics(10)).data

const selectedElement = ref({
  selected: false,
  datasetIndex: 0,
  index: 0
})

const selectedKeyword = computed(() => {
  if (selectedElement.value.selected) {
    return statistics.value[selectedElement.value.datasetIndex].keyword
  }
  return ''
})

const selectedStart = computed(() => {
  if (selectedElement.value.selected) {
    return new Date(statistics.value[selectedElement.value.datasetIndex].data[selectedElement.value.index].start_at)
  }
  return ''
})

const selectedEnd = computed(() => {
  if (selectedElement.value.selected) {
    const dt = new Date(statistics.value[selectedElement.value.datasetIndex].data[selectedElement.value.index].start_at)
    dt.setDate(dt.getDate() + 7)
    return dt
  }
  return ''
})

const articles = ref([])

const options = ref({
  interaction: {
    mode: 'nearest'
  },
  maintainAspectRatio: false,
  onClick: async (e, elems) => {
    if (elems.length > 0 && (elems[0].element instanceof PointElement || elems[0].element instanceof BarElement)) {
      selectedElement.value.selected = true
      selectedElement.value.datasetIndex = elems[0].datasetIndex % statistics.value.length
      selectedElement.value.index = elems[0].index
      await loadArticles()
    }
  },
  scales: {
    emotion: {
      type: 'linear',
      display: true,
      position: 'left'
    },
    count: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false // only want the grid lines for one axis to show up
      }
    }
  }
})

const data = computed(() => {
  const empty = statistics.value.length === 0
  const labels = empty ? [] : statistics.value[0].data.map(o => o.start_at)
  let datasets = []
  if (!empty) {
    datasets = datasets.concat(statistics.value.map((o, index) => ({
      type: 'line',
      label: o.keyword + ' - 情緒',
      data: o.data.map(i => i.value_avg),
      fill: false,
      borderColor: color(index),
      tension: 0.1,
      yAxisID: 'emotion'
    })))
    datasets = datasets.concat(statistics.value.map((o, index) => ({
      label: o.keyword + ' - 聲量',
      data: o.data.map(i => i.count),
      fill: false,
      borderColor: color(index),
      backgroundColor: color(index, 0.5),
      tension: 0.1,
      yAxisID: 'count'
    })))
  }

  return {
    labels: labels,
    datasets: datasets
  }
})

async function loadArticles () {
  articles.value = (await api.getArticles(selectedKeyword.value, selectedStart.value.toISOString(), selectedEnd.value.toISOString())).data
}

</script>

<style scoped>
.chart-container {
  position: relative;
  height:80vh;
  width:90vw;
  margin: auto;
}
</style>
