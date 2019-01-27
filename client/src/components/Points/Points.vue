<template>
  <div class="points">
    <div>
     <md-toolbar :md-elevation="1">
        <span class="md-title">{{ this.dictionary.points }}</span><div>        
      </div>
       <md-button v-bind:to="{ name: 'addpoint' }" class="md-raised md-primary">Добавить</md-button>
      </md-toolbar>
    </div>
    <div class="points-content">
      
      <div v-if="groups !== undefined && groups.length > 0" class="element">
        <div class="pseudo-table">
           <md-card v-for="group in groups" v-bind:key="group._id">
      <md-card-header>
        <div class="md-title">{{ group.name }}</div>
      </md-card-header>

      <md-card-content>
        <div v-for="point in group.points" v-bind:key="point._id">
          <div class="main-content inline">
            <div class="content-line">
              {{ point.name }}
            </div>
          </div>
      
          <div class="options-content inline">
            <div class="inline">
            <router-link v-bind:to="{ name: 'editpoint', params: { pointId: point._id, groupId : group._id } }">
              <md-icon>create</md-icon>
            </router-link>
            </div>
            <div class="inline">
            <a href="#" @click="deletePoint(point._id, group._id)">
              <md-icon>delete</md-icon>
            </a>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
        </div>
      </div>

      <md-empty-state v-else
      md-icon="devices_other">
       <md-button v-bind:to="{ name: 'addpoint' }" class="md-raised md-primary">Добавить</md-button>
    </md-empty-state>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
import {AppTypeHelper} from '@/helpers/AppTypeHelper'

export default {
  name: 'points',
  data () {
    return {
      groups: [],
      dictionary: AppTypeHelper
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
          title: 'Вы уверены?',
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
.md-card {
    width: 45vw;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.content-line {
  width: 100%;
}

.main-content {
  width: calc(40vw - 75px);
}
.options-content {
  width: 70px;
}.content-line {
  text-align: left;
  border-bottom: 1px #ededed solid;
}
.points {
  text-align: center;
  margin: auto;
}

.points-content {
  
  display: -webkit-flex; 
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-content: space-around;
  align-items: stretch;
  flex-wrap: wrap;
}

.element {
  margin: 5px;
}

.inline {
  display: inline-block;
}

@media (max-width: 700px) {
 .md-card {
    width: 90vw;
  }

  .main-content {
  width: calc(80vw - 75px);
  }
}
</style>
