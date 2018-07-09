<template>
    <div class="center">
        <jui-image src="/image/logo.png" width="244px" height="172px"></jui-image>
        <text class="h2">JUI-Weex</text>
        <text class="h4">专注为Weex前端开发者提供高质量UI组件</text>
    </div>
</template>

<style lang="sass" src="../css/juiweex.scss"></style>

<script>
    const globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data () {
            return {}
        },
        methods:{
         
        },
        mounted () {
            globalEvent.addEventListener("androidback", (e)=> {
                this.$pop();
            });
        }
    }
</script>