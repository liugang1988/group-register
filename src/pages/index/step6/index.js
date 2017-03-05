import qiniuUpload from '../../../utils/qiniuUpload';

export default {
    template: __inline('index.tpl'),
    data() {
        return {
            isSubmit: false,
            info: {},
            type: 1,
            staffNo: '',
            invoiceInfo: '',
            imgkey: '',
            pics: [],
            needInvoice: 0,

            isShowImageCropper: false,
            isShowPay: false,
            isSearch: false,
            payQRcodeUri: ''
        };
    },
    methods: {
        initUploadImg(el) {
            qiniuUpload(el, {
                UploadFile: (id) => {
                    const bl = this.pics.some((item) => {
                        if (item.id === id) {
                            return true;
                        }
                        return false;
                    });
                    if (bl) return;

                    this.pics.push({
                        id,
                        key: '',
                        url: '',
                        percent: 0,
                        loaded: 0
                    });
                },
                onProgress: (id, info) => {
                    this.pics.some((item) => {
                        if (item.id === id) {
                            item.percent = info.percent;
                            item.loaded = info.loaded;
                            return true;
                        }
                        return false;
                    });
                },
                onUploaded: (id, key, url) => {
                    this.pics.some((item) => {
                        if (item.id === id) {
                            item.key = key;
                            item.url = url;
                            return true;
                        }
                        return false;
                    });
                },
                onError: (id, msg) => {
                    if (id) {
                        this.pics.some((item, index) => {
                            if (item.id === id) {
                                this.toast({
                                    content: '第' + (index + 1) + '个文件：' + msg,
                                    type: 'warn'
                                });
                                this.pics.splice(index, 1);
                                return true;
                            }
                            return false;
                        });
                    } else {
                        this.toast({
                            content: msg,
                            type: 'warn'
                        });
                    }
                }
            });
        },
        removeImg() {
            this.pics = [];
        },
        submit() {
            if (this.isSubmit) return;

            if (this.needInvoice && !this.invoiceInfo) {
                this.alert({
                    title: '提示',
                    content: '请填写发票抬头'
                });
                return;
            }

            if (this.type) {
                this.isSubmit = true;
                this.$http.post('/api/group/v10/auto/order/create', {
                    payType: this.type,
                    staffNo: this.staffNo,
                    invoiceInfo: this.invoiceInfo
                }).then((res) => {
                    this.isSubmit = false;
                    const data = res.data;
                    this.payQRcodeUri = data.payQRcodeUri || '';
                    this.isShowPay = true;
                }, (response) => {
                    this.isSubmit = false;
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
            } else {
                if (!this.pics.length) {
                    this.alert({
                        title: '提示',
                        content: '请填上传截图'
                    });
                    return;
                }
                if (!this.pics[0].url) {
                    this.alert({
                        title: '提示',
                        content: '请检查图片是否正在上传，请稍后'
                    });
                    return;
                }
                this.isSubmit = true;
                this.$http.post('/api/group/v10/auto/order/transfer/upload', {
                    imgkey: this.pics[0].key,
                    staffNo: this.staffNo,
                    invoiceInfo: this.invoiceInfo
                }).then(() => {
                    this.isSubmit = false;
                    this.$emit('next');
                }, (response) => {
                    this.isSubmit = false;
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
            }
        },
        paySuccess() {
            this.isSearch = false;
            this.$http.get('/api/group/v10/auto/order/pay/status').then((res) => {
                this.isSearch = false;
                const status = res.data.status;
                if (status === 1) {
                    this.$emit('next');
                } else {
                    this.alert({
                        title: '提示',
                        content: '您还未支付哦~请支付！'
                    });
                }
                this.isShowPay = false;
            }, (response) => {
                this.isSearch = false;
                this.isShowPay = false;
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
            });
        },
        payFail() {
            this.paySuccess();
        },
        payChange() {
            this.isShowPay = false;
        },
        getTotal(p, n) {
            return p * n;
        }
    },
    created() {
        this.$http.get('/api/group/v10/auto/order/pay/info').then((res) => {
            this.info = res.data;
        }, (response) => {
            this.toast({
                content: response.statusText,
                type: 'warn'
            });
        });
    }
};

