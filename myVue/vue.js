function defineReactive(obj, key, val) {
    observe(val);


    // 每执行一次defineReactive，就创建一个Dep实例


    // 收集依赖，更新的过程
    // 对象的每个key都有对应的deps，当有依赖时（模版上有使用），在模版编译中，new一个watcher，在watcher内部Dep.target（相当于全局变量，一个中间承载容器）绑定当前watcher，并把调用时间（更新时间传入watcher.update）
    // 然后读取一次数据（触发对象拦截中的get函数，在get函数中收集依赖），触发deps.addDep，添加依赖。
    // 当修改数据时（触发set），调用deps.notify，去遍历调用deps内部的所有watcher


    const deps = new Dep();

    Object.defineProperty(obj, key, {
        get() {
            // 依赖收集
            Dep.target && deps.addDep(Dep.target)
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                observe(newVal);
                val = newVal;

                deps.notify();
            }

        }
    })
}


function observe(obj) {

    if (typeof obj !== 'object' || obj == null) {
        return;
    }
    new Observe(obj);

}


function proxy(vm) {
    Object.keys(vm.$data).forEach((key) => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                vm.$data[key] = newVal;
            }
        })
    })
}



class MyVue {

    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;

        // 响应化处理
        observe(this.$data);

        // 代理
        proxy(this);

        // 编译
        new Compile(this, options.el);
    }
}


class Observe {

    constructor(value) {

        this.walk(value)

    }

    walk(obj) {
        Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]))
    }
}


class Compile {

    constructor(vm, el) {
        this.$vm = vm;

        this.$el = document.querySelector(el);

        this.compile(this.$el)
    }

    compile(el) {
        // 递归遍历el
        el.childNodes.forEach((node) => {

            if (this.isElement(node)) {
                // console.log('编译元素', node.nodeName)
                this.compileElement(node);
            } else if (this.isInter(node)) {
                // console.log('差值表达式', node.textContent);
                this.compileText(node);
            }

            if (node.childNodes) {
                this.compile(node);
            }
        })

    }

    // 插值表达式编译
    compileText(node) {
        // console.log(this.$vm[RegExp.$1]);
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }


    // 节点编译
    compileElement(node) {
        const nodeAttrs = node.attributes;

        Array.from(nodeAttrs).forEach(attr => {
            // v-text="num"

            const attrName = attr.name; // v-text
            const exp = attr.value; // num

            // 判断指令
            if (this.isDirective(attrName)) {
                // 判断是否是绑定事件 v-on 在 v- 的判断内部
                if (this.isBindDirective(attrName)) {
                    this.bindDirective(node, attrName, exp)
                    return;
                }


                const dir = attrName.substring(2); // text

                // 执行指令
                this[dir] && this[dir](node, exp)
            }
        })
    }
    // 判断
    bindDirective(node, attrName, exp) {
        // 判断是否是点击事件
        if (attrName.indexOf('click') !== -1) {
            this.click(node, exp);
        }
    }


    click(node, exp) {
        const fn = this.$vm.$methods[exp];
        console.log(fn);
        node.addEventListener('click', fn.bind(this.$vm));
    }


    // isBindDirective
    isBindDirective(attrName) {
        return attrName.indexOf('v-on') !== -1;
    }


    

    // 文本指令
    text(node, exp) {
        this.update(node, exp, 'text')
        // node.textContent = this.$vm[exp];
    }

    textUpdater(node, val) {
        // console.log('val', val);
        node.textContent = val
    }

    // 更新
    update(node, exp, dir) {

        // 初始化
        // console.log('dir', dir);

        // 先把对应指令或表达式的渲染方法执行一次，然后放入watcher内存起来
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        // 更新
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }



    // 判断是否是指令
    isDirective(attrName) {
        return attrName.indexOf('v-') !== -1;
    }

    // 判断是否是元素
    isElement(node) {
        return node.nodeType === 1;
    }
    //判断是否是差值表达式
    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}

const callbacks = [];

class Watcher {
    constructor(vm, key, updateFn) {
        this.$vm = vm;
        this.$key = key;
        this.updateFn = updateFn;

        // 读一次数据，触发defineReactive里面的get()
        Dep.target = this;
        this.$vm[this.$key];
        Dep.target = null;

    }

    // 调用
    update() {
        this.updateFn.call(this.$vm, this.$vm[this.$key]);
        // queueWatcher()
    }

    // queueWatcher() {
    //     nextTick(flushSchedulerQueue)
    // }

    // flushSchedulerQueue() {
    //     this.updateFn.call(this.$vm, this.$vm[this.$key]);
    // }

    // nextTick(cb, ctx) {
    //     callbacks.push(() => {
    //         cb.call(ctx)
    //     })
    //     timerFunc()
    // }
    // timerFunc() {
    //     const p = Promise.resolve()
    //     p.then(flushCallbacks)
    // }
    // flushCallbacks () {
    //     for (let i = 0; i < callbacks.length; i++) {
    //         callbacks[i]()
    //     }
    // }
    
}


class Dep {
    constructor() {
        this.deps = [];
    }
    addDep(watcher) {
        this.deps.push(watcher);
    }

    notify() {
        this.deps.forEach(watcher => watcher.update());
    }


}

