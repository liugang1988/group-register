import getGroupDetail from '../data/getGroupDetail';
import getSelectGroup from '../data/getSelectGroup';
import qiniuUpload from '../../../utils/qiniuUpload';
import validatorMixin from '../../../utils/validatorMixin';
import {
    required,
    maxLength,
    isEmail,
    isLandlines,
    isMobile,
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
            default: 1
        }
    },
    data() {
        return {
            groupId: '',
            groupName: '', // 网店名称
            intro: '', // 网店简介
            subjects: [], // 教学科目
            featureSubject: '', // 特色科目
            address: '', // 机构地址
            regionId: '', // 区域编号
            contactMail: '', // 邮箱
            telephone: '', // 联系电话
            contactName: '', // 负责人
            contactPhone: '', // 负责人电话
            pics: [
                // {
                //     key: '1',
                //     url: 123
                // }
            ], // 机构图片

            subjectsItems: [], // 教学科目数据
            areaData: [],
            province: [], // 省
            city: [], // 市
            district: [], // 区
            trade: [], // 商圈
            provinceVal: '',
            cityVal: '',
            districtVal: '',
            tradeVal: '',
            provinceIndex: null, // 选择省索引
            cityIndex: null, // 选择市索引
            districtIndex: null, // 选择地区索引
            tradeIndex: null, // 选择商圈索引
            fullAddress: '',

            isInfor: false, // 是否存在数据

            info: {},
            isSubmit: false,
            isShowImageCropper: false,
            uploader: {},
            msg: {
                groupName: [{
                    type: 'required',
                    text: '网店名称不能为空！'
                }, {
                    type: 'maxLength',
                    text: '网店名称不能超过30字！'
                }, {
                    type: 'noSpace',
                    text: '网店名称不能有空格'
                }],
                intro: [{
                    type: 'maxLength',
                    text: '网店介绍不能超过2000字！'
                }],
                subjects: [{
                    type: 'required',
                    text: '请选择教学科目！'
                }],
                featureSubject: [{
                    type: 'maxLength',
                    text: '特色科目不能超过20字！'
                }, {
                    type: 'noSpace',
                    text: '特色科目不能有空格'
                }],
                tradeVal: [{
                    type: 'required',
                    text: '机构地址选择不能为空！'
                }],
                address: [{
                    type: 'required',
                    text: '机构地址不能为空！'
                }, {
                    type: 'maxLength',
                    text: '机构地址不能超过40字！'
                }, {
                    type: 'noSpace',
                    text: '机构地址不能有空格'
                }],
                regionId: [{
                    type: 'required',
                    text: '区域编号不能为空！'
                }],
                contactMail: [{
                    type: 'email',
                    text: '请填写正确的邮箱！'
                }],
                telephone: [{
                    type: 'isLandlines',
                    text: '请填写正确的联系电话！'
                }],
                contactName: [{
                    type: 'required',
                    text: '负责人不能为空！'
                }, {
                    type: 'maxLength',
                    text: '负责人不能超过15字！'
                }, {
                    type: 'noSpace',
                    text: '负责人不能有空格'
                }],
                contactPhone: [{
                    type: 'required',
                    text: '负责人电话不能为空！'
                }, {
                    type: 'isMobile',
                    text: '请正确填写负责人电话！'
                }],
                pics: [{
                    type: '$each',
                    text: '请确认是否有图片正在上传中，请稍后！'
                }]
            }
        };
    },
    validations: {
        groupName: {
            required,
            maxLength: maxLength(30),
            noSpace
        },
        intro: {
            maxLength: v => !required(v) || (maxLength(2000)(v))
        },
        subjects: {
            required
        },
        featureSubject: {
            maxLength: v => !required(v) || (maxLength(20)(v)),
            noSpace
        },
        tradeVal: {
            required
        },
        address: {
            required,
            maxLength: maxLength(40),
            noSpace
        },
        regionId: {
            required
        },
        contactMail: {
            isEmail: v => !required(v) || isEmail(v)
        },
        telephone: {
            isLandlines: v => !required(v) || isLandlines(v) || isMobile(v)

        },
        contactName: {
            required,
            maxLength: maxLength(15),
            noSpace
        },
        contactPhone: {
            required,
            isMobile
        },
        pics: {
            $each: {
                url: {
                    required
                }
            }
        },
        all: [
            'groupName',
            'intro',
            'subjects',
            'featureSubject',
            'tradeVal',
            'address',
            'pics',
            'regionId',
            'contactMail',
            'telephone',
            'contactName',
            'contactPhone'
        ]
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
        removeImg(index) {
            this.pics.splice(index, 1);
        },
        getInfor() {
            this.$http.get('/api/group/v3/auto/group/info').then((response) => {
                const data = response.data;
                if (data) {
                    this.isInfor = true;
                }

                if (data.applyType === 2) {
                    this.groupName = data.groupName;
                    if (data.intro) this.intro = data.intro;
                    if (data.featureSubject) this.featureSubject = data.featureSubject;
                    if (data.contactMail) this.contactMail = data.contactMail;
                    if (data.telephone) this.telephone = data.telephone;
                    this.contactName = data.contactName;
                    this.contactPhone = data.contactPhone;
                    //  教学科目
                    const subjectsArr = data.subjects.split(' ');
                    const len = subjectsArr.length;
                    const arr = [];
                    this.subjectsItems.forEach((element) => {
                        for (let i = 0; i < len; i++) {
                            if (subjectsArr[i] === element.name) {
                                arr.push(element.id);
                            }
                        }
                    });
                    this.subjects = arr;
                    if (data.pics) {
                        // 照片
                        this.pics = data.pics.map(item => ({
                            key: item.uri,
                            url: item.url
                        }));
                    }
                    // 地址
                    this.address = data.address;
                    this.regionId = data.regionId;
                    this.getArea(this.regionId, this.areaData);

                    this.getCity(this.provinceVal);
                    this.getDistrict(this.cityVal);
                    this.getTrade(this.districtVal);
                    this.getRegion(this.tradeVal);
                }
            }, () => {

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
        getArea(id, data) {
            const arr = this.getAreaName(id, data);
            this.provinceVal = arr[0];
            this.tradeVal = arr[3];
            this.districtVal = arr[2];
            this.cityVal = arr[1];
            this.fullAddress = arr.join('') + this.info.address;
        },
        getSubject() {
            this.$http.get('/api/cbs/v3/course/category/list')
                .then((response) => {
                    this.subjectsItems = response.data;
                }, (response) => {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
        },
        getAreaData() {
            this.$http.get('/api/cbs/v3/area/all')
                .then((response) => {
                    this.areaData = response.data;
                    this.getProvince();
                    if (this.errorStep) this.getInfor();
                }, (response) => {
                    this.toast({
                        content: response.statusText,
                        type: 'warn'
                    });
                });
        },
        getProvince() {
            this.areaData.map((item) => {
                this.province.push({
                    id: item.id,
                    name: item.name
                });
                return this.province;
            });
        },
        getCity(val) {
            if (val !== '') {
                if (this.provinceVal) {
                    const list = this.areaData;
                    const len = list.length;
                    for (let i = 0; i < len; i++) {
                        if (list[i].name === val) {
                            this.provinceIndex = i;
                        }
                    }
                    this.city = this.areaData[this.provinceIndex].areas;
                }
            } else {
                this.city = [];
                this.district = [];
                this.trade = [];
                this.cityVal = '';
                this.districtVal = '';
                this.tradeVal = '';
            }
        },
        getDistrict(val) {
            if (val !== '') {
                if (this.provinceVal && this.cityVal) {
                    const list = this.areaData[this.provinceIndex].areas;
                    const len = list.length;
                    for (let i = 0; i < len; i++) {
                        if (list[i].name === val) {
                            this.cityIndex = i;
                        }
                    }
                    this.district = this.areaData[this.provinceIndex].areas[this.cityIndex].areas;
                }
            } else {
                this.district = [];
                this.trade = [];
                this.districtVal = '';
                this.tradeVal = '';
            }
        },
        getTrade(val) {
            if (val !== '') {
                if (this.provinceVal && this.cityVal && this.districtVal) {
                    const list = this.areaData[this.provinceIndex].areas[this.cityIndex].areas;
                    const len = list.length;
                    for (let i = 0; i < len; i++) {
                        if (list[i].name === val) {
                            this.districtIndex = i;
                        }
                    }
                    this.trade = this.areaData[this.provinceIndex]
                        .areas[this.cityIndex]
                        .areas[this.districtIndex].areas;
                }
            } else {
                this.trade = [];
                this.tradeVal = '';
            }
        },
        getRegion(val) {
            if (this.provinceVal && this.cityVal && this.districtVal && this.tradeVal) {
                const list = this.areaData[this.provinceIndex]
                    .areas[this.cityIndex]
                    .areas[this.districtIndex].areas;
                const len = list.length;
                for (let i = 0; i < len; i++) {
                    if (list[i].name === val) {
                        this.tradeIndex = i;
                    }
                }
                this.regionId = this.areaData[this.provinceIndex]
                    .areas[this.cityIndex]
                    .areas[this.districtIndex].areas[this.tradeIndex].id;
            }
        },
        getPlace() {
            this.$v.tradeVal.$touch();
        },
        reSelect() {
            this.groupId = '';
            this.groupName = '';
            this.provinceVal = '';
            this.tradeVal = '';
            this.districtVal = '';
            this.cityVal = '';
            this.fullAddress = '';
        },
        select(item) {
            const groupId = this.groupId = item.groupId;

            getGroupDetail
                .getValue(groupId)
                .then(
                    (d) => {
                        if (d.key === groupId) {
                            this.info = d.value.data;
                            const addr = this.getArea(this.info.regionId, this.areaData);
                            this.info.address = addr + this.info.address;
                        }
                    }
                );
        },
        _search() {
            return getSelectGroup
                .getValue(this.groupName)
                .then(
                    (d) => {
                        if (d.key === this.groupName) {
                            return d.value.data.map((item) => {
                                item.value = item.groupName;
                                return item;
                            });
                        }
                        return null;
                    }
                );
        },
        commit(data) {
            this.$http.post('/api/group/v3/auto/group/submit', data).then(() => {
                this.$emit('next');
                this.isSubmit = false;
            }, (response) => {
                this.isSubmit = false;
                this.toast({
                    content: response.statusText,
                    type: 'warn'
                });
            });
        },
        submit() {
            let data = '';
            if (!this.groupId) {
                this.$v.all.$touch();
                if (this.$v.all.$error) {
                    return;
                }
                data = {
                    groupName: this.groupName,
                    intro: this.intro,
                    subjects: this.subjects.toString(),
                    featureSubject: this.featureSubject,
                    address: this.address,
                    regionId: this.regionId,
                    contactMail: this.contactMail,
                    telephone: this.telephone,
                    contactName: this.contactName,
                    contactPhone: this.contactPhone,
                    pics: this.pics.map(item => item.key).join(',')
                };
            } else {
                data = {
                    groupId: this.groupId
                };
            }
            if (this.isSubmit) return;
            this.confirm({
                title: '是否确认提交',
                content: '身份核实期间，资料不能随意修改，请确保正确无误。',
                callback: (vm, bl) => {
                    if (bl) {
                        this.isSubmit = true;
                        this.commit(data);
                    }
                    vm.visible = false;
                }
            });
        }
    },
    created() {
        this.getSubject();
        this.getAreaData();
    }
};

