//因为setupProxy使用node环境引入模块，所以无法同时使用import和require
//因此需要使用node环境的暴露方式，将变量暴露出去
//下方的写法是不允许的
// export const proxy8090 = "proxy8090";
// export const proxy53000 = "proxy53000";

module.exports = {
    proxy8090: "proxy8090",
    proxy53000: "proxy53000",
};