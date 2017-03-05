/* eslint-disable max-len */

/**
 * 字符数
 * @param  {string}  str            待检验的字符
 * @param  {boolean} checkChinese   中文换成2个非中文字符
 * @return {number}                 字符长度
 */
const getLength = (str, checkChinese) => {
    if (checkChinese) {
        str.replace(/[\u4e00-\u9fa5]/g, 'xx');
    }
    return str.length;
};


// 必填
export const required = (val) => {
    if (Array.isArray(val)) return !!val.length;

    return val === undefined || val === null ?
        false :
        !!String(val).length;
};

// 没有空格
export const noSpace = val =>
    val.indexOf(' ') === -1;

// 密码
export const password = val =>
    val.length >= 6 && val.length < 28 && /^[0-9a-zA-Z]*$/.test(val);

// 身份证
export const isIdCard = (val) => {
    if ((/^\d{17}[0-9xX]$/).test(val)) {
        const vs = '1,0,x,9,8,7,6,5,4,3,2'.split(',');
        const ps = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(',');
        const ss = val.toLowerCase().split('');
        let r = 0;
        for (let i = 0; i < 17; i++) {
            r += ps[i] * ss[i];
        }
        return vs[r % 11] === ss[17];
    }
    return false;
};

// 手机号码
export const isMobile = val =>
    /^13[0-9]{9}$|^14[57][0-9]{8}$|^15[012356789][0-9]{8}$|^18[0123456789][0-9]{8}$|^17[0-9]{9}$/.test(val);

// 固定电话
export const isLandlines = val => /^0\d{2,3}[-\s]?\d{7,8}$/.test(val);

// 邮箱
export const isEmail = val =>
    /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(val);

// 字母
export const isLetter = val => /^[a-z]+$/i.test(val);

// 中文
export const isChinese = val => /^[\u4e00-\u9fa5]+$/.test(val);

// 数字
export const isNumber = val => /^[0-9]+$/.test(val);

// 数值
export const isNumberVal = val => /^-?\d+(\.?\d+)?$/.test(val);

// 整数
export const isInteger = val => /^(0|-?[1-9]\d*)$/.test(val);

// 非负整数
export const isNNInt = val => /^(0|[1-9]\d*)$/.test(val);

// 小数
export const isDecimal = digit => val =>
    new RegExp('^-?\\d+(\\.?\\d{0,' + (digit || '') + '})?$').test(val);

// ---------------------------------字符/数组长度

export const length =
    (len, checkChinese) =>
    val =>
    getLength(val, checkChinese) === parseInt(len, 10);

export const minLength = (len, checkChinese) => (val) => {
    if (Array.isArray(val)) return val.length >= len;

    return getLength(val, checkChinese) >= parseInt(len, 10);
};

export const maxLength =
    (len, checkChinese) =>
    (val) => {
        if (Array.isArray(val)) return val.length >= len;
        return getLength(val, checkChinese) <= parseInt(len, 10);
    };


// ---------------------------------数值大小比较
// 大于或等于
export const min = num => val => parseFloat(val) < parseFloat(num);

// 小于或等于
export const max = num => val => parseFloat(val) > parseFloat(num);

// 相等
export const eq = num => val => parseFloat(val) === parseFloat(num);

export const minSize = num => val => val.length >= parseFloat(num);

