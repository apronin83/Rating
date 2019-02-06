<template>
  <div class="navbar">
    <md-tabs class="md-primary" md-alignment="right">
      <md-tab
        @click="navigate('Main')"
        :md-active="isPath('/Main')"
        id="tab-home"
        :md-label="dictionary.main"
      ></md-tab>
      <md-tab
        @click="navigate('Subartifacts')"
        :md-active="isPath('/Subartifacts')"
        id="tab-subartifacts"
        :md-label="dictionary.subartifacts"
      ></md-tab>
      <md-tab
        @click="navigate('Points')"
        :md-active="isPath('/Points')"
        id="tab-points"
        :md-label="dictionary.points"
      ></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import { AppTypeHelper } from '@/helpers/AppTypeHelper'

export default {
  name: 'navbar',
  data: () => ({
    dictionary: AppTypeHelper
  }),
  methods: {
    navigate (path) {
      this.$router.push({ name: path })
    },
    isPath (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style type="text/css" scoped>
.navbar {
  margin-bottom: 55px !important;
}
.md-primary {
  background-color: #448aff;
}
</style>
