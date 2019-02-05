<template>
  <div class="points">
    <div class="points-content">
      <div v-if="artifacts !== undefined && artifacts.length > 0" class="element">
        <div class="pseudo-table">
          <md-card v-for="artifact in artifacts" v-bind:key="artifact._id">
            <md-card-header>
              <div class="md-title">{{ artifact.name }}</div>
            </md-card-header>

            <md-card-content>
              <div v-for="subartifact in artifact.subartifacts" v-bind:key="subartifact._id">
                <div class="main-content inline">
                  <div class="content-line">{{ subartifact.name }}</div>
                </div>

                <div class="options-content inline">
                  <div
                    @click="$router.push({ name: 'editsubartifact', params: { id: subartifact._id, artifactId : artifact._id } })"
                    class="inline"
                  >
                    <md-icon>create</md-icon>
                  </div>
                  <div @click="deleteSubartifact(subartifact._id, artifact._id)" class="inline">
                    <md-icon>delete</md-icon>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div v-else>
        <h2>На данной странице нет элементов, нажмите на кнопку добавить в правом нижнем углу</h2>
      </div>
      <md-button v-bind:to="{ name: 'addsubartifact' }" class="md-fab plus-button">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'subartifacts',
  data: () => ({
    artifacts: [],
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getArtifacts()
  },
  methods: {
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts
    },
    async deleteSubartifact (subartifactId, artifactId) {
      const response = await ArtifactService.getArtifact({
        id: artifactId
      })
      var artifact = response.data

      const index = artifact.subartifacts
        .map(function (e) {
          return e._id
        })
        .indexOf(subartifactId)
      if (index !== -1) {
        artifact.subartifacts.splice(index, 1)
      }

      await ArtifactService.updateArtifact({
        id: artifact._id,
        name: artifact.name,
        subartifacts: artifact.subartifacts
      })

      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenDeleted,
        this.dictionary.successOperation
      ).then(() => {
        this.$router.push({ name: 'Subartifacts' })
        this.getArtifacts()
      })
    }
  }
}
</script>