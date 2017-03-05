/**
 * 单选
 */
export default {
    template: __inline('index.tpl'),
    props: {
        value: [String, Number],
        disabled: Boolean,
        label: {
            type: [String, Number],
            required: true
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        }
    }
};
