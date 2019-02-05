<template>
  <div align="center" class="container">
    <md-field>
      <label>Название</label>
      <md-input v-model="name" placeholder="Название"></md-input>
    </md-field>
    <md-field v-if="artifacts.length > 0">
      <md-select
        v-model="artifactId"
        name="artifactId"
        id="artifactId"
        placeholder="Выберите элемент"
      >
        <md-option
          v-bind:key="artifact._id"
          v-for="artifact in artifacts"
          v-bind:value="artifact._id"
        >{{artifact.name}}</md-option>
      </md-select>
    </md-field>

    <div
      class="points-content"
      v-if="groups !== undefined && groups.length > 0 && notes !== undefined && notes.length > 0"
    >
      <md-card class="fill" v-for="group in groups" v-bind:key="group._id">
        <md-toolbar class="md-primary">
          <span class="white-color md-title">{{group.name}}</span>
        </md-toolbar>
        <div>
          <div v-for="note in notes" v-bind:key="note.pointId" class="inline element-content">
            <div v-if="note.pointGroupId === group._id">
              <h3>{{note.pointName}}</h3>
              <md-field>
                <label>{{note.pointCount}}</label>
                <md-input v-model="note.pointCount" placeholder="Соответствий"></md-input>
              </md-field>
              <md-field>
                <label>{{note.pointDescription}}</label>
                <md-input v-model="note.pointDescription" placeholder="Описание"></md-input>
              </md-field>
              <md-field>
                <label>{{note.pointUrl}}</label>
                <md-input v-model="note.pointUrl" placeholder="Источник"></md-input>
              </md-field>
            </div>
          </div>
        </div>
      </md-card>
    </div>
    <md-button class="md-raised md-primary" @click="addSubartifact" md-menu-trigger>Создать</md-button>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import GroupService from '@/services/GroupService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  data: () => ({
    name: '',
    artifacts: [],
    artifactId: '',
    notes: [],
    groups: [],
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getArtifacts()
    this.getGroups()
  },
  methods: {
    async addSubartifact () {
      if (this.artifactId !== '' && this.name !== '') {
        const response = await ArtifactService.getArtifact({
          id: this.artifactId
        })
        var artifact = response.data

        if (
          artifact.subartifacts === undefined ||
          artifact.subartifacts.length === 0
        ) {
          artifact.subartifacts = []
        }

        if (
          artifact.subartifacts.find(s => s.name === this.name) === undefined
        ) {
          artifact.subartifacts.push({
            name: this.name,
            notes: this.notes.filter(n => n.pointCount !== 0)
          })

          await ArtifactService.updateArtifact({
            id: artifact._id,
            name: artifact.name,
            subartifacts: artifact.subartifacts
          })

          this.$swal(
            this.dictionary.successTitle,
            this.dictionary.elementHasBeenAdded,
            this.dictionary.successOperation
          ).then(() => {
            this.navigateToSubartifacts()
          })
        } else {
          this.$swal(
            this.dictionary.infoTitle,
            this.dictionary.elementAlreadyExist,
            this.dictionary.infoOperation
          ).then(() => {
            this.navigateToSubartifacts()
          })
        }
      } else {
        this.$swal(
          this.dictionary.infoTitle,
          this.dictionary.allFieldsMustBeDefined,
          this.dictionary.infoOperation
        )
      }
    },
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts
    },
    async getGroups () {
      const response = await GroupService.fetchGroups()
      this.groups = response.data.groups

      if (this.notes.length === 0) {
        this.notes = []
      }

      this.groups.forEach(group => {
        group.points.forEach(point => {
          this.notes.push({
            pointId: point._id,
            pointGroupId: group._id,
            pointName: point.name,
            pointCount: null,
            pointDescription: null,
            pointUrl: null
          })
        })
      })
    },
    navigateToSubartifacts () {
      this.$router.push({ name: 'Subartifacts' })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-toolbar {
  margin-top: 5px;
}

.container {
  width: 100%;
}

.md-field {
  width: calc(100% - 15%);
}

.md-select {
  margin: auto;
}

.fill {
  display: block;
  margin: 15px;
  min-width: 45vw;
  flex-shrink: 0;
  flex-grow: 1;
}

.big-btn {
  width: 100px;
  min-height: 50px;
  font-size: 16px;
}

.element-content {
  margin: 5px;
  padding: 5px;
}

.white-color {
  color: white !important;
}
</style>