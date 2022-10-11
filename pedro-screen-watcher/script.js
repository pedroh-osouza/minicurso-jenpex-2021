const ws = require("./websocket");

const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
const peerConnection = new RTCPeerConnection(configuration);

ws.onEvent('offer', async (event) => {
  console.log('offer')
  let data = event.request.arguments.data
  if (data.offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    ws.emit('answer', { 'answer': answer });
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        ws.emit("candidate", { candidate: event.candidate })
      }
    }
  }
});

ws.onEvent("candidate", async (event) => {
  let data = event.request.arguments.data
  await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
})
