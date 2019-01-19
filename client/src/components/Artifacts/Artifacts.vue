<template>
  <div class="artifacts">
    <h1>Артефакты</h1>
    <div v-if="artifacts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addartifact' }" class>Добавить артефакт</router-link>
      </div>
      <table>
        <tr>
          <td>Название</td>
          <td  align="center">Редактирование</td>
          <td  align="center">Удаление</td>
        </tr>
        <tr v-for="artifact in artifacts" v-bind:key="artifact._id">
          <td>{{ artifact.name }}</td>
          <td align="center">
            <router-link
              v-bind:to="{ name: 'editartifact', params: { id: artifact._id } }"
            >Редактировать</router-link>
          </td>
          <td align="center">
            <a href="#" @click="deleteArtifact(artifact._id)">Удалить</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>Нет ни одного артефакта.. Добавьте хоть один
      <br>
      <br>
      <router-link v-bind:to="{ name: 'addartifact' }" class="add_artifact_link">Добавить артефакт</router-link>
    </div>
  </div>
</template>

<script>
import ArtifactService from '@/services/ArtifactService'
export default {
  name: 'artifacts',
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
    async deleteArtifact (id) {
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
          ArtifactService.deleteArtifact(id)
          $this.$router.go({
            path: '/artifacts'
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
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
