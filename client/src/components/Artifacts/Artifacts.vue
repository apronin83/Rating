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
                  <div class="inline">
                    <router-link v-bind:to="{ name: 'editartifact', params: { id: artifact._id } }">
                      <md-icon>create</md-icon>
                    </router-link>
                  </div>
                  <div class="inline">
                    <a href="#" @click="deleteArtifact(artifact._id)">
                      <md-icon>delete</md-icon>
                    </a>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>

        <md-button v-bind:to="{ name: 'addartifact' }" class="md-fab plus-button">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'artifacts',
  data () {
    return {
      dictionary: AppTypeHelper,
      artifacts: []
    }
  },
  mounted () {
    this.getArtifacts()
  },
  methods: {
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts
    },
    async deleteArtifact (id) {
      const $this = this
      $this
        .$swal({
          title: `Вы уверены?`,
          text: 'Это действие отменить нельзя!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(function () {
          ArtifactService.deleteArtifact(id)
          $this.$router.go({
            path: '/artifacts'
          })
        })
    }
  }
}
</script>
<style type="text/css">
</style>
