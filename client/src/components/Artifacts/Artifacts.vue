<template>
  <div class="points">
    <div class="points-content">
      <div v-if="artifacts.length > 0">
        <div class="pseudo-table">
          <md-card>
            <md-card-content v-for="artifact in artifacts" v-bind:key="artifact._id">
              <div>
                <div class="main-content inline">
                  <div class="content-line">{{ artifact.name }}</div>
                </div>

                <div class="options-content inline">
                  <div
                    @click="$router.push({ name: 'editartifact', params: { id: artifact._id } })"
                    class="inline"
                  >
                    <md-icon>create</md-icon>
                  </div>
                  <div @click="deleteArtifact(artifact._id)" class="inline">
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
      <md-button v-bind:to="{ name: 'addartifact' }" class="md-fab plus-button">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'artifacts',
  data: () => ({
    dictionary: AppTypeHelper,
    artifacts: []
  }),
  mounted () {
    this.getArtifacts()
  },
  methods: {
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts
    },
    async deleteArtifact (id) {
      ArtifactService.deleteArtifact(id)

      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenDeleted,
        this.dictionary.successOperation
      ).then(() => {
        this.$router.push({ name: 'Artifacts' })
        this.getArtifacts()
      })
    }
  }
}
</script>

<style type="text/css">
</style>
