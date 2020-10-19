/**
 * 装饰器工厂
 * 方法装饰器
 */

export function log(parmas: any) {
        return function (target: any,propertyKey: string, descriptor: PropertyDescriptor) {
            console.log(target);
            let oldMedthod = descriptor.value;
            descriptor.value = function () {
                console.log(parmas, new Date())
                oldMedthod.apply(target);
            }
        }
}
