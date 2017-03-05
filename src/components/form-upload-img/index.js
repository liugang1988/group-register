const defaultSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default {
    template: __inline('index.tpl'),
    props: {
        id: [String, Number],
        initFn: Function,
        defaultSrc,
        title: String,
        url: String,
        status: {
            type: Number,
            default: 0 // 0 添加 1 上传 2 已上传 3 错误
        },
        percent: {
            type: Number,
            default: 0
        }
    },
    methods: {
        remove() {
            this.$emit('remove', this.id);
        }
    },
    mounted() {
        if (typeof this.initFn === 'function') {
            this.initFn(this.$refs.uploader, this.id);
        }
    }
};
