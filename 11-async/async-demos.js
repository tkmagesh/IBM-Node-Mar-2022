(function(){

    //sync
    function f1Sync(){
        console.log(`f1Sync started`)
        console.log(`f1Sync completed`)
    }

    function f2Sync(){
        console.log(`f2Sync started`)
        console.log(`f2Sync completed`)
    }

    function f3Sync(){
        console.log(`f3Sync started`)
        console.log(`f3Sync completed`)
    }

    function f4Sync(){
        console.log(`f4Sync started`)
        console.log(`f4Sync completed`)
    }

    /* 
    function runSync(){
        f1Sync()
        f2Sync()
        f3Sync()
        f4Sync()
    } 
    */

    var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

    function runSync(){
        for(let idx = 0; idx < syncFns.length; idx++){
            let syncFn = syncFns[idx];
            syncFn()
        }
    }

    globalThis['runSync'] = runSync

    //async
    function f1Async(next){
        console.log(`f1Async started`)
        setTimeout(function(){
            console.log(`f1Async completed`)
            if (typeof next === 'function'){
                next()
            }
        }, 5000)
    }

    function f2Async(next){
        console.log(`f2Async started`)
        setTimeout(function(){
            console.log(`f2Async completed`)
            if (typeof next === 'function'){
                next()
            }
        }, 2000)
    }

    function f3Async(next){
        console.log(`f3Async started`)
        setTimeout(function(){
            console.log(`f3Async completed`)
            if (typeof next === 'function'){
                next()
            }
        }, 3000)
    }

    function f4Async(next){
        console.log(`f4Async started`)
        setTimeout(function(){
            console.log(`f4Async completed`)
            if (typeof next === 'function'){
                next()
            }
        }, 4000)
    }

    const asyncFns = [f1Async, f2Async, f3Async, f4Async]

    function runAsync(){
       function exec(fns){
           let first = fns[0],
                remaining = fns.slice(1),
                next = function(){
                    exec(remaining);
                };
            if (typeof first === 'function'){
                first(next)
            }
       }
       exec(asyncFns);
    }

    globalThis['runAsync'] = runAsync
})()