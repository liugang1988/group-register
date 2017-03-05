export default {
    template: __inline('index.tpl'),
    props: {
        label: String,
        tips: String,
        state: Boolean,
        required: Boolean
    },
    computed: {
        className() {
            return {
                'z-error': this.state,
                'z-required': this.required
            };
        }
    }
};
