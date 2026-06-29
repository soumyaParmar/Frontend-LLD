export let filterVal = (val,arr)=>{
    return arr.filter((word)=> word.toLowerCase().startsWith(val.toLowerCase()))
}

export let debounceFn = (fn,delay=1000) =>{
    if(typeof fn !== 'function'){
        throw new Error("Please provide a function ")
    }

    let timer;
    function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    }

    debounced.cancel = () =>{
        if(!timer) return;
        clearTimeout(timer);
        timer = null;
    }

    return debounced;
}