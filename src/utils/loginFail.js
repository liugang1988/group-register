/**
 * 润教育系统token失效
 */
export default () => {
    if (location.href.indexOf('group.') >= 0) {
        // 如果是配置了线上环境
        location.href = location.origin.replace('group.', 'www.') + '/b/login.html';
    } else {
        // 如果是本地环境
        alert('请重新登录！');
    }
};

