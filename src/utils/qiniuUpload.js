/**
 * @require '../../node_modules/plupload_2.1.9/plupload.full.min.js'
 */
import '../../node_modules/qiniu-js/dist/qiniu';
import http from './http';

const Qiniu = window.Qiniu;
// 如果部署到cdn，必须用 Moxie.cdn.swf
// https://segmentfault.com/n/1330000008120771
const flashSwfUrl = __uri('../../node_modules/plupload_2.1.9/Moxie.swf');

export default (elBtn, {
    maxFileSize,
    extensions,
    UploadFile,
    onProgress,
    onUploaded,
    onError
} = {}) => http.get('/api/cbs/v11/upload/token')
    .then(res => res.data[0].accessUrl)
    .then(domain => Qiniu.uploader({
        domain,
        uptoken_url: '/api/cbs/v11/image/token',
        browse_button: elBtn,
        max_file_size: (maxFileSize || 1024 * 1024 * 4) + 'b',
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        get_new_uptoken: true, // 每次获取新的token
        save_key: true, // 从token里面获取key
        unique_names: false,
        filters: {
            prevent_duplicates: false,
            mime_types: [{
                title: 'Images',
                extensions: extensions || 'jpg,jpeg,png,webp'
            }]
        },
        multi_selection: false,
        flash_swf_url: flashSwfUrl,
        runtimes: 'html5,flash,html4', // 上传模式,依次退化
        init: {
            UploadFile(up, file) {
                if (typeof UploadFile === 'function') {
                    UploadFile(file.id, file.name);
                }
            },
            UploadProgress(up, file) {
                if (typeof onProgress === 'function') {
                    onProgress(file.id, {
                        size: file.size,
                        percent: file.percent,
                        loaded: file.loaded,
                        speed: file.speed,
                        time: (file.size - file.loaded) / parseInt(file.speed, 10)
                    });
                }
            },
            FileUploaded(up, file, info) {
                if (typeof onUploaded === 'function') {
                    const key = JSON.parse(info).key;
                    onUploaded(file.id, key, domain + '/' + key);
                }
            },
            Error(up, err, msg) {
                if (typeof onError === 'function') {
                    if (err.code === -602) {
                        msg = '不允许选择重复文件';
                    } else if (err.code === -601) {
                        msg = '支持文件格式错误';
                    } else {
                        msg = msg || err.message || '上传出错,请稍后再试';
                    }
                    onError(err.file.key, msg);
                }
            },
            UploadComplete() {}
        }
    }));
