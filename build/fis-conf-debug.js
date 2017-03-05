/**
 * 本地开发配置
 */
require('./fis-conf-common');
const babelConfig = require('./babelConfig');

// 指定项目源码
fis.set('project.files', [
    '/src/**'
]);

// 排除指定目录和文件
fis.set('project.ignore', [
    'node_modules/**',
    'build/**',
    'dist/**',
    '.gitconfig',
    '.gitignore',
    '.git/**'
]);

fis
    .match('**', {
        isMod: true,
        useSameNameRequire: true, // 开启同名依赖
        release: '/static/$&' // 所有默认资源都产出到static目录下
    })
    // html
    .match('/src/pages/(**.html)', {
        release: '/$1' // pages目录下的页面，产出到根目录
    })
    .match(/^\/src\/pages\/(.*)([^/]+)\/\2\.html$/, {
        release: '/$1$2.html' // pages目录下与上级目录同名的页面，产出到上一级目录
    })
    .match('/src/test/(**.html)', {
        release: '/test/$1' // test目录下的页面，产出到test目录
    })
    .match(/\/src\/test\/(.*)([^/]+)\/\2\.html$/, {
        release: '/test/$1$2.html' // test目录下与上级目录同名的页面，产出到上一级目录
    })
    // js
    .match('/src/**.js', {
        parser: fis.plugin('babel-6.x', babelConfig)
    })
    .match('/src/libs/**', {
        useBabel: false,
        wrap: false // 不需要包装成amd
    })
    .match('/node_modules/plupload_2.1.9/**', {
        wrap: false // 不需要包装成amd
    })
    // mock假数据
    .match('/src(/mock/**)', {
        release: '$1'
    })
    .match('/src/mock/**.js', {
        wrap: false
    })
    .match('/src/mock/server.conf', {
        release: '/config/server.conf'
    });
