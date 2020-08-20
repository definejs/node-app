const path = require('path')
const Patterns = require('@definejs/patterns');

module.exports = {
    /**
    * 加载指定模式的所有模块文件。
    * @param {Array} patterns 要加载的模块文件的模式列表。
    */
    load(patterns) {
        let files = Patterns.getFiles(patterns);

        files.map((file) => {
            file = path.resolve(file);
            require(file);
        });

        return files;
    },
};