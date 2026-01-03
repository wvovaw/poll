import { wsManager } from "../utils/websocket-manager";

export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer.id);
    wsManager.addPeer(peer);
  },

  async message(peer, message) {
    console.log("[ws] message", peer.id, message);
    const text = message.text();
    if (text.startsWith("ping ")) {
      const fp = text.split(" ")[1];
      const votedStorage = useStorage("voted");
      const hasVoted = await votedStorage.getItem(fp);
      peer.send(hasVoted ? "status:already_voted" : "status:can_vote");
    } else if (text.startsWith("vote ")) {
      const parts = text.split(" ");
      const vote = parts[1];
      const fp = parts[2];
      if (!vote || !fp || !["fw", "lib"].includes(vote)) {
        peer.send("error:invalid_vote");
        return;
      }
      const votedStorage = useStorage("voted");
      const hasVoted = await votedStorage.getItem(fp);
      if (hasVoted) {
        peer.send("error:already_voted");
        return;
      }
      const storage = useStorage("poll");
      let poll = (await storage.getItem("poll")) || { lib: 0, fw: 0 };
      poll[vote] += 1;
      await storage.setItem("poll", poll);
      await votedStorage.setItem(fp, true);
      wsManager.broadcast("update:" + JSON.stringify(poll));
      peer.send("vote:success");
    } else if (text === "ping") {
      peer.send("pong");
    }
  },

  close(peer, event) {
    console.log("[ws] close", peer.id, event);
    wsManager.removePeer(peer);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
