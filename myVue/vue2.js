
// 响应式
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            return val;
        },
        set(newVal) {
            val = newVal;
        }
    })
}

function observe(data) {
    if (data === null || typeof data !== 'object') {
        return;
    }

    new Observe(data)
}

function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key];
            },
            set(newVal) {
                vm.$data[key] = newVal;
            }
        })
    })
}


class MyVue {
    constructor(options) {
        this.$vm = this;
        this.$option = options;
        this.$data = options.data;

        observe(this.$data);

        proxy(this)

        new Compile(this, this.$option.el)
    }

}

class Observe {
    constructor(data) {
        this.walk(data);
    }

    walk(data) {
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }

}

class Compile {
    constructor(vm, el) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        this.$option = vm.$option;
        this.compile(this.$el)
    }

    compile(el) {

        el.childNodes.forEach(node => {
            
            // 如果是元素
            if (this.isElement(node)) {
                this.elementCompile(node)
            } else if (this.isInster(node)) {
                // console.log(2131);
                // 如果是差值表达式
                this.textCotent(node)
            }

            // 递归调用
            if (node.childNodes) {
                this.compile(node);
            }
        })
    }

    // 元素编译
    // 如果是元素，获取元素标签上的属性，判断其
    elementCompile(node) {
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // v-text="num"
            const attrsName = attr.name;
            const exp = attr.value;

            // 判断是否是指令
            // if () {

            // }
        })
    }

    textCotent(node) {
        console.log(this.$vm[RegExp.$1]);
        node.textContent = this.$vm[RegExp.$1];
    }



    // 判断是否是元素
    isElement(node) {
        return node.nodeType === 1;
    }

    // 判读是否是差值表达式
    isInster(node) {
        // console.log(node,node.nodeType);
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

}