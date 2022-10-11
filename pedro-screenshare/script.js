const ws = require("./websocket");
const { ipcRenderer } = require('electron')
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
const peerConnection = new RTCPeerConnection(configuration);

ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'screen',
                chromeMediaSourceId: sourceId,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
            }
        }
    })
    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream)
    })
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
    makeCall()
})

async function makeCall() {
    ws.onEvent('answer', async (event) => {
        console.log('answer')
        let data = event.request.arguments.data
        if (data.answer) {
            const remoteDesc = new RTCSessionDescription(data.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    ws.emit('offer', { 'offer': offer });
}

