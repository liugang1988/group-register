export default {
    template: __inline('index.tpl'),
    props: {
        defaultSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        items: {
            type: Array,
            default: () => []
        },
        showNum: Number // 最多显示个数，超过后不显示上传按钮
    },
    computed: {
        isShowBtn() {
            return !this.showNum || !this.items || this.items.length < this.showNum;
        }
    },
    methods: {
        remove(index) {
            this.$emit('remove', index);
        }
    },
    mounted() {
        this.$emit('mounted', this.$refs.uploader);
    }
};
