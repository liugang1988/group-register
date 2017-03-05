/**
 * 对话框
 */
import {
    addClass,
    removeClass
} from '../../utils/dom';

export default {
    template: __inline('index.tpl'),
    props: {
        visible: Boolean,
        title: [String, Number],
        width: {
            type: Number,
            default: 900
        }
    },
    methods: {
        toggle() {
            const dom = document.body;
            if (this.visible === true) {
                addClass(dom, 'm-dialog-on');
            } else {
                removeClass(dom, 'm-dialog-on');
            }
        },
        close() {
            this.$emit('close');
        }
    },
    watch: {
        visible() {
            this.toggle();
        }
    },
    destroyed() {
        removeClass(document.body, 'm-dialog-on');
        if (this._$el) {
            const _parentElement = this._$el.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(this._$el);
            }
            this._$el = null;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._$el = document.body.appendChild(this.$el);
            this.toggle();
        });
    }
};
