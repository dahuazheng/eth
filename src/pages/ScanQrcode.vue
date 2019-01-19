<template>
    <div id="scan-qrcode">
        <NavHeader title="二维码"/>
        <qrcode-stream @detect="onDetect"></qrcode-stream>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'
    import {QrcodeStream, QrcodeDropZone, QrcodeCapture} from 'vue-qrcode-reader'

    export default {
        components: {NavHeader, QrcodeStream, QrcodeDropZone, QrcodeCapture},
        methods: {
            async onDetect(promise) {
                try {
                    const {
                        imageData,    // raw image data of image/frame
                        content,      // decoded String
                        location      // QR code coordinates
                    } = await promise

                    console.log(imageData, content, location)
                    alert(content)

                    // ...
                } catch (error) {
                    // ...
                }
            },
            onDecode (decodedString) {
                console.log(decodedString)
                decodedString.then(res=>{
                    alert(res.content)

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #scan-qrcode {

    }
</style>
