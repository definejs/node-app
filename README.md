# node-app

在 node 端使用的基于树形模块管理器的应用。

示例：

目录结构：

- index.js
- lib/
    - API.js
- modules/
    - User.js
    - User/
        - API.js



 - 主文件 `index.js`:

``` javascript
const app = require('@definejs/node-app');

//设置要加载的业务层的模块文件。
app.modules = [
    './lib/**/*.js',
    './modules/**/*.js',
];

//启动应用。
app.launch(function (require, module, exports) {
    const User = require('User'); //加载业

    User.get({
        id: 1000,
        name: 'micty',
    });
});

```


 - 模块 `lib/API.js`:

``` javascript
define('API', function (require, module, exports) {
    return {
        get(data) {
            console.log(module.id, 'get', data);
        },
    };
});
```


 - 模块 `modules/User.js`:

``` javascript

define('User', function (require, module, exports) {
    const API = module.require('API');

    return {
        get(data) { 
            console.log(module.id, 'get');
            API.get(data);
        },
    };
});
```

 - 模块 `modules/User/API.js`:

``` javascript
define('User/API', function (require, module, exports) {
    const API = require('API');

    return {
        get(data) { 
            console.log(module.id, 'get', data);

            API.get(data);
        },
    };
});
```