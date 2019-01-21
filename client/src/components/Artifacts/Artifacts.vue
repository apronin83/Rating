<template>
  <div class="points">
    <div>
     <md-toolbar :md-elevation="1">
        <span class="md-title">Артефакты</span><div>        
      </div>
       <md-button v-bind:to="{ name: 'addartifact' }" class="md-raised md-primary">Добавить артефакт</md-button>
      </md-toolbar>
    </div>
    <div class="points-content">
      
      <div v-if="artifacts.length > 0">
        <div class="pseudo-table">
           <md-card>
      <md-card-content v-for="artifact in artifacts" v-bind:key="artifact._id">
        <div>
          <div class="main-content inline">
            <div class="content-line">
              {{ artifact.name }}
            </div>
          </div>
      
          <div class="options-content inline">
            <div class="inline">
            <router-link v-bind:to="{ name: 'editartifact', params: { id: artifact._id } }"><md-icon>create</md-icon></router-link>
            </div>
            <div class="inline">
            <a href="#" @click="deleteArtifact(artifact._id)"><md-icon>delete</md-icon></a>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
        </div>
      </div>
      <md-empty-state v-else
      md-icon="devices_other"
      md-label="Создайте артефакт"
      md-description="Тут описание нужности артефакта">
       <md-button v-bind:to="{ name: 'addartifact' }" class="md-raised md-primary">Добавить фртефакт</md-button>
    </md-empty-state>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
export default {
  name: 'artifacts',
  data () {
    return {
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
          title: 'Вы серьёзно?',
          text: 'Это действие отменить нельзя!',
          type: 'warning',
          showCancelButton: true,
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
