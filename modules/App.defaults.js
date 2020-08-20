
const Emitter = require('@definejs/emitter');


module.exports = {
    Emitter,            //事件驱动器类。
    root: '',           //业务层的根模块的名称，默认推荐为空字符串。
    seperator: '/',     //上下级模块的分隔符。 如 `User/Login`。
    repeated: false,    //不允许重复定义相同名称的模块。
    cross: false,       //是否允许跨级调用模块。 如果为 false，则不允许加载不属于自己的直接子级模块。

    define: 'define',   //对外提供定义模块的方法名。
    
};