const qiniuUpload = require('qiniu_cdn_upload');
const {
    accessKey,
    secretKey,
    bucket
} = require('./config');

console.log('准备上传七牛');
console.log('当前环境变量：' + (process.env.RUN_ENV || '').trim());

if (accessKey && secretKey && bucket) {
    console.log('正在上传...');
    qiniuUpload({
        src: './dist/static/**',
        dest: '/'
    }, {
        accessKey,
        secretKey,
        bucket
    });
    console.log('上传完毕...');
} else {
    console.error('没有执行上传命令，请检查配置...');
}
