<template>
  <div v-if="artifacts !== undefined && artifacts !== null && artifacts.length>0">
    <md-button class="md-primary" @click="select('subartifact')">Рейтинг среди элементов артефактов</md-button>
    <md-button class="md-primary" @click="select('point')">Рейтинг по критерию</md-button>
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
    <div v-if="isArtifact">Is Artifact</div>
    <div v-if="isPoint">Is Point</div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'

export default {
  data: () => ({
    artifacts: null,
    isSubartifact: false,
    isPoint: false,
    isArtifact: false
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
        a.subartifacts.forEach(sa => {
          var rate = 0

          var dimensions = []
          var measures = []

          sa.notes.forEach(n => {
            rate += n.pointCount
            dimensions.push(n.pointName)
            measures.push(n.pointCount)
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
        })
      })
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
