
// 暗号：村长喊你来搬砖

// 模拟引入组件
let Dialog;
import Vue from 'vue';

function create(component, prop) {
    let instance =  new (Vue.extend(component))({propsData: prop})
    document.body.appendChild(instance.$mount().$el);
}

// 模拟调用
create(Dialog, {
    title: '标题',
    // xxx
    // xxx
})

