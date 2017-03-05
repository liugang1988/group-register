import validatorMixin from '../../../utils/validatorMixin';
import qiniuUpload from '../../../utils/qiniuUpload';

import {
    required,
    isNNInt,
    isIdCard,
    isMobile,
    isLandlines,
    maxLength,
    noSpace
} from '../../../utils/validators';

export default {
    mixins: [validatorMixin],
    template: __inline('index.tpl'),
    props: {
        errorStep: {
            default: false
        },
        currentStep: {
            default: 2
        }
    },
    data() {
        return {
            chainCount: '',
            organName: '',
            legalPerson: '',
            legalPhone: '',
            identityCard: '',

            isShowImageCropper: false,
            picIndex: '',

            pics: [{
                id: '',
                key: '',
                title: '营业执照正本',
                url: '',
                status: 0,
                percent: 0
            }, {
                id: '',
                key: '',
                title: '法人身份证正面',
                url: '',
                status: 0,
                percent: 0
            }, {
                id: '',
                key: '',
                title: '法人身份证反面',
                url: '',
                status: 0,
                percent: 0
            }, {
                id: '',
                key: '',
                title: '负责人身份证正面',
                url: '',
                status: 0,
                percent: 0
            }, {
                id: '',
                key: '',
                title: '负责人身份证反面',
                url: '',
                status: 0,
                percent: 0
            }, {
                id: '',
                key: '',
                title: '负责人手持身份证',
                url: '',
                status: 0,
                percent: 0
            }],

            msg: {
                chainCount: [{
                    type: 'required',
                    text: '请填写网店数量！'
                }, {
                    type: 'isNNInt',
                    text: '请填写数字！'
                }],
                organName: [{
                    type: 'required',
                    text: '请填写公司名称！'
                }, {
                    type: 'maxLength',
                    text: '公司名称最多不超过30个字！'
                }, {
                    type: 'noSpace',
                    text: '公司名称不能出现空格！'
                }],
                legalPerson: [{
                    type: 'required',
                    text: '请填写法定代表人！'
                }, {
                    type: 'maxLength',
                    text: '法定代表人最多不超过15个字！'
                }, {
                    type: 'noSpace',
                    text: '法定代表人不能出现空格！'
                }],
                legalPhone: [{
                    type: 'required',
                    text: '请填写法定代表人联系电话！'
                }, {
                    type: 'tel',
                    text: '法定代表人联系电话填写错误！'
                }],
                identityCard: [{
                    type: 'required',
                    text: '请填写法定代表人身份证！'
                }, {
                    type: 'isIdCard',
                    text: '法定代表人身份证填写错误！'
                }, {
                    type: 'maxLength',
                    text: '法定代表人身份证最多18位！'
                }],
                pics: [{
                    type: '$each',
                    text: '认证资料必须全部上传或者还有正在上传中的资料！'
                }]
            },
            errorText: ''
        };
    },
    validations: {
        chainCount: {
            required,
            isNNInt
        },
        organName: {
            required,
            maxLength: maxLength(30),
            noSpace
        },
        legalPerson: {
            required,
            maxLength: maxLength(15),
            noSpace
        },
        legalPhone: {
            required,
            tel: v => isLandlines(v) || isMobile(v)
        },
        identityCard: {
            required,
            isIdCard,
            maxLength: maxLength(18)
        },
        pics: {
            required,
            $each: {
                url: {
                    required
                }
            }
        },
        all: [
            'chainCount',
            'organName',
            'legalPerson',
            'legalPhone',
            'identityCard',
            'pics'
        ]
    },
    methods: {
        initFn(el, _index) {
            qiniuUpload(el, {
                UploadFile: (id) => {
                    const item = this.pics[_index];
                    item.id = id;
                    item.status = 1;
                    item.percent = 0;
                    item.loaded = 0;
                    item.url = '';
                    item.key = '';
                },
                onProgress: (id, info) => {
                    this.pics.some((item) => {
                        if (item.id === id) {
                            item.percent = info.percent;
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
                            item.status = 2;
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
        removeImg(id) {
            this.pics.splice(id, 1);
        },
        submit() {
            this.$v.all.$touch();
            if (this.$v.all.$error) {
                return;
            }

            if (this.isSubmit) return;
            this.isSubmit = true;

            this.$http.post('/api/group/v3/auto/organ/submit', {
                chainCount: this.chainCount,
                organName: this.organName,
                legalPerson: this.legalPerson,
                legalPhone: this.legalPhone,
                identityCard: this.identityCard,

                bizLicense: this.pics[0].key,
                legalCardFront: this.pics[1].key,
                legalCardRev: this.pics[2].key,
                contactCardFront: this.pics[3].key,
                contactCardRev: this.pics[4].key,
                contactCardHand: this.pics[5].key
            }).then(() => {
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
        getInfor() {
            this.$http.get('/api/group/v3/auto/organ/info').then((response) => {
                const data = response.data;
                this.chainCount = data.chainCount || '';
                this.organName = data.organName || '';
                this.legalPerson = data.legalPerson || '';
                this.legalPhone = data.legalPhone || '';
                this.identityCard = data.identityCard || '';

                this.pics[0].status = data.bizLicense ? 2 : 0;
                this.pics[0].key = data.bizLicense;
                this.pics[0].url = data.bizLicenseUrl;

                this.pics[1].status = data.legalCardFront ? 2 : 0;
                this.pics[1].key = data.legalCardFront;
                this.pics[1].url = data.legalCardFrontUrl;

                this.pics[2].status = data.legalCardRev ? 2 : 0;
                this.pics[2].key = data.legalCardRev;
                this.pics[2].url = data.legalCardRevUrl;

                this.pics[3].status = data.contactCardFront ? 2 : 0;
                this.pics[3].key = data.contactCardFront;
                this.pics[3].url = data.contactCardFrontUrl;

                this.pics[4].status = data.contactCardRev ? 2 : 0;
                this.pics[4].key = data.contactCardRev;
                this.pics[4].url = data.contactCardRevUrl;

                this.pics[5].status = data.contactCardHand ? 2 : 0;
                this.pics[5].key = data.contactCardHand;
                this.pics[5].url = data.contactCardHandUrl;
            }, (response) => {
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
            });
        }
    },
    created() {
        this.getInfor();
    }
};

