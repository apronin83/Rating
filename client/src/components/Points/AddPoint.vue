<template>
  <div align="center">
    <md-toolbar class="md-transparent md-dense">
      <md-field>
        <label>Название</label>
        <md-input v-model="name" placeholder="Название"></md-input>
      </md-field>
      <md-field v-if="groups.length > 0">
        <md-select v-model="groupId" name="groupId" id="groupId" placeholder="Выберите элемент">
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
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  data: () => ({
    name: '',
    groups: [],
    groupId: '',
    dictionary: AppTypeHelper
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

          this.$swal(
            this.dictionary.successTitle,
            this.dictionary.elementHasBeenAdded,
            this.dictionary.successOperation
          ).then(() => {
            this.navigateToPoints()
          })
        } else {
          this.$swal(
            this.dictionary.infoTitle,
            this.dictionary.elementAlreadyExist,
            this.dictionary.infoOperation
          ).then(() => {
            this.navigateToPoints()
          })
        }
      } else {
        this.$swal(
          this.dictionary.infoTitle,
          this.dictionary.allFieldsMustBeDefined,
          this.dictionary.infoOperation
        )
      }
    },
    async getGroups () {
      const response = await GroupService.fetchGroups()
      this.groups = response.data.groups
    },
    navigateToPoints () {
      this.$router.push({ name: 'Points' })
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

.md-field {
  width: 100vw;
  margin-left: 20px;
}
</style>