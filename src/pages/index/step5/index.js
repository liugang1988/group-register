export default {
    template: __inline('index.tpl'),
    data() {
        return {
            isSubmit: false,
            checked: [],
            info: {},
            address: ''
        };
    },
    methods: {
        getAreaData() {
            this.$http.get('/api/cbs/v3/area/all')
                .then((response) => {
                    this.areaData = response.data;
                    const area = this.getAreaName(this.info.regionId, this.areaData);
                    this.address = area.join('') + this.info.address;
                }, (response) => {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
        },
        getAreaName(id, items) {
            let arr = [];
            for (let i = 0, l = items.length; i < l; i++) {
                const item = items[i];
                if (item.id === id) {
                    return [item.name];
                }
                arr = this.getAreaName(id, item.areas);
                if (arr && arr.length) {
                    arr.unshift(item.name);
                    return arr;
                }
            }
            return arr;
        },
        submit() {
            if (!this.checked.length) {
                this.alert({
                    title: '提示',
                    content: '您还没有同意合同内容!',
                    callback() {
                        this.visible = false;
                    }
                });
                return;
            }

            if (this.isSubmit) return;
            this.isSubmit = true;

            this.$http.get('/api/group/v3/auto/contract/agree').then(() => {
                this.isSubmit = false;
                this.$emit('next');
            }, (response) => {
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
                this.isSubmit = false;
            });
        },
        download() {
            window.open('http://dl.runjiaoyu.com.cn/template/润•教育才艺教学服务平台服务协议.pdf');
        }
    },
    created() {
        this.$http.get('/api/group/v3/auto/contract/data').then((res) => {
            this.info = res.data;
            this.getAreaData();
        }, (response) => {
            this.toast({
                content: response.statusText,
                type: 'warn'
            });
        });
    }
};

