<template>
  <div v-if="artifacts !== undefined && artifacts !== null && artifacts.length>0">
    <md-button class="md-primary" @click="select('subartifact')">Рейтинг среди элементов артефактов</md-button>
    <md-button class="md-primary" @click="select('artifact')">Рейтинг артефактов</md-button>
    <div v-if="isSubartifact">
      <h1>Рейтинг среди элементов внутри артефакта</h1>

      <div
        class="divTable"
        style="border: 1px solid #000;"
        v-for="artifact in artifacts"
        v-bind:key="artifact._id"
      >
        <div v-if="artifact.subartifacts.length > 0" class="divTableBody">
          <h2>{{artifact.name}}</h2>
          <div class="divTableRow">
            <div class="divTableCell">Позиция</div>
            <div class="divTableCell">Название элемента</div>
            <div class="divTableCell">Рейтинг</div>
            <div class="divTableCell">Круговой график</div>
            <div class="divTableCell">Столбчатый график</div>
          </div>
          <div
            v-for="(subartifact, index) in artifact.subartifacts"
            v-bind:key="subartifact._id"
            class="divTableRow"
          >
            <div class="divTableCell">{{index + 1}}</div>
            <div class="divTableCell">{{subartifact.name}}</div>
            <div
              class="divTableCell"
              v-if="subartifact.notes !== undefined && subartifact.notes.length >0"
            >{{subartifact.rate}}</div>
            <div v-if="subartifact.chartData !== undefined" class="divTableCell">
              <ve-pie-chart :data="subartifact.chartData"/>
            </div>
            <div v-if="subartifact.chartData !== undefined" class="divTableCell">
              <ve-bar-chart :data="subartifact.chartData"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isArtifact && isReady">
      <h1>Рейтинг среди артефактов</h1>
      <div
        class="divTable"
        style="border: 1px solid #000;"
        v-for="(artifact, index) in artifacts.filter(a=>a.subartifacts !== undefined && a.subartifacts.length >0)"
        v-bind:key="artifact._id"
      >
        <div
          v-if="artifact.subartifacts !== undefined && artifact.subartifacts.length > 0"
          class="divTableBody"
        >
          <div class="divTableRow">
            <div class="divTableCell">Позиция</div>
            <div class="divTableCell">Название</div>
            <div class="divTableCell">Рейтинг</div>
            <div class="divTableCell">Круговой график</div>
            <div class="divTableCell">Столбчатый график</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell">{{index + 1}}</div>
            <div class="divTableCell">{{artifact.name}}</div>
            <div class="divTableCell">{{artifact.rate}}</div>
            <div v-if="artifact.chartData !== undefined" class="divTableCell">
              <ve-pie-chart :data="artifact.chartData"/>
            </div>
            <div v-if="artifact.chartData !== undefined" class="divTableCell">
              <ve-bar-chart :data="artifact.chartData"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'

export default {
  data: () => ({
    artifacts: null,
    isSubartifact: false,
    isPoint: false,
    isArtifact: false,
    isReady: false
  }),
  mounted () {
    this.getArtifacts()
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

          sa.rate = rate

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

          a.subartifacts.sort(e => e.rate)
          a.rate += rate
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

        console.log(a.chartData)
      })

      this.artifacts.sort(a => a.rate)

      this.isReady = true
    }
  }
}
</script>
<style scoped>
.divTable {
  display: table;
  width: 100%;
}
.divTableRow {
  display: table-row;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  border: 1px solid #999999;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
.divTableBody {
  display: table-row-group;
}

.md-primary {
  background: #4d7ef7;
  color: #fff !important;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
