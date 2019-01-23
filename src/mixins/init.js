const initMixin = {
    data() {
        return {}
    },
    methods: {
        getInitData() {
            this.$store.dispatch('user/getBalance')
            this.$store.dispatch('user/getInviteCode')
            this.$store.dispatch('user/getAddress')
        }
    }
}

export default initMixin
