import Api from '@/services/Api'

export default {
  fetchGroups () {
    return Api().get('groups')
  },

  addGroup (params) {
    return Api().post('add_group', params)
  },

  updateGroup (params) {
    return Api().put('groups/' + params.id, params)
  },

  getGroup (params) {
    return Api().get('group/' + params.id)
  },

  deleteGroup (id) {
    return Api().delete('groups/' + id)
  }
}
