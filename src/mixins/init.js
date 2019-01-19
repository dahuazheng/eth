const initMixin = {
    data() {
        return {}
    },
    methods: {
        getInitData() {
            this.$store.dispatch('user/getBalance')
            this.$store.dispatch('user/getInviteCode')

        }
    }
}

export default initMixin
