
## 问题：

1. 发送心跳定时器存在一定的bug，页面处于后台的时候，定时器会走的越来越慢
2. 通过监听onclose()存在失效的情况
3. 使用定时器缺陷，页面失活一段时间定时器变惰性
4. websocket中存在控制帧opcode这个概念。基于opcode实现心跳检测
    - TEXT -> 1
    - BINARY -> 2
    - CLOSE -> 8
    - PING -> 9
    - PONG -> 10

ping-pong:  [https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2)

