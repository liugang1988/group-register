/**
 * 线上发布配置
 */
require('./fis-conf-common');
const babelConfig = require('./babelConfig');
const {
    domain
} = require('./config');

// 指定项目源码
fis.set('project.files', [
    '/src/**'
]);

// 排除指定目录和文件
fis.set('project.ignore', [
    '/src/{mock,test}/**', // 过滤test和mock目录
    '/src/pages/market/**',
    '/src/**/__*.png' // 过滤三个连续下划线开头的预览图片
]);

fis
    .match('*', {
        isMod: true,
        useSameNameRequire: true, // 开启同名依赖
        release: '/static/$&', // 所有默认资源都产出到static目录下
        url: '$&',
        domain
    })
    // 必须部署在本地
    // https://segmentfault.com/n/1330000008120771
    .match('(Moxie.swf)', {
        release: '/$1',
        url: '',
        domain: ''
    })
    // html
    .match('/src/**.{html,tpl}', {
        optimizer: fis.plugin('rjy-html-minifier'),
        domain: '' // 页面不需要上cdn
    })
    .match('/src/pages/(**.html)', {
        release: '/$1' // pages目录下的页面，产出到根目录
    })
    .match(/^\/src\/pages\/(.*)([^/]+)\/\2\.html$/, {
        release: '/$1$2.html' // pages目录下与上级目录同名的页面，产出到上一级目录
    })
    // js
    .match('*.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
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
    // css
    .match('*.{css,less}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 字体
    .match('*.{eot,svg,ttf,woff}', {
        useHash: true
    })
    // 图片
    .match('*.{png,jpg,jpeg,gif,ico}', {
        useHash: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' // pngcrush or pngquant default is pngcrush
        })
    });

// 打包
const packager = {
    'base.js': [
        '/node_modules/vue/**',
        '/node_modules/es6-promise/**',
        '/node_modules/axios/**',
        '/node_modules/vuelidate/**',
        '/node_modules/spark-md5/**'
    ],
    'common.js': [
        '/src/utils/**.js',
        '/src/config/**.js',
        '/src/components/**.js',
        '/src/directive/**.js'
    ],
    'common.css': [
        '/src/components/**.{css,less}'
    ]
};
const reg = /(pages\/.*)\/[^/]*\.html/; // 所有pages目录下的html所在目录作为入口
const rPath = 'src';

fis.util.find(rPath, reg, null, '/').map((item) => {
    const path = item.match(reg)[1];
    const glob = '/' + rPath + '/' + path + '/**';

    packager[path + '.css'] = glob + '.{css,less}';
    packager[path + '.js'] = glob + '.js';

    return false;
});

fis.match('::package', {
    spriter: fis.plugin('csssprites'),
    packager: fis.plugin('map', packager)
});
