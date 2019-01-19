<template>
  <div class="navbar">
    <md-tabs class="md-primary" md-alignment="right">
      <md-tab @click="selectMain" id="tab-home" md-label="Главная"></md-tab>
      <md-tab @click="selectArtifacts" id="tab-artifacts" md-label="Артефакты"></md-tab>
      <md-tab @click="selectGroups" id="tab-groups" md-label="Группы"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data: () => ({}),
  methods: {
    selectMain () {
      this.$router.push({ name: 'Main' })
    },
    selectArtifacts () {
      this.$router.push({ name: 'Artifacts' })
    },
    selectGroups () {
      this.$router.push({ name: 'Groups' })
    }
  }
}
</script>

<style type="text/css" scoped>
.navbar {
  margin-bottom: 55px !important;
}
</style>
