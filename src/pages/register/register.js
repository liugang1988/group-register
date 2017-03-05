import Vue from 'vue';
import validatorMixin from '../../utils/validatorMixin';
import {
    required,
    length,
    isMobile,
    password
} from '../../utils/validators';
import VueGlobal from '../../utils/global';

Vue.use(VueGlobal);

new Vue({
    el: '#wrap',
    template: __inline('register.tpl'),
    mixins: [validatorMixin],
    data: {
        isGetCode: false,
        isSubmit: false,
        timer: 0, // 定时器
        times: 0,

        mobile: '',
        code: '',
        password: '',
        repeatPassword: '',

        msg: {
            mobile: [{
                type: 'required',
                text: '手机号码不能为空'
            }, {
                type: 'isMobile',
                text: '手机号码错误'
            }],
            code: [{
                type: 'required',
                text: '请输入验证码'
            }, {
                type: 'length',
                text: '验证码错误'
            }],
            password: [{
                type: 'required',
                text: '密码不能为空'
            }, {
                type: 'password',
                text: '密码必须是字母、数字的组合，长度6-28位'
            }],
            repeatPassword: [{
                type: 'required',
                text: '请再次输入密码'
            }, {
                type: 'sameAs',
                text: '两次密码不一致'
            }]
        },
        checkMobileText: ''
    },
    validations: {
        mobile: {
            required,
            isMobile
        },
        code: {
            required,
            length: length(4)
        },
        password: {
            required,
            password
        },
        repeatPassword: {
            required,
            sameAs: function sameAs(val) {
                return this.password === val;
            }
        },
        all: ['mobile', 'code', 'password', 'repeatPassword']
    },
    methods: {
        checkPhone(mobile) {
            this.$v.mobile.$touch();
            if (this.$v.mobile.$error || this.checkMobileText) return;
            this.$http.get('/api/group/v3/auto/register/isexist', {
                params: {
                    mobile
                }
            }).then((response) => {
                const flag = response.data.flag;
                this.checkMobileText = flag === 1 ? '该手机号已经注册！' : '';
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
        getCode() {
            if (this.isGetCode || this.times) return;

            this.$v.mobile.$touch();
            if (this.$v.mobile.$error || this.checkMobileText) return;

            this.isGetCode = true;

            this.$http.post('/api/group/v3/sms/getcode', {
                mobile: this.mobile,
                type: 5,
                smsType: 1
            }, {
                hash: true
            }).then(() => {
                this.times = 100;
                this.countdown();
            }, (res) => {
                this.toast({
                    content: res.statusText,
                    type: 'warn'
                });
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
        goLogin() {
            location.href = location.origin.replace('group.', 'www.') + '/b/login.html';
        },
        submit() {
            this.$v.all.$touch();
            if (this.$v.all.$error) {
                return;
            }
            if (this.isSubmit) return;
            this.isSubmit = true;

            this.$http.post('/api/group/v3/auto/register', {
                mobile: this.mobile,
                code: this.code,
                password: this.password
            }).then(() => {
                this.isSubmit = false;
                location.href = 'index.html';
            }, (response) => {
                this.isSubmit = false;
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
            });
        }
    }
});

