<template>
    <div id="scan-qrcode">
        <NavHeader title="二维码"/>
        <div id="bcid">
            <button @click="startRecognize">1.创建控件</button>
            <button @click="startScan">2.开始扫描</button>
            <button @click="cancelScan">3.结束扫描</button>

            <button @click="closeScan">4.关闭控件</button>
            扫描二维码
        </div>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'
    let scan = null;

    export default {
        components: {NavHeader},
        methods: {
            //创建扫描控件
            startRecognize() {
                let that = this;
                if (!window.plus) return;
                scan = new plus.barcode.Barcode('bcid');
                scan.onmarked = onmarked;

                function onmarked(type, result, file) {
                    switch (type) {
                        case plus.barcode.QR:
                            type = 'QR';
                            break;
                        case plus.barcode.EAN13:
                            type = 'EAN13';
                            break;
                        case plus.barcode.EAN8:
                            type = 'EAN8';
                            break;
                        default:
                            type = '其它' + type;
                            break;
                    }
                    result = result.replace(/\n/g, '');
                    that.codeUrl = result;
                    alert(result);
                    that.closeScan();

                }
            },
            //开始扫描
            startScan() {
                if (!window.plus) return;
                scan.start();
            },
            //关闭扫描
            cancelScan() {
                if (!window.plus) return;
                scan.cancel();
            },
            //关闭条码识别控件
            closeScan() {
                if (!window.plus) return;
                scan.close();
            },
        }
    }
</script>

<style lang="scss" scoped>
    #scan-qrcode {

    }
</style>
