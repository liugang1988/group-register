/**
 * modal 工具方法
 */

import Vue from 'vue';
import uiModal from '../components/modal';

let instance;

const defaultOptions = {
    type: 'alert',
    title: '',
    content: '',
    okText: '确定',
    cancelText: '取消',
    callback: function callback(vm) {
        vm.visible = false;
    }
};

const Constructor = Vue.extend(uiModal);

const getAnInstance = () => new Constructor({
    el: document.createElement('div')
});

const Modal = (options = {}) => {
    if (!instance) {
        instance = getAnInstance();
        document.body.appendChild(instance.$el);
    }

    options = {
        ...defaultOptions,
        ...options
    };

    Object.keys(options).map((prop) => {
        instance[prop] = options[prop];
        return false;
    });

    Vue.nextTick(() => {
        instance.visible = true;
    });

    return instance;
};

export default {
    alert: (options = {}) => Modal(options),
    confirm: (options = {}) => {
        options.type = 'confirm';
        return Modal(options);
    }
};
