<template>
  <div class="points">
    <div class="points-content">
      <div v-if="groups !== undefined && groups.length > 0" class="element">
        <div class="pseudo-table">
          <md-card v-for="group in groups" v-bind:key="group._id">
            <md-card-header>
              <div class="md-title">
                <div class="main-content inline">
                  <div class="content-line">{{ group.name }}</div>
                </div>

                <div class="options-content inline">
                  <div
                    @click="$router.push({ name: 'editgroup', params: { id: group._id } })"
                    class="inline"
                  >
                    <md-icon>reorder</md-icon>
                  </div>
                  <div @click="deleteGroup(group._id)" class="inline">
                    <md-icon>highlight_off</md-icon>
                  </div>
                </div>
              </div>
            </md-card-header>
            <md-card-content>
              <div v-for="point in group.points" v-bind:key="point._id">
                <div class="main-content inline">
                  <div class="content-line">{{ point.name }}</div>
                </div>

                <div class="options-content inline">
                  <div
                    @click="$router.push({ name: 'editpoint', params: { id: point._id, groupId : group._id } })"
                    class="inline"
                  >
                    <md-icon>reorder</md-icon>
                  </div>
                  <div @click="deletePoint(point._id, group._id)" class="inline">
                    <md-icon>highlight_off</md-icon>
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

      <div>
        <h4 class="plus-button-first-text">Добавить {{this.dictionary.group.toLowerCase()}}</h4>
        <md-button v-bind:to="{ name: 'addgroup' }" class="md-fab plus-button-first">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div>
        <h4 class="plus-button-second-text">Добавить {{this.dictionary.point.toLowerCase()}}</h4>
        <md-button v-bind:to="{ name: 'addpoint' }" class="md-fab plus-button-second">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'points',
  data: () => ({
    groups: [],
    dictionary: AppTypeHelper
  }),
  mounted () {
    this.getGroups()
  },
  methods: {
    async getGroups () {
      const response = await GroupService.fetchGroups()
      this.groups = response.data.groups
    },
    async deletePoint (pointId, groupId) {
      const response = await GroupService.getGroup({ id: groupId })
      var group = response.data

      const index = group.points
        .map(function (e) {
          return e._id
        })
        .indexOf(pointId)
      if (index !== -1) {
        group.points.splice(index, 1)
      }

      await GroupService.updateGroup({
        id: group._id,
        name: group.name,
        points: group.points
      })

      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenDeleted,
        this.dictionary.successOperation
      ).then(() => {
        this.refresh()
      })
    },
    async deleteGroup (id) {
      GroupService.deleteGroup(id)

      this.$swal(
        this.dictionary.successTitle,
        this.dictionary.elementHasBeenDeleted,
        this.dictionary.successOperation
      ).then(() => {
        this.refresh()
      })
    },
    refresh () {
      this.$router.push({ name: 'Points' })
      this.getGroups()
    }
  }
}
</script>

<style type="text/css">
</style>
