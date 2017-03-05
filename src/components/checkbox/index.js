/**
 * 多选按钮
 */
export default {
    template: __inline('index.tpl'),
    props: {
        value: Array,
        label: {
            type: [String, Number],
            default: ''
        },
        disabled: Boolean
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        },
        checked() {
            for (let i = 0, l = this.value.length; i < l; i += 1) {
                if (this.value[i] === this.label) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        change(e) {
            this.$emit('change', e.target.checked, this.label);
        }
    }
};
