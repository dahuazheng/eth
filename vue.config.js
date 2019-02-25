var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    configureWebpack:{
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'public/index.html',
                template: 'public/index.html',
                favicon: 'public/favicon123.ico',
                inject: true
            })
        ]
    }
}

