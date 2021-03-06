/**
 * 公共配置
 */

// 参考：https://github.com/kangax/html-minifier
fis.config.set('settings.optimizer.rjy-html-minifier', {
    collapseWhitespace: true, // 折叠空白
    removeComments: true, // 删除注释
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    ignoreCustomComments: [/ignore/], // 保留自定义注释，必须是正则表达式
    processConditionalComments: true // 保留条件注释
});

// 参考：https://github.com/fex-team/fis-spriter-csssprites
fis.config.set('settings.spriter.csssprites', {
    htmlUseSprite: true, // 开启模板内联css处理,默认关闭
    styleReg: /(<style(?:(?=\s)[\s\S]*?[''\s\w/-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
    margin: 5 // 图之间的边距
});

// 参考：https://github.com/fex-team/fis-optimizer-uglify-js
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define' // 不需要混淆的关键字
    },
    compress: {
        drop_console: true // 自动删除console
    }
});

// 参考：https://github.com/ken1987/fis-postprocessor-rjy-postcss
fis.config.set('settings.postprocessor.rjy-postcss', {
    addPlugins() {
        return [];
    }
});

fis.unhook('components');
fis.hook('node_modules', {
    shimProcess: false,
    shimBuffer: false
});
fis.hook('commonjs', {
    paths: {
        vue: '/node_modules/vue/dist/vue.js'
    }
});

fis
    .match('*.{css,less}', {
        postprocessor: fis.plugin('rjy-postcss')
    })
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    // 配置：https://github.com/fex-team/fis3-postpackager-loader
    .match('::package', {
        postpackager: fis.plugin('loader')
    });
