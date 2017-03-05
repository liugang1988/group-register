const config = require('./config.json');

// 润教育线上环境变量
const RUN_ENV = (process.env.RUN_ENV || '').trim();

const data = config[RUN_ENV] || config.dev || {
    domain: ''
};

console.log('current config:', RUN_ENV, data);

module.exports = data;

