import { wsManager } from '../utils/websocket-manager'

export default defineWebSocketHandler({
  upgrade(req) {
    console.log('Upgrade request accepted', req.headers)
  },
  async open(peer) {
    console.log('Open websocket', peer.id)
    wsManager.addPeer(peer)
    await wsManager.sendCurrentPoll(peer)
  },

  async message(peer, message) {
    console.log('Websocket message', peer.id)
    await wsManager.handleMessage(peer, message.text())
  },

  close(peer) {
    console.log('Close websocket', peer.id)
    wsManager.removePeer(peer)
  },

  error(peer, error) {
    console.log('[ws] error', peer, error)
  },
})
