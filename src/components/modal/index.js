/**
 * 对话框
 */
export default {
    template: __inline('index.tpl'),
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'alert' // 支持 alert confirm
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        okText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        callback: {
            default: null
        },
        modalInput: {
            default: false
        },
        inputMsg: {
            default: 1
        }
    },
    methods: {
        ok() {
            if (typeof this.callback === 'function') {
                this.callback(this, true);
            }
            if (this.modalInput) {
                this.$emit('test', this.inputMsg);
            }
        },
        cancel() {
            if (typeof this.callback === 'function') {
                this.callback(this, false);
            }
        }
    }
};
