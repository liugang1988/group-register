export default {
    template: __inline('index.tpl'),
    data() {
        return {
            info: {},
            domain: '',
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
        }
    },
    created() {
        this.$http.get('/api/group/v3/auto/audit/info').then(
            (res) => {
                this.info = res.data;
                this.getAreaData();
            },
            (res) => {
                this.toast({
                    content: res.statusText,
                    type: 'warn'
                });
            }
        );

        this.$http.get('/api/cbs/v6/upload/token').then((res) => {
            this.domain = res.data[0].accessUrl;
        });
    }
};
