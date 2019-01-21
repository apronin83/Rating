<template>
  <div class="points">
    <div>
     <md-toolbar :md-elevation="1">
        <span class="md-title">Группы</span><div>        
      </div>
       <md-button v-bind:to="{ name: 'addgroup' }" class="md-raised md-primary">Добавить группу</md-button>
      </md-toolbar>
    </div>
    <div class="points-content">
      
      <div v-if="groups.length > 0">
        <div class="pseudo-table">
           <md-card>
      <md-card-content v-for="group in groups" v-bind:key="group._id">
        <div>
          <div class="main-content inline">
            <div class="content-line">
              {{ group.name }}
            </div>
          </div>
      
          <div class="options-content inline">
            <div class="inline">
            <router-link v-bind:to="{ name: 'addgroup', params: { id: group._id } }"><md-icon>create</md-icon></router-link>
            </div>
            <div class="inline">
              <a href="#" @click="deleteGroup(group._id)"><md-icon>delete</md-icon></a>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
        </div>
      </div>
      <md-empty-state v-else
      md-icon="devices_other"
      md-label="Создайте группу"
      md-description="Тут описание нужности группы">
       <md-button v-bind:to="{ name: 'addgroup' }" class="md-raised md-primary">Добавить группу</md-button>
    </md-empty-state>
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
