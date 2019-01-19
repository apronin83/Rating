import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'

import Artifacts from '@/components/Artifacts/Artifacts'
import addartifact from '@/components/Artifacts/AddArtifact'
import editartifact from '@/components/Artifacts/EditArtifact'

import Groups from '@/components/Groups/Groups'
import addgroup from '@/components/Groups/AddGroup'
import editgroup from '@/components/Groups/EditGroup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/artifacts',
      name: 'Artifacts',
      component: Artifacts
    },
    {
      path: '/artifacts/add',
      name: 'addartifact',
      component: addartifact
    },
    {
      path: '/artifacts/:id/edit',
      name: 'editartifact',
      component: editartifact
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/groups/add',
      name: 'addgroup',
      component: addgroup
    },
    {
      path: '/groups/:id/edit',
      name: 'editgroup',
      component: editgroup
    }
  ]
})
