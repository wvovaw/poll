import { wsManager } from "../utils/websocket-manager";

export default defineWebSocketHandler({
  async open(peer) {
    wsManager.addPeer(peer);
    await wsManager.sendCurrentPoll(peer);
  },

  async message(peer, message) {
    await wsManager.handleMessage(peer, message.text());
  },

  close(peer) {
    wsManager.removePeer(peer);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
