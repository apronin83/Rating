<template>
  <div class="subartifacts">
    <h1>Элементы</h1>
    <div v-if="artifacts !== undefined && artifacts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addsubartifact' }" class>Добавить элемент</router-link>
      </div>
      <table v-for="artifact in artifacts" v-bind:key="artifact._id">
        <div v-if="artifact.subartifacts !== undefined && artifact.subartifacts.length > 0">
          <h2>{{ artifact.name }}</h2>
          <tr>
            <td>Название</td>
            <td align="center">Редактировать</td>
            <td align="center">Удалить</td>
          </tr>
          <tr v-for="subartifact in artifact.subartifacts" v-bind:key="subartifact._id">
            <td>{{ subartifact.name }}</td>
            <td align="center">
              <router-link
                v-bind:to="{ name: 'editsubartifact', params: { subartifactId: subartifact._id, artifactId : artifact._id } }"
              >
                <md-icon>create</md-icon>
              </router-link>
            </td>
            <td align="center">
              <a href="#" @click="deleteSubartifact(subartifact._id, artifact._id)">
                <md-icon>delete</md-icon>
              </a>
            </td>
          </tr>
        </div>
      </table>
    </div>
    <div v-else>Нет ни одного элемента.. Добавьте хоть один
      <br>
      <br>
      <router-link
        v-bind:to="{ name: 'addsubartifact' }"
        class="add_subartifact_link"
      >Добавить элемент</router-link>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
export default {
  name: 'subartifacts',
  data () {
    return {
      artifacts: []
    }
  },
  mounted () {
    this.getArtifacts()
  },
  methods: {
    async getArtifacts () {
      const response = await ArtifactService.fetchArtifacts()
      this.artifacts = response.data.artifacts
    },
    async deleteSubartifact (subartifactId, artifactId) {
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
          const response = await ArtifactService.getArtifact({
            id: artifactId
          })
          var artifact = response.data

          const index = artifact.subartifacts
            .map(function (e) {
              return e._id
            })
            .indexOf(subartifactId)
          if (index !== -1) {
            artifact.subartifacts.splice(index, 1)
          }

          await ArtifactService.updateArtifact({
            id: artifact._id,
            name: artifact.name,
            subartifacts: artifact.subartifacts
          })

          $this.$router.go({
            path: '/Subartifacts'
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
a.add_subartifact_link {
  background: #4d7ef7;
  color: #fff !important;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
