// const p1 = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log('p1')
//         resolve()
//       }, 2000)
//     })
//   }
//   const p2 = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log('p2')
//         resolve()
//       }, 2000)
//     })
//   }
//   const p3 = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log('p3')
//         resolve()
//       }, 2000)
//     })
//   }
//   //期待每隔两秒输出p1、p2、p3，最后输出'done'
//   createQueue([p1, p2, p3]).then((msg) => {
//     console.log(msg) // 'done'
//   })
  
// function createQueue(tasks) {
//     return new Promise((resolve) => {
//         let fn = ()=>{
//             tasks.shift()().then(() => {
//                 if(tasks.length <= 0) {
//                     resolve('done')
//                     return;
//                 }
//                 fn();
//             })
//         }
//         fn()
//     })
// }




var nums = [1, 2, 3, -1, -2, 0, 4, 0, -1];
var n = 0;
let a = fn(nums, n);
console.log(a);

// [[1,-1], [2, -2], [0, 0]]


function fn(nums, n) {
    if (!nums.length) {
        return [];
    }
    let j = n - nums.shift();
    let index = nums.indexOf(j);
    if (index !== -1) {
        return [ [j, nums.splice(index, 1)[0]] ].concat(fn(nums, n));
    } else {
        return fn(nums, n);
    }
}