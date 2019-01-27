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
        <md-button class="md-primary" @click="addGroup" md-menu-trigger>Создать</md-button>
      </md-menu>
    </md-toolbar>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'

export default {
  data: () => ({
    name: ''
  }),
  methods: {
    async addGroup () {
      await GroupService.addGroup({
        name: this.name
      })
      this.$swal('Великолепно!', `Элемент добавлен!`, 'success')
      this.$router.push({ name: 'Groups' })
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