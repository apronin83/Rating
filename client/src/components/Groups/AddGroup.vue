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
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  data: () => ({
    name: '',
    dictionary: AppTypeHelper
  }),
  methods: {
    async addGroup () {
      await GroupService.addGroup({
        name: this.name
      })
      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenAdded,
        this.dictionary.successOperation
      ).then(() => {
        this.$router.push({ name: 'Points' })
      })
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