const initMixin = {
    data() {
        return {}
    },
    methods: {
        getInitData() {
            this.$store.dispatch('user/getAsset')
            this.$store.dispatch('user/getInviteCode')
            this.$store.dispatch('user/getAddress')
        }
    }
}

export default initMixin
