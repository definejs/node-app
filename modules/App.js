const AppModule = require('@definejs/app-module');
const Loader = require('./App/Loader');

//重写 require();
//使它既能加载 app 自身管理的模块（优先），也能加载  node 模块。
function rewriteRequire() { 
    let mm = AppModule.mm();

    //备份原来的。
    mm.$require = mm.require.bind(mm);

    //重写。
    mm.require = (id, ...args) => {
        return mm.has(id) ?             //
            mm.$require(id, ...args) :  //
            require(id);                //
    };
}



module.exports = exports = {
    /**
    * 默认配置。
    */
    defaults: require('./App.defaults'),

    /**
    * 要加载的模块文件的模式列表。
    */
    modules: [],

    /**
    * 获取此 app 所用到的模块管理器。 
    * @function
    */
    mm: AppModule.mm,

    /**
    * 初始化执行环境，并启动应用程序。
    * @param {function} factory 工厂函数，即启动函数。
    */
    launch(factory) {
        const { defaults, } = exports;
        const { root, seperator, define, } = defaults;

        //app 顶级模块的名称，一般为空字符串。
        if (typeof root != 'string') {
            throw new Error('应用的顶级模块名称必须为一个 string。');
        }

        //父子模块的分隔符，一般为 `/`。
        if (root.includes(seperator)) {
            throw new Error('应用的顶级模块名称不能含有父子模块的分隔符: ' + seperator);
        }

        //重写 require() 方法。
        rewriteRequire();

        Object.assign(AppModule.defaults, defaults);

        //提供快捷方式，让外部可以直接调用全局方法 define()。
        global[define] = AppModule.define;

        //加载业务层指定的模块文件。
        Loader.load(exports.modules);

        //先定义一个顶级的模块。
        AppModule.define(root, function ($require, $module, $exports) {
            factory($require, $module, $exports);
        });

        //定义完后马上加载即可启动。
        AppModule.require(root);

    },
};