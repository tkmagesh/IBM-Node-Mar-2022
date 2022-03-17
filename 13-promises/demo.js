(() => {
    function addAsync(x,y, callback){
        console.log(`   [@service] processing ${x} and ${y}`)
        setTimeout(() => {
            const result = x + y
            console.log(`   [@service] returning result`)
            callback(result)
        },5000)
    }

    function addAsyncClient(){
        console.log(`[@client] invoking the service`);
        addAsync(100,200, (result) => {
            console.log(`[@client] result = ${result}`);
        })
    }

    globalThis['addAsyncClient'] = addAsyncClient;

    function addAsyncPromise(x,y){
        console.log(`   [@service] processing ${x} and ${y}`)
        const promise = new Promise(function(resolveFn, rejectFn){
            setTimeout(() => {
                const result = x + y
                console.log(`   [@service] returning result`)
                resolveFn(result);
            },5000)
        });
        return promise;
    }

    /* 
        subscribing to the promise 
        
        p.then(() => {}) //resolved
        p.catch(() => {}) //rejected
        
        */

   /* 
    function addAsyncPromiseClient(){
        console.log(`[@client] invoking the service`);
        var p = addAsyncPromise(100,200);
        p.then(result => {
            console.log(`[@client] result = ${result}`);
        })
    } 
    */

    async function addAsyncPromiseClient(){
        console.log(`[@client] invoking the service`);
        var result = await addAsyncPromise(100,200);
        console.log(`[@client] result = ${result}`);
        return result * 2
    }

    globalThis['addAsyncPromiseClient'] = addAsyncPromiseClient

})();