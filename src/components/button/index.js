/**
 * 按钮
 */

import uiIcon from '../icon';

export default {
    template: __inline('index.tpl'),
    components: {
        uiIcon
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        plain: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconName() {
            if (this.loading) {
                return 'loading';
            }
            return this.icon;
        },
        className() {
            let cn = '';
            cn += this.size ? ' btn--' + this.size : '';
            cn += this.type ? ' btn--' + this.type : '';
            cn += this.plain ? ' btn--plain' : '';
            cn += (this.loading || this.disabled) ? ' btn--disabled' : '';
            return cn;
        }
    }
};
