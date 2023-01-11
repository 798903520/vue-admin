
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    let timeout;//延时器
    return function () {//闭包
        let context = this;//存储this指向
        let args = arguments;//存储传入参数
        // console.log("timeout1",timeout)
        if (timeout) clearTimeout(timeout);//如果有延时器，清除
        if (immediate) {//如果是立即执行
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) {func.apply(context, args)}
        }
        else {//如果不是立即执行
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        // console.log("timeout2",timeout)
    }
}

export default debounce;