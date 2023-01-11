class Vnode {
    constructor(name, data, value, type) {
        this.name = name?name.toLowerCase():name; // 标签名
        this.data = data;  // 值
        this.value = value; // 文本
        this.type = type;  // 元素类型
        this.children = [];  // 子节点
    }
    appendChild(vnode) {
        this.children.push(vnode)
    }
}

// 渲染函数
function render(vNode) {
    let type = vNode.type;
    let TDom = null;
    if(type == 1){
        let name = vNode.name;
        let data = vNode.data;
        let children = vNode.children;
        TDom = document.createElement(name);
        Object.keys(data).forEach(item => {
            TDom.setAttribute(item,data[item]);
        })
        children.forEach(item => {
            TDom.appendChild( render(item) );
        });
    }else if(type == 3){
        return document.createTextNode(vNode.value);
    }
    return TDom
}

//获取虚拟dom
function getVNode(TDom) {
    let nodeType = TDom.nodeType;
    let vNode = null;
    if(nodeType == 1){
    //    元素节点
        let nodeName = TDom.nodeName;
        let attrs = TDom.attributes;// 属性，返回属性组成的为数组，我们就是把这个伪数组转换为对象
        let _attrObj = {};
        for(let i = 0; i < attrs.length; i++) {
            // attrs[i]是一个属性节点，我们要的是nodeName这个属性
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
        }
        vNode = new Vnode(nodeName,_attrObj,undefined,nodeType)

        let childNodes = TDom.childNodes;
        for(let i = 0; i < childNodes.length; i++) {
            vNode.appendChild(getVNode(childNodes[i])) // 递归
        }
    }else if(nodeType == 3){
    //    文本节点
        vNode = new Vnode(undefined,undefined,TDom.nodeValue,nodeType);
    }
    return vNode;
}

//图片转base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        if (window.FileReader) {
            let reader = new FileReader();
            let base64String = null;
            reader.readAsDataURL(file);
            reader.onload = e => {
                base64String = e.target.result;
            };
            reader.onerror = (error) => {
                reject(error);
            };
            //结束 resolve
            reader.onloadend = () => {
                resolve(base64String);
            };
        }
    });

}

export {render, getVNode,toBase64}
