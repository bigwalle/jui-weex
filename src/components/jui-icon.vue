<template>
    <div class="icon-block" :style="{width:size,height:size}" @click="_click($event)">
        <text class="icon" :value="getFontName" :style="getStyle" @click="_click($event)"></text>
    </div>
</template>

<style>
    .icon-block {
        justify-content: flex-start;
    }

    .icon {
        text-align: center;
    }
</style>

<script>
    const iconItems = require('../font/ionicons.json');
    const fontFamily = "ionfont";
    const domModule = weex.requireModule("dom");
    module.exports = {
        beforeCreate () {
            let url = weex.config.bundleUrl;
            if(url.indexOf('?')>0){
                url = url.substring(0,url.indexOf('?'));
            }
            url = url.split('/').slice(0, -1).join('/');
            if(!url.startsWith("http") && !url.startsWith("file")){
                if(url.startsWith("/")){
                    url = url.substring(url.indexOf("/")+1);
                }
                url = "local://" + (url == "" ? '' : "/") + url;
            }
            url = `${url}/font/ionicons.ttf`;
            domModule.addRule('fontFace', {
                'fontFamily': fontFamily,
                'src': "url('" + url + "')"
            });
        },
        props: {
            name: {
                type: String,
                defalut: ''
            },
            color: {
                type: String,
                default: '#9ea7b4'
            },
            size: {
                type: [Number, String],
                default: 48
            },
            activeColor: {
                type: String
            }
        },
        computed: {
            getFontName() {
                let icon = iconItems[this.name];
                return this.decode(icon || '');
            },
            getStyle(){
                let style = {
                    'color': this.color,
                    'font-size': this.size,
                    'font-family': fontFamily
                };
                if (this.activeColor) {
                    style["color:active"] = this.activeColor;
                }
                return style;
            }
        },
        methods: {
            _click(e) {
                this.$emit("click", e);
            },
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return String.fromCharCode('0x' + fontCode);
                }
            }
        }
    }
</script>