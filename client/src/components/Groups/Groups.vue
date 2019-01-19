<template>
  <div class="groups">
    <h1>Группы</h1>
    <div v-if="groups.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addgroup' }" class>Добавить группу</router-link>
      </div>
      <table>
        <tr>
          <td>Название</td>
          <td  align="center">Редактирование</td>
          <td  align="center">Удаление</td>
        </tr>
        <tr v-for="group in groups" v-bind:key="group._id">
          <td>{{ group.name }}</td>
          <td align="center">
            <router-link
              v-bind:to="{ name: 'editgroup', params: { id: group._id } }"
            >Редактировать</router-link>
          </td>
          <td align="center">
            <a href="#" @click="deleteGroup(group._id)">Удалить</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>Нет ни одной группы.. Добавьте хоть одну
      <br>
      <br>
      <router-link v-bind:to="{ name: 'addgroup' }" class="add_group_link">Добавить группу</router-link>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
export default {
  name: 'groups',
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
    async deleteGroup (id) {
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
          GroupService.deleteGroup(id)
          $this.$router.go({
            path: '/groups'
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
a.add_group_link {
  background: #4d7ef7;
  color: #fff !important;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
