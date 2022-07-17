export const state = () => ({
  marks: [],
  locations: [],
  modal: true,
  modalMobile: true
})
export const getters = () => ({
  marks: state => {
    return state.marks
  },
  locations: state => {
    return state.locations
  },
  modal: state => {
    return state.modal
  },
  modalMobile: state => {
    return state.modal
  }
})
export const mutations = {
  setMarks(state, data) {
    state.marks = data
  },
  setModal(state, data) {
    state.modal = data
  },
  setModalMobile(state, data) {
    state.modalMobile = data
  },
  setLocations(state, data) {
    state.locations = data
  }
}
