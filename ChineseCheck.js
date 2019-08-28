const unusualChineseUniRange = {
    cjkExpandB: [0x20000, 0x2A6DF],//拓展B
    cjkExpandC: [0x2A700, 0x2B73F],//拓展C
    cjkExpandD: [0x2B740, 0x2B81F],//拓展D
    cjkExpandE: [0x2B820, 0x2CEAF],//拓展E
    cjkExpandF: [0x2CEB0, 0x2EBEF],//拓展F
    cjkCompatibleExpand: [0x2F800, 0x2FA1F],//兼容拓展
}

const regIsChineseChar = /[\u4e00-\u9fa5\u9fa6-\u9fef\u3400-\u4db5\uf900-\ufad9]/;

/**
 * 验证是否为中文名称
 * @param {String} nameStr - 名字字符串
 * @param {Number} limMin - 名字长度最小
 * @param {Number} limMax - 名字长度最大
 */

var checkChineseName = (nameStr, limMin = 2, limMax = 12) => {//包括
    nameStr = nameStr.trim();
    const length = nameStr.length;
    if(length >=2 && length <= 12) return checkChinese(nameStr);
    return false;
}

var checkChinese = (str) => {
    str = str.trim();
    let length = str.length;
    let i = 0;
    let foundErr = false;
    while(!foundErr && i<length) {
        if(isUnusual(str.charCodeAt(i))) {
            if(i>=length-1) return false;
            foundErr = !checkChineseUnusual(str.charCodeAt(i), str.charCodeAt(i+1));
            i+=2;
        }else {
            foundErr = !checkChineseNormal(str[i]);
            i++;
        }
    }
    return !foundErr;
}

var checkChineseNormal = (char) => {
    return regIsChineseChar.test(char);
}

var checkChineseUnusual = (frontCharCode, endCharCode) => {
    // const 0x10000 + (前导-0xD800) * 0x400 + (后导-0xDC00) = utf-16编码
    const unicode = 0x10000+(frontCharCode-0xd800)*0x400+(endCharCode-0xDC00);
    for(let key in unusualChineseUniRange){
        if(!unusualChineseUniRange.hasOwnProperty(key)) continue;
        const min = unusualChineseUniRange[key][0];
        const max = unusualChineseUniRange[key][1];

        if(unicode>=min && unicode<= max) return true;
    }
    return false;
}

var isUnusual = (frontCharCode) => frontCharCode>=0xD800 && frontCharCode<=0xDB00;

console.log('ほ: ', checkChinese('ほ'));
console.log('𣊫: ', checkChinese('𣊫'), '𣊫'.length);
console.log('r旭彤: ', checkChinese('r旭彤'));
console.log('两+开花', checkChinese('两+开花'), '两+开花'.length);
console.log('식탁 ', checkChinese('식탁'), '식탁'.length);
console.log('芮旭彤', checkChinese('芮旭彤'), '芮旭彤'.length);