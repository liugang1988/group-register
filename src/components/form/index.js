export default {
    template: __inline('index.tpl'),
    props: {
        type: String
    },
    computed: {
        className() {
            const type = this.type;
            if (type === 'v') {
                return 'm-form--v';
            }
            return '';
        }
    }
};
