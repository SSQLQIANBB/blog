
vuex中在mutation中使用异步，其实对结果是没有影响的


只是人为规定不能在mutation中使用异步

1. 为了devtool快照可以正确记录值的变化（触发前、触发后）
2. 设计理念，将有副作用的函数放在action中，同步修改放在mutation中
