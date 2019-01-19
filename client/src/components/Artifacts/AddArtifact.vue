<template>
  <div align="center">
    <md-toolbar class="md-transparent md-dense">
      <md-menu md-size="auto">
        <md-field>
          <label>Название</label>
          <md-input v-model="name" placeholder="Название"></md-input>
        </md-field>
      </md-menu>

      <md-menu md-size="auto">
        <md-button class="md-primary" @click="addArtifact" md-menu-trigger>Создать</md-button>
      </md-menu>
    </md-toolbar>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
export default {
  data: () => ({
    name: ''
  }),
  methods: {
    async addArtifact () {
      await ArtifactService.addArtifact({
        name: this.name
      })
      this.$swal('Великолепно!', `Ваш артефакт был добавлен!`, 'success')
      this.$router.push({ name: 'Artifacts' })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-toolbar {
  margin-top: 5px;
}

.md-field {
  max-width: 20vw;
}

.md-select {
  margin: auto;
}
</style>