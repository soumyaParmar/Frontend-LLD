import { LRUCache } from "./LRUcache.js";
import { debounceFn } from "../utils.js";

class Autocomplete {
    constructor({
        input,
        dropdown,
        fetchSource,
        debounceTime = 300,
        minChars = 1,
        onSelect = () => {}
    }) {
        this.input = input;
        this.dropdown = dropdown;
        this.fetchSource = fetchSource;
        this.debounceTime = debounceTime;
        this.minChars = minChars;
        this.onSelect = onSelect;

        this.results = [];
        this.activeId = -1; 
        this.cache = new LRUCache(30);
        this.abortController = null;

        this.onInput = this.onInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onDropdownClick = this.onDropdownClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);

        this.debouncedSearch = debounceFn(this.performSearch.bind(this), this.debounceTime);

        this.init();
    }

    init() {
        this.input.addEventListener('input', this.onInput);
        this.dropdown.addEventListener('click', this.onDropdownClick);
        document.addEventListener('click', this.onOutsideClick);
        this.input.addEventListener('keydown', this.onKeyDown);
    }

    onInput(e) {
        const val = e.target.value;

        if (!val || val.length < this.minChars) {
            this.abortCurrentRequest();
            this.debouncedSearch.cancel();
            this.closeDropdown();
            return;
        }

        this.debouncedSearch(val);
    }

    abortCurrentRequest() {
        if (!this.abortController) return;
        this.abortController.abort();
        this.abortController = null;
    }

    async performSearch(query) {
        const cached = this.cache.get(query);
        
        if (cached !== -1) {
            this.results = cached;
            this.renderResults(query);
            return;
        }
        
        this.abortCurrentRequest();
        this.abortController = new AbortController();

        try {
            const res = await this.fetchSource(query, this.abortController.signal);
            this.cache.put(query, res);
            this.results = res;
            this.renderResults(query);
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error("Failed to fetch", error);
        } finally {
            this.abortController = null;
        }
    }

    renderResults(query) {
        this.dropdown.innerHTML = "";
        if (!this.results.length) {
            this.dropdown.innerHTML = "<li class='empty'>No Result</li>";
            return;
        }

        this.dropdown.classList.remove("hide");
        this.input.setAttribute('aria-expanded', 'true');

        this.results.forEach((item, index) => {
            let li = document.createElement('li');
            li.textContent = item;
            li.id = `res-${index}`;
            li.setAttribute('role', 'option');
            this.dropdown.appendChild(li);
        });
    }

    onKeyDown(e) {
    }

    navigate(direction) {
    }

    select(value) {
    }

    onDropdownClick(e) {
    }

    onOutsideClick(e) {
    }

    closeDropdown() {
        this.dropdown.classList.add("hide");
        this.input.setAttribute("aria-expanded", "false");
        this.activeId = -1;
    }

    highlightMatch(text, query) {
    }
}

export { Autocomplete };
