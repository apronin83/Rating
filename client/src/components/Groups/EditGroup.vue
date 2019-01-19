<template>
  <div class="groups">
    <h1>Редактировать группу</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="Название" v-model="name">
      </div>
      <div>
        <button class="app_group_btn" @click="updateGroup">Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/GroupService'
export default {
  name: 'editgroup',
  data () {
    return {
      name: null
    }
  },
  mounted () {
    this.getGroup()
  },
  methods: {
    async getGroup () {
      const response = await GroupService.getGroup({
        id: this.$route.params.id
      })
      this.name = response.data.name
    },
    async updateGroup () {
      await GroupService.updateGroup({
        id: this.$route.params.id,
        name: this.name
      })
      this.$swal('Великолепно!', `Ваша группа был обновлена!`, 'success')
      this.$router.push({ name: 'Groups' })
    }
  }
}
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_group_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

