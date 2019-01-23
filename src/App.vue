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
        mixins: [initMixin],
        watch: {
            $route(to, from) {
                this.init()
            }
        },
        methods: {
            init() {
                if (!UserApi.isOnline()) {
                    this.$router.push({name: 'login'})
                    return
                }

                this.getInitData()
            }
        },
        created() {
            this.init()
        }
    }
</script>
