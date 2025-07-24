> **基于WebRTC、socket视频通话临界情况，甲方拨通，在乙方选择同意时挂断。**

# WebRTC中的RTCOfferOptions参数解释


您提供的文本是关于WebRTC API中`RTCOfferOptions`接口的参数说明。这些参数用于配置创建SDP offer时的行为。我来解释一下这些参数的含义：


## iceRestart 参数


这个参数用于控制ICE (Interactive Connectivity Establishment) 连接的重启：

- 当设置为`true`时，会生成新的ICE凭证，导致ICE过程重新启动
- 当设置为`false`(默认值)时，保持现有的ICE凭证，不重启ICE连接
- ICE重启通常用于解决网络变化或连接问题的情况

## offerToReceiveAudio 和 offerToReceiveVideo 参数


这两个是遗留(Legacy)参数，用于控制是否接收音频和视频流：

- 当设置为`true`时，即使本地不发送音频/视频，也会创建接收器来接收远程的音频/视频
- 当设置为`false`时，即使本地发送音频/视频，也不会接收远程的音频/视频
- 在现代WebRTC实现中，建议使用`RTCRtpTransceiver`来控制媒体流的收发方向

## voiceActivityDetection 参数


这个参数控制语音活动检测(VAD)功能：

- 默认值为`true`，表示启用语音活动检测
- 启用后，当检测到"静音"或低音量时，会减少发送的音频数据，节省带宽
- 在某些场景下可能不适用，例如：
    - 音乐传输：可能会丢失重要的低音量声音
    - 紧急通话：不应因为安静而切断音频

## 什么意思？


语音活动检测(VAD)是一种技术，用于检测音频中是否有人在说话。当启用时(默认情况)，WebRTC会监测音频输入，只在检测到有声音时才传输数据，从而节省带宽。但在某些情况下，这可能导致问题，比如音乐传输时的低音量部分可能被错误地识别为"静音"而被过滤掉。


在WebRTC应用中，如果您需要传输音乐或其他非语音内容，或者是进行紧急通话，可能需要将`voiceActivityDetection`设置为`false`，以确保所有音频内容都被完整传输，不会因为音量低而被过滤。


这些参数通常在调用`RTCPeerConnection.createOffer()`方法时作为选项传入：


```javascript
const offerOptions = {
  iceRestart: false,
  voiceActivityDetection: true
};

peerConnection.createOffer(offerOptions)
  .then(offer => {
    // 处理生成的offer
  });
```


# RTCRtpTransceiver 简介


RTCRtpTransceiver 是 WebRTC API 中的一个重要接口，它代表了一个双向的 RTP (实时传输协议) 媒体流通道。


## 基本概念


RTCRtpTransceiver 包含三个主要部分：

1. **RTCRtpSender**：负责发送媒体数据到远程对等方
2. **RTCRtpReceiver**：负责从远程对等方接收媒体数据
3. **相关状态**：影响发送器和接收器行为的共享状态

## 主要属性

- **currentDirection**：只读属性，表示收发器当前的传输方向（如"sendrecv"、"sendonly"、"recvonly"或"inactive"）
- **direction**：控制收发器的首选方向，可以设置来改变行为
- **mid**：在会话描述中唯一标识此收发器的媒体ID
- **receiver**：处理传入媒体的RTCRtpReceiver对象
- **sender**：处理传出媒体的RTCRtpSender对象
- **stopped**：布尔值，表示收发器是否已停止

## 主要方法

- **setCodecPreferences()**：设置收发器的首选编解码器
- **stop()**：永久停止收发器

## 使用场景


RTCRtpTransceiver 主要用于以下场景：

1. **精确控制媒体流方向**：可以设置为只发送、只接收、双向或不活动
2. **编解码器偏好设置**：可以指定特定的编解码器优先级
3. **替代旧版选项**：比如 offerToReceiveAudio 和 offerToReceiveVideo

## 使用示例


