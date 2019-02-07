<template>
  <div v-if="artifacts !== undefined && artifacts !== null && artifacts.length>0">
    <md-button class="md-primary" @click="select('subartifact')">{{this.dictionary.subartifacts}}</md-button>
    <md-button class="md-primary" @click="select('artifact')">{{this.dictionary.artifacts}}</md-button>
    <div v-if="isSubartifact && isReady">
      <md-toolbar class="md-dense">
        <h1 class="md-title">{{this.dictionary.firstRating}}</h1>
      </md-toolbar>
      <div class="subartifact-table" v-for="artifact in artifacts" v-bind:key="artifact._id">
        <md-table v-model="artifact.subartifacts" md-sort="name" md-sort-order="asc" md-card>
          <md-table-toolbar>
            <h1 class="md-title">{{artifact.name}}</h1>

            <div class="md-title">
              <md-button @click="fillCharts('bar',artifact._id)" class="inline">
                <md-icon>bar_chart</md-icon>
              </md-button>
              <md-button @click="fillCharts('pie',artifact._id)" class="inline">
                <md-icon>pie_chart</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Название" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Рейтинг" md-sort-by="rate">{{ item.rate }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <div v-if="isArtifact && isReady">
      <md-toolbar class="md-dense" style="margin-bottom: 20px;">
        <h1 class="md-title">{{this.dictionary.secondRating}}</h1>
      </md-toolbar>

      <md-table v-model="artifacts" md-sort="name" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <div class="md-title">
            <md-button @click="fillCharts('bar',null)" class="inline">
              <md-icon>bar_chart</md-icon>
            </md-button>
            <md-button @click="fillCharts('pie',null)" class="inline">
              <md-icon>pie_chart</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Название" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Рейтинг" md-sort-by="rate">{{ item.rate }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <md-dialog :md-active.sync="isChart">
      <md-dialog-title>График</md-dialog-title>
      <md-dialog-content>
        <div class="chart">
          <div v-if="isPieChart">
            <ve-pie-chart class="chart1" :data="chart"/>
          </div>
          <div v-else>
            <ve-bar-chart class="chart1" :data="chart"/>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="isChart = false">Закрыть</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
  <div v-else>
    <h1>Нет элементов для того, чтобы составить рейтинг</h1>
    <h2>Пожалуйста, заполните все данные</h2>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  data: () => ({
    artifacts: undefined,
    isSubartifact: false,
    isArtifact: false,
    isChart: false,
    ifBarChart: false,
    isPieChart: false,
    isReady: false,
    bool: true,
    chart: undefined,
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getArtifacts()
    this.isArtifact = true
  },
  methods: {
    select (param) {
      this.isSubartifact = false
      this.isPoint = false
      this.isArtifact = false

      if (param === 'subartifact') {
        this.isSubartifact = !this.isSubartifact
      }
      if (param === 'artifact') {
        this.isArtifact = !this.isArtifact
      }
    },
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts

      this.artifacts.forEach(a => {
        a.rate = 0

        a.subartifacts.forEach(sa => {
          var rate = 0

          sa.notes.forEach(n => {
            rate += n.pointCount
          })

          sa.rate = rate
          a.rate += rate
        })

        a.subartifacts.sort(function (a, b) {
          return b.rate - a.rate
        })

        this.artifacts.sort(function (a, b) {
          return b.rate - a.rate
        })

        this.isReady = true
      })
    },
    fillCharts (param, artifactId) {
      var aChartData = []

      var tempArtifacts = []
      if (artifactId !== null) {
        tempArtifacts.push(this.artifacts.find(a => a._id === artifactId))
      } else {
        tempArtifacts = this.artifacts
      }

      tempArtifacts.forEach(artifact => {
        artifact.subartifacts.forEach(sa => {
          var dimensions = []
          var measures = []

          sa.notes.forEach(n => {
            dimensions.push(n.pointName)
            measures.push(n.pointCount)

            if (aChartData.find(a => a.name === n.pointName) === undefined) {
              var aDimensions = 0
              aDimensions += n.pointCount
              aChartData.push({
                name: n.pointName,
                dimension: aDimensions
              })
            } else {
              aChartData.find(a => a.name === n.pointName).dimension +=
                n.pointCount
            }
          })
        })
      })

      var chartDimensions = []
      var charMeasures = []

      aChartData.forEach(acd => {
        chartDimensions.push(acd.name)
        charMeasures.push(acd.dimension)
      })

      this.chart = {
        dimensions: {
          name: 'измерение',
          data: chartDimensions
        },
        measures: [
          {
            name: 'размер',
            data: charMeasures
          }
        ]
      }

      this.openChart(param)
    },
    openChart (param) {
      if (param === 'pie') {
        this.isPieChart = true
        this.isBarChart = false
      } else {
        this.isPieChart = false
        this.isBarChart = true
      }
      this.isChart = true
    }
  }
}
</script>
<style scoped>
.subartifact-table {
  margin-top: 15px;
}
.md-table-cell {
  text-align: left;
}
</style>
