<template>
  <div class="artifacts">
    <h1>Редактировать артефакт</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="Название" v-model="name">
      </div>
      <div>
        <button class="app_artifact_btn" @click="updateArtifact">Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
export default {
  name: 'editartifact',
  data () {
    return {
      name: null
    }
  },
  mounted () {
    this.getArtifact()
  },
  methods: {
    async getArtifact () {
      const response = await ArtifactService.getArtifact({
        id: this.$route.params.id
      })
      this.name = response.data.name
      // this.$router.push({ name: 'Posts' })
    },
    async updateArtifact () {
      await ArtifactService.updateArtifact({
        id: this.$route.params.id,
        name: this.name
      })
      this.$swal('Великолепно!', `Ваш артефакт был обновлён!`, 'success')
      this.$router.push({ name: 'Artifacts' })
    }
  }
}
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_artifact_btn {
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
</style>

