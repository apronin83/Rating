<template>
  <div class="subartifacts">
    <h1>Редактирование</h1>
    <div v-if="artifact !== undefined && artifact !== null && subartifactName !== null && subartifactId !== null" class="form">
      <div>
        <input type="text" :name="subartifactName" placeholder="Название" v-model="subartifactName">
      </div>
      <div v-for="subartifact in artifact.subartifacts" v-bind:key="subartifact._id">
        <div v-if="subartifact._id === subartifactId">
          <div v-for="note in subartifact.notes" v-bind:key="note._id">
            <h3>{{note.pointName}}</h3>
            <div>
              <input
                type="text"
                name="noteCount"
                v-bind:to="{'placeholder' : note.pointCount}"
                v-model="note.pointCount"
              >
            </div>
            <div>
              <input
                type="text"
                name="noteDescription"
                v-bind:to="{'placeholder' : note.pointDescription}"
                v-model="note.pointDescription"
              >
            </div>
            <div>
              <input
                type="text"
                name="noteUrl"
                v-bind:to="{'placeholder' : note.pointUrl}"
                v-model="note.pointUrl"
              >
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="app_subartifact_btn" @click="updateSubartifact">Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'editsubartifact',
  data: () => ({
    subartifactName: null,
    subartifactId: null,
    artifact: null,
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getArtifact()
  },
  methods: {
    async getArtifact () {
      const response = await ArtifactService.getArtifact({
        id: this.$route.params.artifactId
      })
      this.artifact = response.data
      var subartifact = this.artifact.subartifacts.find(
        s => s._id === this.$route.params.id
      )
      this.subartifactId = this.$route.params.id
      this.subartifactName = subartifact.name
    },
    async updateSubartifact () {
      this.artifact.subartifacts.find(
        s => s._id === this.$route.params.id
      ).name = this.subartifactName

      await ArtifactService.updateArtifact({
        id: this.artifact._id,
        name: this.artifact.name,
        subartifacts: this.artifact.subartifacts
      })

      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenUpdated,
        this.dictionary.successOperation
      ).then(() => {
        this.$router.push({ name: 'Subartifacts' })
      })
    }
  }
}
</script>

<style type="text/css">
.form input,
.form textarea {
  display: inline-block;
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
  margin: 3px;
}
.form div {
  margin: auto;
}
.app_subartifact_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}

@media (max-width: 600px) {
  .form input,
  .form textarea {
    width: 80vw;
  }
  .app_subartifact_btn {
    background: #4d7ef7;
    color: #fff;
    width: 80vw;
  }
}
</style>