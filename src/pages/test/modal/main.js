import Vue from 'vue';
import uiModal from '../../components/modal/modal';

new Vue({
    el: '#app',
    components: {
        uiModal
    },
    data: {
        visible: false,
        type: 'alert',
        title: 'title',
        content: 'content'
    },
    methods: {
        alert() {
            this.type = 'alert';
            this.visible = true;
        },
        confirm() {
            this.type = 'confirm';
            this.visible = true;
        },
        onOk() {
            alert('提交成功！');
            this.visible = false;
        },
        onCancel() {
            if (confirm('是否真的要取消')) {
                this.visible = false;
                this.visible = false;
            }
        }
    }
});
