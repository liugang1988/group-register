const bindEvent = (() => {
    if (document.addEventListener) {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    }
    return (element, event, handler) => {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    };
})();

const nodeList = [];
const ctx = '@@clickoutsideContext';

bindEvent(document, 'click', (e) => {
    nodeList.forEach(node => node[ctx].documentHandler(e));
});

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
    bind(el, binding, vnode) {
        const id = nodeList.push(el) - 1;
        const documentHandler = (e) => {
            if (!vnode.context ||
                el.contains(e.target) ||
                (vnode.context.popperElm &&
                    vnode.context.popperElm.contains(e.target))) return;

            if (binding.expression &&
                el[ctx].methodName &&
                vnode.context[el[ctx].methodName]) {
                vnode.context[el[ctx].methodName]();
            } else if (el[ctx].bindingFn) {
                el[ctx].bindingFn();
            }
        };
        el[ctx] = {
            id,
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },

    update(el, binding) {
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },

    unbind(el) {
        const len = nodeList.length;

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
};
