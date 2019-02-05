<template>
  <div v-if="artifacts !== undefined && artifacts !== null && artifacts.length>0">
    <md-button class="md-primary" @click="select('subartifact')">{{this.dictionary.firstRating}}</md-button>
    <md-button class="md-primary" @click="select('artifact')">{{this.dictionary.secondRating}}</md-button>
    <div v-if="isSubartifact && isReady">
      <md-toolbar class="md-dense">
        <h1 class="md-title">Районный рейтинг</h1>
      </md-toolbar>
      <div
        v-for="artifact in artifacts.filter(a=>a.subartifacts !== undefined && a.subartifacts.length >0)"
        v-bind:key="artifact._id"
      >
        <div class="flex-container" v-if="artifact.subartifacts.length > 0">
          <div
            class="graph-element"
            v-for="(subartifact, index) in artifact.subartifacts"
            v-bind:key="subartifact._id"
          >
            <div class="graph-info">
              <md-list>
                <md-list-item class="list-title">
                  <md-icon>title</md-icon>
                  <span class="md-list-item-text">{{artifact.name}}</span>
                </md-list-item>
                <md-list-item>
                  <md-icon>sort</md-icon>
                  <span class="md-list-item-text">{{index + 1}}</span>
                </md-list-item>
                <md-list-item>
                  <md-icon>subtitles</md-icon>
                  <span class="md-list-item-text">{{subartifact.name}}</span>
                </md-list-item>
                <md-list-item v-if="subartifact.notes !== undefined && subartifact.notes.length >0">
                  <md-icon>star</md-icon>
                  <span class="md-list-item-text">{{subartifact.rate}}</span>
                </md-list-item>
              </md-list>
            </div>
            <div class="graph-content">
              <div class="pie-chart">
                <div v-if="subartifact.chartData !== undefined">
                  <ve-pie-chart :data="subartifact.chartData"/>
                </div>
              </div>
              <div class="bar-graph">
                <div v-if="subartifact.chartData !== undefined">
                  <ve-bar-chart :data="subartifact.chartData"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isArtifact && isReady">
      <md-toolbar class="md-dense" style="margin-bottom: 20px;">
        <h1 class="md-title">Областной рейтинг</h1>
      </md-toolbar>
      <div
        v-for="(artifact, index) in artifacts.filter(a=>a.subartifacts !== undefined && a.subartifacts.length >0)"
        v-bind:key="artifact._id"
      >
        <div
          class="flex-container"
          v-if="artifact.subartifacts !== undefined && artifact.subartifacts.length > 0"
        >
          <div class="graph-element">
            <div class="graph-info">
              <md-list>
                <md-list-item>
                  <md-icon>sort</md-icon>
                  <span class="md-list-item-text">{{index + 1}}</span>
                </md-list-item>
                <md-list-item>
                  <md-icon>subtitles</md-icon>
                  <span class="md-list-item-text">{{artifact.name}}</span>
                </md-list-item>
                <md-list-item>
                  <md-icon>star</md-icon>
                  <span class="md-list-item-text">{{artifact.rate}}</span>
                </md-list-item>
              </md-list>
            </div>
            <div class="graph-content">
              <div class="pie-chart">
                <div v-if="artifact.chartData !== undefined">
                  <ve-pie-chart :data="artifact.chartData"/>
                </div>
              </div>
              <div class="bar-graph">
                <div v-if="artifact.chartData !== undefined">
                  <ve-bar-chart :data="artifact.chartData"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    isPoint: false,
    isArtifact: false,
    isReady: false,
    bool: true,
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getArtifacts()
  },
  methods: {
    refresh () {
      this.Vue.$forceUpdate()
    },
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
      if (param === 'point') {
        this.isPoint = !this.isPoint
      }
    },
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts

      this.artifacts.forEach(a => {
        a.rate = 0
        var aChartData = []

        a.subartifacts.forEach(sa => {
          var rate = 0
          var dimensions = []
          var measures = []

          sa.notes.forEach(n => {
            rate += n.pointCount
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

          console.log(rate)
          sa.rate = rate
          sa.chartSwitcher = false
          sa.chartData = {
            dimensions: {
              name: 'измерение',
              data: dimensions
            },
            measures: [
              {
                name: 'размер',
                data: measures
              }
            ]
          }

          a.rate += rate
        })
        a.subartifacts.sort(function (a, b) {
          return b.rate - a.rate
        })
        var chartDimensions = []
        var charMeasures = []

        aChartData.forEach(acd => {
          chartDimensions.push(acd.name)
          charMeasures.push(acd.dimension)
        })
        a.chartData = {
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
      })

      this.artifacts.sort(function (a, b) {
        return b.rate - a.rate
      })

      this.isReady = true
    }
  }
}
</script>
