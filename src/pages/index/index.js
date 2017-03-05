import Vue from 'vue';
import VueGlobal from '../../utils/global';
import uiStepHeader from './header';
import uiBar from './bar';
import uiStep1 from './step2';
import uiStep2 from './step3';
import uiStep3 from './step4';
import uiStep4 from './step5';
import uiStep5 from './step6';
import uiStep6 from './step7';

Vue.use(VueGlobal);

new Vue({
    el: '#wrap',
    components: {
        uiStepHeader,
        uiBar,
        uiStep1,
        uiStep2,
        uiStep3,
        uiStep4,
        uiStep5,
        uiStep6
    },
    data: {
        isInit: true,
        items: [
            '提交申请',
            '补充资料',
            '资质审核',
            '签署合同',
            '支付',
            '完成'
        ],
        isShowImageCropper: false,
        errorStep: 0,
        currentStep: 0,
        refuseReason: '',
        nextStep: 0,
        loginUrl: location.protocol + '//' + location.host.replace('www.', 'group.') + '/frame.html'
    },
    computed: {
        componentId() {
            return 'ui-step' + this.currentStep;
        }
    },
    methods: {
        next() {
            if (this.currentStep < this.nextStep) {
                this.currentStep = this.nextStep;
            } else {
                this.currentStep++;
            }
            window.scrollTo(0, 0);
        }
    },
    created() {
        this.$http.get('/api/group/v3/auto/get/currentstep').then(
            (res) => {
                this.isInit = false;
                const data = res.data;
                const errorStep = this.errorStep = data.errorStep;
                this.nextStep = data.currentStep;

                // 0、无状态
                // 1、网店资料未通过
                // 2、公司信息未通过
                // 3、网店资料未通过并且已提交公司资料
                if (errorStep) {
                    this.refuseReason = data.refuseReason;
                    this.currentStep = errorStep;
                    this.confirm({
                        type: 'confirm',
                        title: '',
                        content: '抱歉，审核不通过，请修改后重新提交',
                        okText: '马上修改',
                        cancelText: '稍后修改，先退出',
                        callback(vm, state) {
                            if (!state) {
                                location.href = location.origin.replace('group.', 'www.') + '/b/login.html';
                            }
                            vm.visible = false;
                        }
                    });
                } else if (data.currentStep === 7) {
                    location.href = this.loginUrl; // 跳转
                } else {
                    this.currentStep = data.currentStep;
                    if (this.currentStep > 1) {
                        const self = this;
                        this.confirm({
                            type: 'confirm',
                            title: '',
                            content: '上次退出时，您正在操作:' + self.items[data.currentStep - 1],
                            okText: '继续完成',
                            cancelText: '稍后继续，先退出',
                            callback(vm, state) {
                                if (!state) {
                                    location.href = location.origin.replace('group.', 'www.') + '/b/login.html';
                                }
                                vm.visible = false;
                            }
                        });
                    }
                }
            },
            (res) => {
                this.isInit = false;
                this.toast({
                    content: res.statusText,
                    type: 'warn'
                });
            }
        );
    }
});

