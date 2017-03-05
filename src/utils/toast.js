/**
 * toast 工具方法
 */

import Vue from 'vue';
import toast from '../components/toast';

const ToastConstructor = Vue.extend(toast);
const toastPool = [];

const getAnInstance = () => {
    if (toastPool.length > 0) {
        const instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

const returnAnInstance = (instance) => {
    if (instance) {
        toastPool.push(instance);
    }
};

const removeDom = (target) => {
    if (target.parentNode) {
        target.parentNode.removeChild(target);
    }
};

ToastConstructor.prototype.close = function close() {
    this.visible = false;
    removeDom(this.$el);
    this.closed = true;
    returnAnInstance(this);
};

export default ({
    duration = 1500,
    content,
    type
} = {}) => {
    const instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.content = content;
    instance.type = type;

    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
        if (instance.type !== 'loading') {
            instance.timer = setTimeout(() => {
                if (instance.closed) return;
                instance.close();
            }, duration);
        }
    });
    return instance;
};
