<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {UserApi} from '@/api'
    import {initMixin} from '@/mixins'
    import Cookies from 'js-cookie'

    export default {
        mixins:[initMixin],
        watch: {
            $route(to, from) {
                this.init()
                // this.$store.dispatch('user/getInviteCode')
            }
        },
        methods: {
            test() {
                // test
                UserApi.getInviteCode().then(res => {
                    console.log(res)
                })
            },
            init() {
                this.$store.dispatch('user/getBalance')
                // return
                if (!UserApi.isOnline()) {
                    this.$router.push({name: 'login'})
                    return
                }
                console.log(UserApi.isBindInviter())
                // if (!UserApi.isBindInviter()) {
                //     this.$router.push({name: 'inviter'})
                //     return
                // }
            }
        },
        created() {
            //this.test()
            //this.init()
        }
    }
</script>
