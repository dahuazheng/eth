<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import UserApi from '@/api/user'
    import Cookies from 'js-cookie'

    export default {
        methods: {
            test() {
                // test
                UserApi.getInviteCode().then(res => {
                    console.log(res)
                })
            },
            init() {
                this.$store.dispatch('balance/getBalance')
                if (!UserApi.isOnline()) {
                    this.$router.push({name: 'login'})
                    return
                }
                console.log(UserApi.isBindInviter())
                if (!UserApi.isBindInviter()) {
                    this.$router.push({name: 'inviter'})
                    return
                }
            }
        },
        created() {
            // this.test()
            this.init()
        }
    }
</script>
