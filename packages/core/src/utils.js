/**
 * @description: 从目标对象上拷贝所有属性到指定对象上
 * @param {*} destination 指定对象
 * @param {*} source    目标对象
 * @param {*} recursive 是否递归
 * @return {*}
 */
function extend (destination, source, recursive) {
    destination = destination || {}
    source = source || {}
    recursive = recursive || false
    for (let key in destination) {
        if (source.hasOwnProperty(key)) {
            let destVal = destination[key]
            let sourceVal = source[key]
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[key] = extend(sourceVal, destVal, recursive)
            } else {
                destination[key] = sourceVal
            }
        }
    }
    return destination
}
function deepClone (target, map = new Map()) {
    if (typeof target === 'object') {
        let copyObj = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, copyObj);
        for (const key in target) {
            copyObj[key] = deepClone(target[key], map);
        }
        return copyObj;
    } else {
        return target;
    }
}
/**
 * @description: 判断是否为对象
 * @param {*} obj
 * @return {*}
 */
function isObject (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object'
}
/**
 * @description: 判断是否为数组
 * @param {*} obj
 * @return {*}
 */
function isArray (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'array'
}

function isString (obj) {
    return typeof obj === 'string' || obj instanceof String;
}
module.exports = {
    extend,
    deepClone,
    isObject,
    isArray,
    isString
}