const PANDING = 'PANDING';
const RESOLVE = 'RESOLVE';
const REJECTED = 'REJECTED';

// class Promise {
//     constructor(executor) {
//         this.status = PANDING;
//         this.value = undefined;
//         this.reason = undefined;


//         this.resolves = [];
//         this.rejects = [];

//         const resolve = (value) => {
//             if (this.status === PANDING) {
//                 this.status = RESOLVE;
//                 this.value = value;

//                 while (this.resolves.length) {
//                     let callbacks = this.resolves.shift();
//                     callbacks(this.value);
//                 }
//             }
//         }

//         const reject = (reason) => {
//             if (this.status === PANDING) {
//                 this.status = REJECTED;
//                 this.reason = reason;

//                 while (this.rejects.length) {
//                     let callbacks = this.rejects.shift();
//                     callbacks(this.reason);
//                 }
//             }
//         }


        

//         try {
//             executor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }
//     }


//     then(resolve, reject){
//         if (this.status === RESOLVE) {
//             resolve(this.value)
//         }
//         if (this.status === REJECTED) {
//             reject(this.reason)
//         }
//         if (this.status === PANDING) {
//             this.resolves.push(resolve);
//             this.rejects.push(reject);
//         }
//     }
// }



// let p1 = new Promise(function(resolve, reject){
//     setTimeout(function() {
//         reject(10);
//     }, 1000);
// });
// let p2 = new Promise(function(resolve, reject){
//     setTimeout(function() {
//         reject(20);
//     }, 2000);
// });

// p1.then(function(num){
//     console.log(num);
// }, function(err) {
//     console.log(err);
// });
// p2.then(function(num){
//     console.log(num);
// }, function(err) {
//     console.log(err);
// });





// 手写promis的思路：
// 在class类的构造函数内写定义好当前的状态，并定义两个数组用于存放成功和失败回调
// 并在构造函数内传入executor，直接执行



class Promise2 {
    constructor(executor) {
        this.status = PANDING
        this.rejects = []
        this.resolves = []


        this.value = undefined
        this.reason = undefined

        const resolve = (value) => {
            if (this.status = PANDING) {
                this.status = RESOLVE
                this.value = value
                
                while (this.resolves.length) {
                    let callback = this.resolves.shift();
                    callback(this.value)
                }
            }
        }

        const reject = (reason) => {
            if (this.status = PANDING) {
                this.status = REJECTED
                this.reason = reason
                
                while (this.rejects.length) {
                    let callback = this.rejects.shift();
                    callback(this.reason)
                }
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(resovle, reject) {

        typeof resovle !== 'function' ? resovle = (value) => vlaue : null;
        typeof reject !== 'function' ? reject = (error) => { throw new Error(error) } : null;

        return new Promise2((resovleFn, rejectFn) => {

            const succes = (value) => {
                if (this.status === PANDING) {
                    this.value = value;
                    this.status = RESOLVE
                    let res = resovle(resovleFn);
                    res instanceof Promise2 ? res.then(resovleFn, rejectFn)  : resovleFn(res)
                }
                
                
            }


            switch (this.status) {
                case PANDING:
                    this.resolves.push(resovleFn);
                    this.rejects.push(rejectFn);
                    break;
                case RESOLVE:
                    resovleFn(this.value);
                    break;
                case REJECTED:
                    rejectFn(this.reason);
                    break;
                default:
                    break;
            }
        })

    }
}


























class Promise1 {
    constructor(executor) {

        this.status = PANDING;
        this.value = undefined;
        this.reason = undefined;

        this.resolves = [];
        this.rejects = [];


        const resolve = (value) => {
            if (this.status === PANDING) {
                this.status = RESOLVE;
                this.value = value;
                while (this.resolves.length) {
                    let callback = this.resolves.shift();
                    callback(this.value);
                }
            }
        }

        const reject = (reason) => {
            if (this.status === PANDING) {
                this.status = REJECTED;
                this.reason = reason;

                while (this.rejects.length) {
                    let callback = this.rejects.shift();
                    callback(this.reason);
                }
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }


    then(resolve, reject) {

        typeof resolve !== 'function' ? resolve = (value) => value : resolve = resolve;
        typeof reject !== 'function' ? reject = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason )
        } : reject;


        return new Promise1((resolveFn, rejectFn) => {

            const fulfilished = (value) => {
                try {
                    this.value = value;
                    let res = resolve(value);
                    res instanceof Promise1 ? res.then(resolveFn,rejectFn) : resolveFn(res)
                } catch (error) {
                    rejectFn(error)
                }
            }

            const rejected = (reason) => {
                try {
                    this.reason = reason;
                    let res = reject(reason);
                    res instanceof Promise1 ? res.then(resolveFn,rejectFn) : rejectFn(res)
                } catch (error) {
                    rejectFn(error)
                }
            }

            switch (this.status) {
                case RESOLVE:
                    fulfilished(this.value)
                    break;
                case REJECTED:
                    rejected(this.reason)
                    break;
                case PANDING:
                    this.resolves.push(fulfilished);
                    this.rejects.push(rejected);
                    break;
            }
        })

        
        // if (this.status === RESOLVE) {
        //     resolve(this.value)
        // }

        // if (this.status === REJECTED) {
        //     reject(this.reason)
        // }

        // if (this.status === PANDING) {
        //     this.resolves.push(resolve)
        //     this.rejects.push(reject)
        // }
    }
}

let p1 = new Promise1(function(resolve, reject){
    setTimeout(function() {
        resolve(10);
    }, 1000);
});
let p2 = new Promise1(function(resolve, reject){
    setTimeout(function() {
        resolve(20);
    }, 2000);
});


p1.then().then(function(num){
    console.log(num);
    return new Promise1(function(resolve, reject){
        setTimeout(function() {
            resolve(30);
        }, 3000);
    })
}, function(err) {
    console.log(err);
}).then((res) => {
    console.log(res);
})
p2.then(function(num){
    console.log(num);
}, function(err) {
    console.log(err);
});



  const promise4 = Promise.resolve(1)
  const promise5 = Promise.reject('reject')
  const promise6 = Promise.resolve(3)

  Promise.all([promise4, promise5,promise6]).then(res => {
    console.log(res, 'resolve')
  }).catch(e => {
    console.log(e)
  })

