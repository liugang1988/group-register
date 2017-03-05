import Vue from 'vue';
import uiToast from '../../components/toast/toast';

new Vue({
    el: '#app',
    components: {
        uiToast
    },
    data: {
        visible: false,
        type: 'text',
        text: 'content'
    },
    methods: {
        showText() {
            this.type = 'text';
            this.visible = true;
        },
        showSuccess() {
            this.type = 'success';
            this.visible = true;
        },
        showWarn() {
            this.type = 'warn';
            this.visible = true;
        },
        showLoading() {
            this.type = 'loading';
            this.visible = true;

            setTimeout(() => {
                this.visible = false;
            }, 3000);
        },
        onClosed() {
            this.visible = false;
        }
    }
});
