/*
 * @Author: shiao
 * @Date: 2021-01-07 11:23:34
 * @LastEditTime: 2021-01-07 11:54:05
 * @Description: 
 * @LastEditors: shiao
 * @FilePath: \health-h5\src\providers\bridge.js
 */
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {

        return callback(window.WebViewJavascriptBridge)
    }

    if (window.WVJBCallbacks) {
        alert('处理一')
        alert(window.WVJBCallbacks)
        return window.WVJBCallbacks.push(callback)
    }
    
    window.WVJBCallbacks = [callback]
    alert(window.WVJBCallbacks)
    let WVJBIframe = document.createElement('iframe')

    WVJBIframe.style.display = 'none'

    WVJBIframe.src = 'https://__bridge_loaded__'  
    document.documentElement.appendChild(WVJBIframe)

    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)

}

export default {
    callhandler(name, data, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            alert(window.WVJBCallbacks)
            alert(bridge )
            bridge.callHandler(name, data, callback)
        })

    },

    registerhandler(name, callback) {

        setupWebViewJavascriptBridge(function (bridge) {

            bridge.registerHandler(name, function (data, responseCallback) {

                callback(data, responseCallback)

            })

        })

    }

}
