/* 全局方法 */
import toast from './toast';
import modal from './modal';
import http from './http';

import uiHeader from '../components/header';
import uiIcon from '../components/icon';
import uiButton from '../components/button';
import uiDialog from '../components/dialog';
import uiForm from '../components/form';
import uiFormItem from '../components/form-item';
import uiFormUploadImg from '../components/form-upload-img';
import uiFormUploadImgs from '../components/form-upload-imgs';
import uiCheckbox from '../components/checkbox';
import uiRadio from '../components/radio';
import uiAutocomplete from '../components/autocomplete';

const VueGlobal = {};
VueGlobal.install = (Vue) => {
    // 全局组件
    Vue.component('uiAutocomplete', uiAutocomplete);
    Vue.component('uiHeader', uiHeader);
    Vue.component('uiIcon', uiIcon);
    Vue.component('uiButton', uiButton);
    Vue.component('uiDialog', uiDialog);
    Vue.component('uiForm', uiForm);
    Vue.component('uiFormItem', uiFormItem);
    Vue.component('uiFormUploadImg', uiFormUploadImg);
    Vue.component('uiFormUploadImgs', uiFormUploadImgs);
    Vue.component('uiCheckbox', uiCheckbox);
    Vue.component('uiRadio', uiRadio);

    // 实例方法
    Vue.prototype.$http = http;
    Vue.prototype.toast = toast;
    Vue.prototype.alert = modal.alert;
    Vue.prototype.confirm = modal.confirm;
};

export default VueGlobal;
