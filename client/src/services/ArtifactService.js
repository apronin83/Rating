import Api from '@/services/Api'

export default {
  fetchArtifacts () {
    return Api().get('artifacts')
  },

  addArtifact (params) {
    return Api().post('add_artifact', params)
  },

  updateArtifact (params) {
    return Api().put('artifacts/' + params.id, params)
  },

  getArtifact (params) {
    return Api().get('artifacts/' + params.id)
  },

  deleteArtifact (id) {
    return Api().delete('artifacts/' + id)
  }
}
