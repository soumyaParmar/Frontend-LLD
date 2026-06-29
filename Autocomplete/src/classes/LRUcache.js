export class LRUCache {
    constructor(capicity) {
        this.capicity = capicity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const data = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, data);

        return data;
    }

    put(key, val) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        if (this.capicity <= this.cache.size) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, val);
    }
}