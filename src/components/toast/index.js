/**
 * Toast
 * 一个包含用户点击消息
 */
import uiIcon from '../icon';

export default {
    template: __inline('index.tpl'),
    destroyed() {
        this._$el.remove();
    },
    mounted() {
        this.$nextTick(() => {
            this._$el = document.body.appendChild(this.$el);
        });
    },
    components: {
        uiIcon
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            default: 'text'
        },
        time: {
            type: Number,
            default: 2 // 秒为单位
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            show: this.visible,
            timeout: null
        };
    },
    computed: {
        iconName() {
            if (this.type === 'loading') {
                return 'loading';
            }
            if (this.type === 'warn') {
                return 'warn';
            }
            if (this.type === 'success') {
                return 'success';
            }
            return '';
        }
    },
    watch: {
        visible(val) {
            this.show = val;
            if (val) {
                if (this.type !== 'loading') {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.show = false;
                        this.$emit('close');
                    }, this.time * 1000);
                }
            }
        },
        type(val) {
            if (this.visible) {
                if (val !== 'loading') {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.show = false;
                        this.$emit('close');
                    }, this.time * 1000);
                }
            }
        }
    }
};
