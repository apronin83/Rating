import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'

import addartifact from '@/components/Artifacts/AddArtifact'
import editartifact from '@/components/Artifacts/EditArtifact'

import addgroup from '@/components/Groups/AddGroup'
import editgroup from '@/components/Groups/EditGroup'

import Points from '@/components/Points/Points'
import addpoint from '@/components/Points/AddPoint'
import editpoint from '@/components/Points/EditPoint'

import Subartifacts from '@/components/Subartifacts/Subartifacts'
import addsubartifact from '@/components/Subartifacts/AddSubartifact'
import editsubartifact from '@/components/Subartifacts/EditSubartifact'

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
      path: '/subartifacts',
      name: 'Subartifacts',
      component: Subartifacts
    },
    {
      path: '/subartifacts/add',
      name: 'addsubartifact',
      component: addsubartifact
    },
    {
      path: '/subartifacts/:id/edit',
      name: 'editsubartifact',
      component: editsubartifact
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
    },
    {
      path: '/points',
      name: 'Points',
      component: Points
    },
    {
      path: '/points/add',
      name: 'addpoint',
      component: addpoint
    },
    {
      path: '/points/:id/edit',
      name: 'editpoint',
      component: editpoint
    }
  ]
})
