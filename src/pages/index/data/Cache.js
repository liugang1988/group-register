const Cache = function Cache({
    max,
    load,
    getKey
}) {
    this.load = load; // 必须是Promise，否则报异常
    this.getKey = getKey || (key => key); // 获取唯一Key的方法
    this.max = max || 10; // 最大长度
    this.len = 0; // 当前长度
    this.newest = null;
    this.oldest = null;
    this.map = {}; // 存储的内容
    this.temp = {}; // 还在加载的内容，临时存储
};

Cache.prototype.getValue = function getValue(options) {
    const key = this.getKey(options);
    const item = this.map[key];
    // 是否存在
    if (item) {
        this.sort(item);
        return Promise.resolve({
            key,
            value: item.value
        });
    }

    // 是不是在缓存中还没加载好
    const t = this.temp[key];
    if (t) {
        return t;
    }

    const pr = this.load(options).then(
        (res) => {
            this.add(key, res);
            return {
                key,
                value: res
            };
        }
    );
    this.temp[key] = pr;
    return pr;
};

/**
 * 对已有的缓存标记为最新
 */
Cache.prototype.sort = function sort(item) {
    if (this.newest) {
        this.newest.next = item;
    }

    this.newest = item;
    item.prev = this.newest;
    item.next = null;

    if (this.oldest && this.oldest === item) {
        this.oldest = this.oldest.next;
    }
};

/**
 * 添加新的缓存
 */
Cache.prototype.add = function update(key, value) {
    delete this.temp[key]; // 清楚临时缓存

    const newest = this.newest;
    const cur = this.map[key] = {
        next: null,
        prev: newest,
        value
    };

    if (newest) {
        newest.next = cur;
    }

    this.newest = cur;

    if (this.oldest) {
        this.oldest = cur;
    }

    if (this.len < this.max) {
        this.len += 1;
    } else {
        this.oldest = this.oldest && this.oldest.next;
    }
};

export default Cache;

