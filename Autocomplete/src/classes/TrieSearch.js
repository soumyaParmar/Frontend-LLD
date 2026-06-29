class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.word = null;
    }
}

class TrieSearch {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        if (!word) return;
        const str = word.toLowerCase();
        let node = this.root;

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }

            node = node.children.get(char);
        }

        node.isEndOfWord = true;
        node.word = word;
    }

    search(prefix) {
        if (!prefix) return null;
        const str = prefix.toLowerCase();
        let node = this.root;

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            if (!node.children.has(char)) {
                return null;
            }

            node = node.children.get(char);
        }

        return node;
    }

    getWordsWithPrefix(prefix) {
        const startNode = this.search(prefix);
        if (!startNode) return [];

        const results = [];
        this._dfs(startNode, results);
        return results;
    }

    _dfs(node, results) {
        if (!node) return;

        if (node.isEndOfWord) {
            results.push(node.word);
        }

        for (const childNode of node.children.values()) {
            this._dfs(childNode, results);
        }
    }
}

export { TrieSearch };