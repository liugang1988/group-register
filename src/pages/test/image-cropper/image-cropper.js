import Vue from 'vue';
import ImageCropper from '../../../components/image-cropper/image-cropper';

new Vue({
    el: '#wrap',
    components: {
        'ui-image-cropper': ImageCropper
    },
    data: {
        isSet: true,
        types: 'jpg  png  jpeg',
        maxSize: 2 * 1024 * 1024,
        compressSize: 1024 * 100,
        width: '',
        height: ''
    },
    methods: {
        error(a, b) {
            console.log(a, b);
            alert(a);
        },
        success(a, b) {
            console.log(a, b);

            window.open(a);
        }
    }
});