```javascript
// 获取媒体设备
navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then(stream => {
    const pc = new RTCPeerConnection();

    // 将轨道从流添加到连接
    stream.getTracks().forEach(track => {
      const sender = pc.addTrack(track, stream);

      // 获取与此发送器关联的收发器
      const transceivers = pc.getTransceivers();
      const transceiver = transceivers.find(t => t.sender === sender);

      // 配置收发器
      if (track.kind === 'video') {
        // 视频设为只发送
        transceiver.direction = 'sendonly';
      } else if (track.kind === 'audio') {
        // 音频保持双向
        transceiver.direction = 'sendrecv';
      }
    });

    // 创建offer并设置本地描述
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer));
  });
```


RTCRtpTransceiver 是现代 WebRTC 应用程序中控制媒体流的推荐方式，它提供了比旧版选项更精细的控制能力。


# RTCOfferOptions 与 RTCRtpTransceiver 的对比


RTCOfferOptions 和 RTCRtpTransceiver 是 WebRTC API 中两个不同的概念，它们在媒体流控制方面有不同的作用和应用场景。


## RTCOfferOptions


RTCOfferOptions 是一个配置对象，用于在创建 SDP offer 时指定一些选项：

1. **用途**：配置 `createOffer()` 方法的行为
2. **主要属性**：
    - `iceRestart`：控制是否重启 ICE 连接
    - `offerToReceiveAudio`：(旧版)控制是否接收音频
    - `offerToReceiveVideo`：(旧版)控制是否接收视频
    - `voiceActivityDetection`：控制是否启用语音活动检测
3. **使用方式**：

```javascript
const offerOptions = {
  iceRestart: true,
  offerToReceiveAudio: true,
  offerToReceiveVideo: false
};

peerConnection.createOffer(offerOptions)
  .then(offer => {
    // 处理offer
  });
```


## RTCRtpTransceiver


RTCRtpTransceiver 是一个对象，代表一个双向的媒体流通道：

1. **用途**：精确控制媒体流的发送和接收
2. **主要属性和方法**：
    - `direction`：控制媒体流方向(sendrecv/sendonly/recvonly/inactive)
    - `sender`：控制媒体发送
    - `receiver`：控制媒体接收
    - `setCodecPreferences()`：设置编解码器偏好
    - `stop()`：停止收发器
3. **使用方式**：

```javascript
const transceiver = peerConnection.addTransceiver('video');
transceiver.direction = 'sendonly'; // 只发送不接收
```


## 主要区别

1. **抽象层次**：
    - RTCOfferOptions 是配置参数，用于一次性设置
    - RTCRtpTransceiver 是对象实例，可以持续操作和修改
2. **控制粒度**：
    - RTCOfferOptions 提供粗粒度控制(全局音频/视频开关)
    - RTCRtpTransceiver 提供细粒度控制(每个媒体轨道单独控制)
3. **API 演进**：
    - RTCOfferOptions 中的 offerToReceiveAudio/Video 是旧版 API
    - RTCRtpTransceiver 是现代 WebRTC 推荐的 API
4. **功能范围**：
    - RTCOfferOptions 仅影响 offer 创建
    - RTCRtpTransceiver 可以在连接的整个生命周期中调整

## 实际应用


在现代 WebRTC 应用中，推荐使用 RTCRtpTransceiver 来替代 RTCOfferOptions 中的旧版选项，因为它提供了更精确的控制和更丰富的功能。例如，要实现"只接收音频不接收视频"的功能：


**旧方式**：


```javascript
peerConnection.createOffer({
  offerToReceiveAudio: true,
  offerToReceiveVideo: false
});
```


**新方式**：


```javascript
// 音频收发器设为双向
const audioTransceiver = peerConnection.addTransceiver('audio');
audioTransceiver.direction = 'sendrecv';

// 视频收发器设为只发送
const videoTransceiver = peerConnection.addTransceiver('video');
videoTransceiver.direction = 'sendonly';
```


RTCRtpTransceiver 提供了更灵活、更强大的媒体流控制能力，是现代 WebRTC 应用的首选方案。

