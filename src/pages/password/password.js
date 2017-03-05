import Vue from 'vue';
import validatorMixin from '../../utils/validatorMixin';
import {
    required,
    length,
    isMobile
} from '../../utils/validators';
import VueGlobal from '../../utils/global';

Vue.use(VueGlobal);

new Vue({
    el: '#wrap',
    template: __inline('password.tpl'),
    mixins: [validatorMixin],
    data: {
        isStep1: true, // 第一步
        isStep2: false, // 第二步
        isStep3: false, // 第三步
        codeToken: '', // 验证token
        codeImg: '', // 验证图片地址

        isGetCode: false, // 验证码获取状态
        isSubmit: false, // 提交状态
        timer: 0, // 定时器
        times: 0,
        mobile: '',
        imgCode: '',
        code: '',

        msg: {
            mobile: [{
                type: 'required',
                text: '账户不能为空'
            }, {
                type: 'isMobile',
                text: '请填写正确的账户'
            }],
            imgCode: [{
                type: 'required',
                text: '请输入验证码'
            }, {
                type: 'length',
                text: '验证码错误'
            }],
            code: [{
                type: 'required',
                text: '请输入验证码'
            }, {
                type: 'length',
                text: '验证码错误'
            }]
        },
        checkMobileText: '',
        checkImgCodeText: '',
        checkCodeText: ''
    },
    validations: {
        mobile: {
            required,
            isMobile
        },
        imgCode: {
            required,
            length: length(4)
        },
        code: {
            required,
            length: length(4)
        },
        step1: ['mobile', 'imgCode'],
        step2: ['code']
    },
    methods: {
        // 验证手机号是否注册
        checkPhone(mobile) {
            this.$v.mobile.$touch();
            if (this.$v.mobile.$error || this.checkMobileText) return;
            this.$http.get('/api/group/v3/group/check', {
                params: {
                    mobile
                }
            }).then((response) => {
                const flag = response.data.exist;
                this.checkMobileText = !flag ? '账号不存在！' : '';
            }, (response) => {
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
            });
        },
        changePhone() {
            this.checkMobileText = '';
            return this.$v.mobile.$error;
        },
        // 获取图片验证码
        getCodeTokenImg() {
            this.$http.get('/api/cbs/v3/verifycode/getcode')
                .then((response) => {
                    this.codeToken = response.data.token;
                    this.codeImg = response.data.img;
                }, (response) => {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
        },
        // 换一张验证图
        changeCode() {
            this.getCodeTokenImg();
        },
        resetImgCode() {
            this.checkImgCodeText = '';
            return this.$v.imgCode.$error;
        },
        // 获取验证码
        getCode() {
            if (this.isGetCode || this.times) return;
            this.isGetCode = true;
            this.$http.post('/api/group/v3/sms/getcode', {
                mobile: this.mobile,
                type: 11,
                smsType: 1
            }, {
                hash: true
            }).then((response) => {
                this.times = response.data.expire;
                this.countdown();
            }, (response) => {
                if (response.data.h.code === 3) {
                    this.times = 100;
                    this.countdown();
                } else {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                }
            });
        },
        countdown() {
            this.timer = setTimeout(() => {
                this.countdown();
            }, 1000);

            if (this.times === 0) {
                this.isGetCode = false;
                clearTimeout(this.timer);
            } else {
                this.times--;
            }
        },
        resetCode() {
            this.checkCodeText = '';
            return this.$v.code.$error;
        },
        next() {
            this.$v.step1.$touch();
            if (this.$v.step1.$error || this.checkMobileText) {
                return;
            }
            if (this.isSubmit) return;
            this.isSubmit = true;

            this.$http.post('/api/cbs/v3/verifycode/right', {
                token: this.codeToken,
                codeImg: this.imgCode
            }).then(() => {
                this.checkImgCodeText = '';
                this.isSubmit = false;
                this.isStep1 = false;
                this.isStep2 = true;
                this.getCode();
            }, (response) => {
                if (response.data.h.code === 1003) {
                    this.checkImgCodeText = '验证码错误！';
                } else {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                }
                this.isSubmit = false;
            });
        },
        hideMobile(value) {
            return value.replace(/\d{7}/, '*******');
        },
        submit() {
            this.$v.step2.$touch();
            if (this.$v.step2.$error || this.checkCodeText) {
                return;
            }
            if (this.isSubmit) return;
            this.isSubmit = true;
            this.$http.post('/api/group/v3/group/find/password', {
                mobile: this.mobile,
                code: this.code,
                token: this.codeToken,
                codeImg: this.imgCode
            }).then(() => {
                this.isSubmit = false;
                this.isStep2 = false;
                this.isStep3 = true;
                this.checkCodeText = '';
            }, (response) => {
                this.isSubmit = false;
                if (response.data.h.code === 1098) {
                    this.checkCodeText = '手机验证码错误！';
                } else {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                }
            });
        },
        goLogin() {
            location.href = location.origin.replace('group.', 'www.') + '/b/login.html';
        }
    },
    created() {
        this.getCodeTokenImg();
    }
});

