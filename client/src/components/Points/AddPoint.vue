<template>
  <div align="center">
    <md-toolbar class="md-transparent md-dense">
      <md-menu md-size="auto">
        <md-field>
          <label>Название</label>
          <md-input v-model="name" placeholder="Название"></md-input>
        </md-field>
      </md-menu>
      <md-field v-if="groups.length > 0">
        <md-select v-model="groupId" name="groupId" id="groupId" placeholder="Выберите группу">
          <md-option
            v-bind:key="group._id"
            v-for="group in groups"
            v-bind:value="group._id"
          >{{group.name}}</md-option>
        </md-select>
      </md-field>
      <md-menu md-size="auto">
        <md-button class="md-primary" @click="addPoint" md-menu-trigger>Создать</md-button>
      </md-menu>
    </md-toolbar>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
export default {
  data: () => ({
    name: '',
    groups: [],
    groupId: ''
  }),
  mounted () {
    this.getGroups()
  },
  methods: {
    async addPoint () {
      if (this.groupId !== '' && this.name !== '') {
        const response = await GroupService.getGroup({
          id: this.groupId
        })
        var group = response.data

        if (group.points === undefined || group.points.length === 0) {
          group.points = []
        }
        if (group.points.find(p => p.name === this.name) === undefined) {
          group.points.push({
            name: this.name
          })
          await GroupService.updateGroup({
            id: group._id,
            name: group.name,
            points: group.points
          })
          this.$swal('Великолепно!', `Ваш критерий был добавлен!`, 'success')
        } else {
          this.$swal('Внимание!', `Такой критерий уже есть!`, 'info')
        }

        this.$router.push({ name: 'Points' })
      } else {
        this.$swal('Внимание!', `Все поля должны быть указаны!`, 'info')
      }
    },
    async getGroups () {
      const response = await GroupService.fetchGroups()
      this.groups = response.data.groups
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