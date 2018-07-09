var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var glob = require("glob");
var copy = require('copy-webpack-plugin');

var bannerPlugin = new webpack.BannerPlugin(
    '// { "framework": "Vue" }\n',
    {raw: true}
)

//自动浏览器预览最后生成的js boundles的内容
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var bundleAnalyzerPlugin=new BundleAnalyzerPlugin({analyzerMode: 'static'});

//  文件拷贝插件,将图片和字体拷贝到dist目录
var copyPlugin = new copy([
    {from: './src/image', to: "./image"},
    {from: './src/font', to: "./font"}
])

// 遍历文件入口,动态生成入口
function getEntries () {
    var entryFiles = glob.sync('./src/entry/**', { 'nodir': true})
    var entries = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.split('entry/')[1];
        filename = filename.substr(0, filename.lastIndexOf('.'));
        entries[filename] = filePath;
    }
    return entries;
}

// 生成webpack配置
function getBaseConfig() {
    return {
        entry: getEntries(),
        output: {
            path: 'dist',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                }, {
                    test: /\.vue(\?[^?]+)?$/,
                    loaders: []
                }, {
                    test: /\.scss$/,
                    loader: 'style!css!sass'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        // vue: {},
        plugins: [bannerPlugin, copyPlugin,bundleAnalyzerPlugin]
    }
}

//*.web.js
var webConfig = getBaseConfig();
webConfig.output.filename = '[name].web.js';
webConfig.module.loaders[1].loaders.push('vue');

//*.weex.js
var weexConfig = getBaseConfig();
weexConfig.output.filename = '[name].weex.js';
weexConfig.module.loaders[1].loaders.push('weex');


module.exports = [webConfig, weexConfig];