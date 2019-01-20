<template>
  <div class="points">
    <h1>Критерии</h1>
    <div v-if="groups !== undefined && groups.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addpoint' }" class>Добавить критерий</router-link>
      </div>
      <table v-for="group in groups" v-bind:key="group._id">
        <div v-if="group.points !== undefined && group.points.length > 0">
        <h2>{{ group.name }}</h2>
        <tr>
          <td>Название</td>
          <td align="center">Редактировать</td>
          <td align="center">Удалить</td>
        </tr>
        <tr v-for="point in group.points" v-bind:key="point._id">
          <td>{{ point.name }}</td>
          <td align="center">
            <router-link
              v-bind:to="{ name: 'editpoint', params: { pointId: point._id, groupId : group._id } }"
            >
              <md-icon>create</md-icon>
            </router-link>
          </td>
          <td align="center">
            <a href="#" @click="deletePoint(point._id, group._id)">
              <md-icon>delete</md-icon>
            </a>
          </td>
        </tr>
        </div>
      </table>
    </div>
    <div v-else>Нет ни одного критерия.. Добавьте хоть один
      <br>
      <br>
      <router-link v-bind:to="{ name: 'addpoint' }" class="add_point_link">Добавить критерий</router-link>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
export default {
  name: 'points',
  data () {
    return {
      groups: []
    }
  },
  mounted () {
    this.getGroups()
  },
  methods: {
    async getGroups () {
      const response = await GroupService.fetchGroups()
      this.groups = response.data.groups
    },
    async deletePoint (pointId, groupId) {
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
        .then(async () => {
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

          $this.$router.go({
            path: '/points'
          })
        })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_point_link {
  background: #4d7ef7;
  color: #fff !important;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
