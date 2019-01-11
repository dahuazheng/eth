const joinMixin = {
  data() {
    return {
      noteCodePopupShow: false
    }
  },
  methods: {
    openNoteCodePopup() {
      this.noteCodePopupShow = true
    },
    closeNoteCodePopup() {
      this.noteCodePopupShow = false
    },
  }
}

export default joinMixin