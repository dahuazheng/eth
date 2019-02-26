<template>
    <div id="scan-qrcode">
        <NavHeader title="二维码"/>
        <input type="file" @change="uploadFile($event)">
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'
    import {QrcodeStream, QrcodeDropZone, QrcodeCapture} from 'vue-qrcode-reader'

    export default {
        components: {NavHeader, QrcodeStream, QrcodeDropZone, QrcodeCapture},
        methods: {
            uploadFile(event) {
                const file = event.target.files[0]
                qrcode.decode(this.getObjectURL(file));

                qrcode.callback = function (imgMsg) {
                    console.log("imgMsg", imgMsg);
                    alert(imgMsg)
                }
            },
            getObjectURL(file) {
                let url = null
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }

                return url;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #scan-qrcode {

    }
</style>
