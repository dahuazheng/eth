<template>
    <div id="scan-qrcode">
        <NavHeader title="二维码"/>
        <QrcodeStream @decode="onDecode"/>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

    export default {
        components: {NavHeader, QrcodeStream, QrcodeDropZone, QrcodeCapture},
        methods: {
            onDecode(decodeString) {

            }
        }
    }
</script>

<style lang="scss" scoped>
    #scan-qrcode {

    }
</style>
