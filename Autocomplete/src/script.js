import { Autocomplete } from "./classes/Autocomplete.js";
import { TrieSearch } from "./classes/TrieSearch.js";
import { words } from "./data.js";
import { debounceFn, filterVal } from "./utils.js";

const trie = new TrieSearch();
words.forEach(word => trie.insert(word));

const mockAPI = (query,signal) =>{
    console.log(query)
    return new Promise((resolve,reject)=>{
        const timer = setTimeout(()=>{
            const matched = trie.getWordsWithPrefix(query);
            
            resolve(matched);
        },500)

        signal.addEventListener('abort',()=>{
            clearTimeout(timer);
            reject(new Error("Request Aborted"))})
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    let input = document.getElementById('search-box');
    let dropDown = document.querySelector(".search-dropdown");
    new Autocomplete({
        input:input,
        dropdown:dropDown,
        fetchSource: mockAPI,
        debounceTime:500,
        minChars:2,
        onSelect: (value)=>{
            input.value = value;
            console.log("Selected:",value);
        }
    })
})