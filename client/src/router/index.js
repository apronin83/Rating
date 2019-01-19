import Vue from 'vue'
import Router from 'vue-router'

import Artifacts from '@/components/Artifacts/Artifacts'
import addartifact from '@/components/Artifacts/AddArtifact'
import editartifact from '@/components/Artifacts/EditArtifact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Artifacts
    },
    {
      path: '/artifacts/add',
      name: 'addartifact',
      component: addartifact
    },
    {
      path: '/artifacts',
      name: 'Artifacts',
      component: Artifacts
    },
    {
      path: '/artifacts/:id/edit',
      name: 'editartifact',
      component: editartifact
    }
  ]
})
